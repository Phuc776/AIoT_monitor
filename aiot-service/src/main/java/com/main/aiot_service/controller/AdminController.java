package com.main.aiot_service.controller;

import com.main.aiot_service.model.dto.UserDto;
import com.main.aiot_service.model.request.CreateUserRequest;
import com.main.aiot_service.model.response.UserResponse;
import com.main.aiot_service.service.admin.IAdminService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/admin")
@AllArgsConstructor
public class AdminController {
    private final IAdminService adminService;

    @PostMapping("/create-user")
    public UserResponse createUser(@RequestBody CreateUserRequest request) {
        return adminService.createUser(request.getUsername(), request.getPassword(), request.getRole());
    }

    @GetMapping()
    public Page<UserDto> getAllUsers(Pageable pageable) {
        return adminService.findAll(pageable);
    }
}
