package com.main.aiot_service.model.response;

import lombok.Data;

@Data
public class SSHCommandMessage {
    private String operator;
    private String device;
    private String command;
}
