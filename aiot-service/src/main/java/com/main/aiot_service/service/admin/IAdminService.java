package com.main.aiot_service.service.admin;

import com.main.aiot_service.model.dto.UserDTO;
import com.main.aiot_service.model.request.AuthRequest;
import com.main.aiot_service.model.request.UpdatePasswordRequest;
import com.main.aiot_service.model.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IAdminService {
    MessageResponse createUser(String username, String password, String role);
    Page<UserDTO> findAll(Pageable pageable);
    MessageResponse updatePassword(String username, UpdatePasswordRequest updatePasswordRequest);
}
