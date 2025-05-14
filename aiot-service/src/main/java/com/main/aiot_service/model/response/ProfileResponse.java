package com.main.aiot_service.model.response;

import com.main.aiot_service.model.dto.ProfileDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ProfileResponse {
    private int code_id;
    private String message;
    private ProfileDTO profileDTO;
}
