package com.main.aiot_service.model.mapper;

import com.main.aiot_service.model.dto.DeviceGroupDTO;
import com.main.aiot_service.model.entity.Device;
import com.main.aiot_service.model.entity.DeviceGroup;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class DeviceGroupMapper {
    public DeviceGroupDTO toDTO(DeviceGroup group) {
        return DeviceGroupDTO.builder()
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
