package com.main.aiot_service.model.mapper;

import com.main.aiot_service.model.dto.DeviceDTO;
import com.main.aiot_service.model.dto.DeviceGroupDTO;
import com.main.aiot_service.model.entity.Device;
import com.main.aiot_service.model.entity.DeviceGroup;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class DeviceGroupMapper {
    private final DeviceMapper deviceMapper;

    public DeviceGroupMapper(DeviceMapper deviceMapper) {
        this.deviceMapper = deviceMapper;
    }

    public DeviceGroupDTO toDTO(DeviceGroup group) {
        List<DeviceDTO> devices = group.getDevices() != null
                ? group.getDevices().stream().map(deviceMapper::toDTO).collect(Collectors.toList())
                : List.of();

        return DeviceGroupDTO.builder()
                .id(group.getId())
                .groupName(group.getGroupName())
                .devices(devices)
                .build();
    }
}
