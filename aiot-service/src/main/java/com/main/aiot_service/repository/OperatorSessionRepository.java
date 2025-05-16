package com.main.aiot_service.repository;

import com.main.aiot_service.model.entity.OperatorSession;
import com.main.aiot_service.model.entity.SessionStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OperatorSessionRepository extends JpaRepository<OperatorSession, Long> {
    Page<OperatorSession> findByStatus(SessionStatus status, Pageable pageable);
}
