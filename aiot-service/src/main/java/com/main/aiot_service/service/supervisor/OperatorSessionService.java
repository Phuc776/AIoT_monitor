package com.main.aiot_service.service.supervisor;

import com.main.aiot_service.model.entity.OperatorSession;
import com.main.aiot_service.model.entity.SessionStatus;
import com.main.aiot_service.repository.OperatorSessionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OperatorSessionService {

    private final OperatorSessionRepository sessionRepository;

    public OperatorSession startSession(String operatorUsername, String deviceName, String detail) {
        OperatorSession session = new OperatorSession();
        session.setOperatorUsername(operatorUsername);
        session.setDeviceName(deviceName);
        session.setStartTime(LocalDateTime.now());
        session.setStatus(SessionStatus.ACTIVE);
        return sessionRepository.save(session);
    }

    public void endSession(Long id, boolean killed) {
        OperatorSession session = sessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found"));
        session.setEndTime(LocalDateTime.now());
        session.setStatus(killed ? SessionStatus.KILLED : SessionStatus.ENDED);
        sessionRepository.save(session);
    }

    public Page<OperatorSession> getActiveSessions(Pageable pageable) {
        return sessionRepository.findByStatus(SessionStatus.ACTIVE, pageable);
    }

    public Page<OperatorSession> getSessionHistory(Pageable pageable) {
        return sessionRepository.findAll(pageable);
    }
}

