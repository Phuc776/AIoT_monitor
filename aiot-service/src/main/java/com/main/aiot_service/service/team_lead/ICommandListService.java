package com.main.aiot_service.service.team_lead;

import com.main.aiot_service.model.dto.CommandListDTO;
import com.main.aiot_service.model.request.CommandListRequest;
import com.main.aiot_service.model.response.CommandListResponse;
import com.main.aiot_service.model.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICommandListService {
    CommandListResponse createCommandList(CommandListRequest request);
    Page<CommandListDTO> getAllCommandLists(Pageable pageable);
    CommandListResponse getCommandListById(Long id);
    CommandListResponse updateCommandList(Long id, CommandListRequest request);
    MessageResponse deleteCommandList(Long id);
}
