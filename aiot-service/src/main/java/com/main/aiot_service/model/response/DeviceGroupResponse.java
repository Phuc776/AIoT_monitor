package com.main.aiot_service.model.response;

import com.main.aiot_service.model.dto.DeviceGroupDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeviceGroupResponse {
    private int responseCode;
    private String message;
    private DeviceGroupDTO deviceGroupDTO;
}
