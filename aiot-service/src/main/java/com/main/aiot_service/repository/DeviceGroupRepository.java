package com.main.aiot_service.repository;

import com.main.aiot_service.model.entity.DeviceGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceGroupRepository extends JpaRepository<DeviceGroup, Long> {}
