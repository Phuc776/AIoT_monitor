package com.main.aiot_service.model.mapper;

import com.main.aiot_service.model.dto.DeviceDTO;
import com.main.aiot_service.model.entity.Device;
import com.main.aiot_service.model.entity.DeviceGroup;
import com.main.aiot_service.model.request.DeviceRequest;
import org.springframework.stereotype.Component;

@Component
public class DeviceMapper {

    public Device toEntity(DeviceRequest request) {
        return Device.builder()
                .deviceName(request.getDeviceName())
                .ipAddress(request.getIpAddress())
                .port(request.getPort())
                .deviceType(request.getDeviceType())
                .location(request.getLocation())
                .status(request.getStatus())
                .connectionProtocol(request.getConnectionProtocol())
                .authMethod(request.getAuthMethod())
                .username(request.getUsername())
                .password(request.getPassword())
                .publicKey(request.getPublicKey())
                .osType(request.getOsType())

                .build();
    }

    public DeviceDTO toDTO(Device device) {
        return DeviceDTO.builder()
                .id(device.getId())
                .deviceName(device.getDeviceName())
                .ipAddress(device.getIpAddress())
                .port(device.getPort())
                .deviceType(device.getDeviceType())
                .location(device.getLocation())
                .status(device.getStatus())
                .connectionProtocol(device.getConnectionProtocol())
                .authMethod(device.getAuthMethod())
                .username(device.getUsername())
                .osType(device.getOsType())
                .deviceGroupId(device.getDeviceGroup() != null ? device.getDeviceGroup().getId() : null)
                .build();
    }
}
