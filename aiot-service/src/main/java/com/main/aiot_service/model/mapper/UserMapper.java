package com.main.aiot_service.model.mapper;

import com.main.aiot_service.model.entity.User;
import com.main.aiot_service.model.dto.UserDTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public static UserDTO toDto(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .role(user.getRole())
                .build();
    }

    public static User toEntity(UserDTO userDto, String encodedPassword) {
        return User.builder()
                .id(userDto.getId())
                .username(userDto.getUsername())
                .password(encodedPassword)
                .role(userDto.getRole())
                .build();
    }
}
