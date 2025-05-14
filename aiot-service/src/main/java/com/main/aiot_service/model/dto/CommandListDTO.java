package com.main.aiot_service.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class CommandListDTO {
    private Long id;
    private String name;
    private List<String> commands;
}
