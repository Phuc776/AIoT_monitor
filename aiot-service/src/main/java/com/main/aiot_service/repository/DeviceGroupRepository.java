package com.main.aiot_service.repository;

import com.main.aiot_service.model.entity.DeviceGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeviceGroupRepository extends JpaRepository<DeviceGroup, Long> {
    Optional<DeviceGroup> findByGroupName(String groupName);
}
