package com.main.aiot_service.controller;

import com.main.aiot_service.model.request.AuthRequest;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.model.response.JwtResponse;
import com.main.aiot_service.service.IAuthService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private final IAuthService authService;

    @PostMapping("/login")
    public JwtResponse login(@RequestBody AuthRequest loginRequest) {
        return authService.login(loginRequest);
    }

    @PostMapping("/reset-password")
    public MessageResponse resetPassword(@RequestBody String username) {
        return authService.resetPassword(username);
    }
}
