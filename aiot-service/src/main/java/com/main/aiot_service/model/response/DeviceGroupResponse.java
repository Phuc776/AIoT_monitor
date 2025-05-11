package com.main.aiot_service.model.response;

import com.main.aiot_service.model.dto.DeviceGroupDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeviceGroupResponse {
    private int responseCode;
    private String message;
    private DeviceGroupDto deviceGroupDTO;
}
