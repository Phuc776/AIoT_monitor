package com.main.aiot_service.model.dto;

import com.main.aiot_service.model.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDTO {
    private Long id;
    private String username;
    private Role role;
}
