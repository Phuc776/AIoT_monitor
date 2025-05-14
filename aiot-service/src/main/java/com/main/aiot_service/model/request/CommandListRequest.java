package com.main.aiot_service.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.List;

@Data
public class CommandListRequest {
    @NotBlank
    private String name;

    @NotEmpty
    private List<String> commands;
}
