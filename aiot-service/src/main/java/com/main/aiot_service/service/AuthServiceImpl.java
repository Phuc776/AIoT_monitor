package com.main.aiot_service.service;

import com.main.aiot_service.model.entity.User;
import com.main.aiot_service.model.dto.UserDTO;
import com.main.aiot_service.model.mapper.UserMapper;
import com.main.aiot_service.model.request.AuthRequest;
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
            UserDTO userDto = UserMapper.toDTO(user);
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
}
