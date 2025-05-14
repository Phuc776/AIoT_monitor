package com.main.aiot_service.model.response;

import com.main.aiot_service.model.dto.CommandListDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommandListResponse {
    private int responseCode;
    private String message;
    private CommandListDTO commandList;
}

