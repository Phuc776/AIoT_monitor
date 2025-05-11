package com.main.aiot_service.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeviceGroupRequest {
    @NotBlank(message = "Group name is required")
    private String groupName;
}
