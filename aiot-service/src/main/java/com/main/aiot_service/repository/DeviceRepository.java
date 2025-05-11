package com.main.aiot_service.repository;

import com.main.aiot_service.model.entity.Device;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeviceRepository extends JpaRepository<Device, Long> {
    Page<Device> findByDeviceGroupId(Long groupId);

    Page<Device> findByDeviceGroupIsNull(Pageable pageable);
}
