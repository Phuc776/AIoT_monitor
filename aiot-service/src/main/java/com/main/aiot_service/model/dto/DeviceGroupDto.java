package com.main.aiot_service.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DeviceGroupDto {
    private Long id;
    private String groupName;
    private List<Long> deviceIds;
}

