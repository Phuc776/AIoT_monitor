package com.main.aiot_service.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class DeviceRequest {
    @NotBlank
    private String deviceName;

    @NotBlank
    private String ipAddress;
    private Integer port;

    @NotBlank
    private String deviceType;
    private String location;
    private String status;
    private String connectionProtocol;
    private String authMethod;
    private String username;
    private String password;
    private String publicKey;
    private String osType;
    private Long deviceGroupId;
}
