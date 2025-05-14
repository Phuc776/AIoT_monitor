package com.main.aiot_service.model.mapper;

import com.main.aiot_service.model.dto.CommandListDTO;
import com.main.aiot_service.model.entity.CommandList;
import com.main.aiot_service.model.request.CommandListRequest;
import org.springframework.stereotype.Component;

@Component
public class CommandListMapper {

    public CommandListDTO toDto(CommandList entity) {
        return new CommandListDTO(
                entity.getId(),
                entity.getName(),
                entity.getCommands()
        );
    }

    public CommandList toEntity(CommandListRequest request) {
        CommandList entity = new CommandList();
        entity.setName(request.getName());
        entity.setCommands(request.getCommands());
        return entity;
    }
}
