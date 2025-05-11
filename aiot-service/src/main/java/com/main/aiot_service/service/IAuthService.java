package com.main.aiot_service.service;

import com.main.aiot_service.model.request.AuthRequest;
import com.main.aiot_service.model.response.UserResponse;
import com.main.aiot_service.model.response.JwtResponse;

public interface IAuthService {
    JwtResponse login(AuthRequest loginRequest);

    UserResponse resetPassword(String username);

    UserResponse updatePassword(AuthRequest updatePasswordRequest);
}
