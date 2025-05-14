package com.main.aiot_service.controller.team_lead;

import com.main.aiot_service.model.dto.CommandListDTO;
import com.main.aiot_service.model.request.CommandListRequest;
import com.main.aiot_service.model.response.CommandListResponse;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.service.team_lead.CommandListServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/team-lead/command-list")
@RequiredArgsConstructor
public class CommandListController {
    private final CommandListServiceImpl service;

    @PostMapping
    public CommandListResponse createCommandList(@Valid @RequestBody CommandListRequest request) {
        return service.createCommandList(request);
    }

    @GetMapping
    public ResponseEntity<Page<CommandListDTO>> getAllCommandLists(Pageable pageable) {
        return ResponseEntity.ok(service.getAllCommandLists(pageable));
    }

    @GetMapping("/{id}")
    public CommandListResponse getCommandListById(@PathVariable Long id) {
        return service.getCommandListById(id);
    }

    @PutMapping("/{id}")
    public CommandListResponse updateCommandList(
            @PathVariable Long id,
            @Valid @RequestBody CommandListRequest request
    ) {
        return service.updateCommandList(id, request);
    }

    @DeleteMapping("/{id}")
    public MessageResponse deleteCommandList(@PathVariable Long id) {
        return service.deleteCommandList(id);
    }

}
