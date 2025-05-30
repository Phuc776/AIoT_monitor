package com.main.aiot_service.controller;

import com.main.aiot_service.model.dto.UserDTO;
import com.main.aiot_service.model.request.AuthRequest;
import com.main.aiot_service.model.request.CreateUserRequest;
import com.main.aiot_service.model.request.UpdatePasswordRequest;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.security.CustomUserDetails;
import com.main.aiot_service.service.admin.IAdminService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
    private final IAdminService adminService;

    @PostMapping("/create-user")
    public MessageResponse createUser(@RequestBody CreateUserRequest request) {
        return adminService.createUser(request.getUsername(), request.getPassword(), request.getRole());
    }

    @GetMapping()
    public Page<UserDTO> getAllUsers(Pageable pageable) {
        return adminService.findAll(pageable);
    }

    @PostMapping("/update-password")
    public MessageResponse updatePassword(@AuthenticationPrincipal CustomUserDetails userDetails,
                                          @RequestBody UpdatePasswordRequest updatePasswordRequest) {
        String username = userDetails.getUsername();
        return adminService.updatePassword(username, updatePasswordRequest);
    }
}
