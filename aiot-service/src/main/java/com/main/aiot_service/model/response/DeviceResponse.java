package com.main.aiot_service.model.response;

import com.main.aiot_service.model.dto.DeviceDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DeviceResponse {
    private int responseCode;
    private String message;
    private DeviceDTO deviceDTO;
}
