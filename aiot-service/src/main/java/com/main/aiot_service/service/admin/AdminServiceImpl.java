package com.main.aiot_service.service.admin;

import com.main.aiot_service.model.entity.Role;
import com.main.aiot_service.model.entity.User;
import com.main.aiot_service.model.dto.UserDto;
import com.main.aiot_service.model.mapper.UserMapper;
import com.main.aiot_service.model.response.UserResponse;
import com.main.aiot_service.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements IAdminService {

    private final UserRepository userRepository;

    @Override
    public UserResponse createUser(String username, String password, String role) {
        if (userRepository.existsByUsername(username)) {
            return new UserResponse(400, "User already exists");
        }

        Role userRole;
        try {
            userRole = Role.valueOf(role);
        } catch (IllegalArgumentException e) {
            return new UserResponse(400, "Invalid role");
        }

        if(userRole == Role.ROLE_ADMIN) {
            return new UserResponse(400, "Role Admin is not allowed");
        }

        String encodedPassword = new BCryptPasswordEncoder().encode(password);
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        user.setRole(Role.valueOf(role));
        userRepository.save(user);
        return new UserResponse(200,"User created successfully");
    }

    @Override
    public Page<UserDto> findAll(Pageable pageable){
        return userRepository.findAll(pageable)
                .map(UserMapper::toDto);
    }
}
