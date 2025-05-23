package com.main.aiot_service.model.request;

import lombok.Data;

@Data
public class OperatorCommandRequest {
    private String operatorName;
    private Long deviceId;
    private String command;
}