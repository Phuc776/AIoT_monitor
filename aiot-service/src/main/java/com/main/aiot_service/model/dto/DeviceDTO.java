package com.main.aiot_service.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeviceDTO {
    private Long id;
    private String deviceName;
    private String ipAddress;
    private Integer port;
    private String deviceType;
    private String location;
    private String status;
    private String connectionProtocol;
    private String authMethod;
    private String username;
    private String osType;
    private Long deviceGroupId;
}
