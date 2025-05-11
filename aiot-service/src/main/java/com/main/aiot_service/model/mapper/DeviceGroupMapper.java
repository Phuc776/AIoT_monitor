package com.main.aiot_service.model.mapper;

import com.main.aiot_service.model.dto.DeviceGroupDto;
import com.main.aiot_service.model.entity.Device;
import com.main.aiot_service.model.entity.DeviceGroup;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DeviceGroupMapper {
    public DeviceGroupDto toDTO(DeviceGroup group) {
        return DeviceGroupDto.builder()
                .id(group.getId())
                .groupName(group.getGroupName())
                .deviceIds(
                        group.getDevices() != null
                                ? group.getDevices().stream().map(Device::getId).toList()
                                : new ArrayList<>()
                )
                .build();
    }
}
