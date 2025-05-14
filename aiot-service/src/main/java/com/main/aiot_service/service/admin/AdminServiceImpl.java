package com.main.aiot_service.service.admin;

import com.main.aiot_service.model.entity.Role;
import com.main.aiot_service.model.entity.User;
import com.main.aiot_service.model.dto.UserDTO;
import com.main.aiot_service.model.mapper.UserMapper;
import com.main.aiot_service.model.request.AuthRequest;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements IAdminService {

    private final UserRepository userRepository;

    @Override
    public MessageResponse createUser(String username, String password, String role) {
        if (userRepository.existsByUsername(username)) {
            return new MessageResponse(400, "User already exists");
        }

        Role userRole;
        try {
            userRole = Role.valueOf(role);
        } catch (IllegalArgumentException e) {
            return new MessageResponse(400, "Invalid role");
        }

        if(userRole == Role.ROLE_ADMIN) {
            return new MessageResponse(400, "Role Admin is not allowed");
        }

        String encodedPassword = new BCryptPasswordEncoder().encode(password);
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(Role.valueOf(role));
        userRepository.save(user);
        return new MessageResponse(200,"User created successfully");
    }

    @Override
    public Page<UserDTO> findAll(Pageable pageable){
        return userRepository.findAll(pageable)
                .map(UserMapper::toDto);
    }
    @Override
    public MessageResponse updatePassword(AuthRequest updatePasswordRequest) {
        Optional<User> userOptional = userRepository.findByUsername(updatePasswordRequest.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(new BCryptPasswordEncoder().encode(updatePasswordRequest.getPassword()));
            userRepository.save(user);
            return new MessageResponse(200, "Password updated successfully");
        } else {
            return new MessageResponse(404, "User not found");
        }
    }
}
