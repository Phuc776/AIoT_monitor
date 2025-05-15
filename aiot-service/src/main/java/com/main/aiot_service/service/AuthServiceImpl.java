package com.main.aiot_service.service;

import com.main.aiot_service.model.User;
import com.main.aiot_service.model.dto.UserDto;
import com.main.aiot_service.model.mapper.UserMapper;
import com.main.aiot_service.model.request.AuthRequest;
import com.main.aiot_service.model.request.UpdatePasswordRequest;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.model.response.JwtResponse;
import com.main.aiot_service.repository.UserRepository;
import com.main.aiot_service.security.CustomUserDetails;
import com.main.aiot_service.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements IAuthService {

    private static final String PASSWORD = "admin@123"; // Default password for resetting
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    @Override
    public JwtResponse login(AuthRequest loginRequest) {
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());
        if (userOptional.isPresent() ) {
            User user = userOptional.get();
            UserDto userDto = UserMapper.toDto(user);
            CustomUserDetails customUserDetails = new CustomUserDetails(userDto, user.getPassword());
            if (new BCryptPasswordEncoder().matches(loginRequest.getPassword(), user.getPassword())) {
                String token = jwtUtil.generateToken(customUserDetails);
                return new JwtResponse(200, "Login success!!", token);
            } else {
                return new JwtResponse(401, "Invalid credentials", null);
            }
        } else {
            return new JwtResponse(401, "Invalid credentials", null);
        }
    }

    @Override
    public MessageResponse resetPassword(String username) {
        Optional<User> userOptional = userRepository.findByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(new BCryptPasswordEncoder().encode(PASSWORD));
            userRepository.save(user);
        }
        return new MessageResponse(200, "Password reset successfully");
    }

    @Override
    public MessageResponse updatePassword(String username, UpdatePasswordRequest updatePasswordRequest) {
        Optional<User> opt = userRepository.findByUsername(username);
        if (opt.isEmpty()) {
            return new MessageResponse(404, "User not found");
        }

        User user = opt.get();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        // 1. Kiểm tra mật khẩu cũ
        if (!encoder.matches(updatePasswordRequest.getCurrentPassword(), user.getPassword())) {
            return new MessageResponse(400, "Current password is incorrect");
        }

        // 3. Update mật khẩu mới
        user.setPassword(encoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);

        return new MessageResponse(200, "Password updated successfully");
    }
}
