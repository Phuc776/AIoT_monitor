package com.main.aiot_service.model.request;

import lombok.Data;

@Data
public class OperatorCommandRequest {
    private String deviceName;
    private String command;
}