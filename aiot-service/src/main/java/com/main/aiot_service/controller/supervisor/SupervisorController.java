package com.main.aiot_service.controller.supervisor;

import com.main.aiot_service.model.entity.OperatorSession;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.service.supervisor.OperatorSessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/supervisor/sessions")
@RequiredArgsConstructor
public class SupervisorController {

    private final OperatorSessionService sessionService;

    @GetMapping("/active")
    public Page<OperatorSession> getActiveSessions(Pageable pageable) {
        return sessionService.getActiveSessions(pageable);
    }

    @GetMapping("/history")
    public Page<OperatorSession> getAllSessions(Pageable pageable) {
        return sessionService.getSessionHistory(pageable);
    }

    @PutMapping("/kill/{id}")
    public MessageResponse killSession(@PathVariable Long id) {
        sessionService.endSession(id, true);
        return new MessageResponse(200,"Session killed successfully.");
    }
}

