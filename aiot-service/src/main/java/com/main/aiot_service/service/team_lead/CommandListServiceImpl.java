package com.main.aiot_service.service.team_lead;

import com.main.aiot_service.model.dto.CommandListDTO;
import com.main.aiot_service.model.entity.CommandList;
import com.main.aiot_service.model.mapper.CommandListMapper;
import com.main.aiot_service.model.request.CommandListRequest;
import com.main.aiot_service.model.response.CommandListResponse;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.repository.CommandListRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommandListServiceImpl implements ICommandListService{
    private final CommandListRepository repository;
    private final CommandListMapper mapper;

    @Override
    public CommandListResponse createCommandList(CommandListRequest request) {
        CommandList saved = repository.save(mapper.toEntity(request));
        return new CommandListResponse(201, "Command list created successfully", mapper.toDto(saved));
    }

    @Override
    public Page<CommandListDTO> getAllCommandLists(Pageable pageable) {
        return repository.findAll(pageable).map(mapper::toDto);
    }

    @Override
    public CommandListResponse getCommandListById(Long id) {
        CommandList entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CommandList not found"));
        return new CommandListResponse(200, "Success", mapper.toDto(entity));
    }

    @Override
    public CommandListResponse updateCommandList(Long id, CommandListRequest request) {
        CommandList entity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CommandList not found"));

        entity.setName(request.getName());
        entity.setCommands(request.getCommands());

        CommandList updated = repository.save(entity);
        return new CommandListResponse(200, "Command list updated", mapper.toDto(updated));
    }

    @Override
    public MessageResponse deleteCommandList(Long id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException("CommandList not found");
        }
        repository.deleteById(id);
        return new MessageResponse(200, "Command list deleted successfully");
    }
}
