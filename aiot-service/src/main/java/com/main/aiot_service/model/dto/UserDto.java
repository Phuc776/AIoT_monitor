package com.main.aiot_service.model.dto;

import com.main.aiot_service.model.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String username;
    private Role role;
}
