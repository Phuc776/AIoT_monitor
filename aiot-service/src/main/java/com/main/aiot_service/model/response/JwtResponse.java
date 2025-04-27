package com.main.aiot_service.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private int responseCode;
    private String message;
    private String jwtToken;
}
