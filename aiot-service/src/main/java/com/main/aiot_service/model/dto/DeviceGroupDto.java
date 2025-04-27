package com.main.aiot_service.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeviceGroupDto {
    private Long id;
    private String groupName;
}

