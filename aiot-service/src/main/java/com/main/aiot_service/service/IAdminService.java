package com.main.aiot_service.service;

import com.main.aiot_service.model.dto.UserDto;
import com.main.aiot_service.model.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IAdminService {
    MessageResponse createUser(String username, String password, String role);
    Page<UserDto> findAll(Pageable pageable);
}
