package com.main.aiot_service.repository;

import com.main.aiot_service.model.entity.CommandList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommandListRepository extends JpaRepository<CommandList, Long> {}
