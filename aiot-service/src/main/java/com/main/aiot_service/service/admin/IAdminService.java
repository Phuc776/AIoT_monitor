package com.main.aiot_service.service.admin;

import com.main.aiot_service.model.dto.UserDto;
import com.main.aiot_service.model.response.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IAdminService {
    UserResponse createUser(String username, String password, String role);
    Page<UserDto> findAll(Pageable pageable);
}
