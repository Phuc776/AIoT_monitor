package com.main.aiot_service.service.operator;

import com.main.aiot_service.model.dto.DeviceDTO;
import com.main.aiot_service.model.entity.Profile;
import com.main.aiot_service.model.entity.User;
import com.main.aiot_service.model.mapper.DeviceMapper;
import com.main.aiot_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.nio.file.AccessDeniedException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OperatorDeviceQueryService {
    private final UserRepository userRepository;
    private final DeviceMapper deviceMapper;

    public List<DeviceDTO> getDevicesForOperator(String username) {
        User operator = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return operator.getAssignedProfiles().stream()
                .map(Profile::getDeviceGroup) // Each profile has 1 device group
                .flatMap(group -> group.getDevices().stream())
                .distinct()
                .map(deviceMapper::toDTO)
                .toList();
    }

    public DeviceDTO getDeviceByIdForOperator(Long deviceId, String username) throws AccessDeniedException {
        List<DeviceDTO> devices = getDevicesForOperator(username);
        return devices.stream()
                .filter(d -> d.getId().equals(deviceId))
                .findFirst()
                .orElseThrow(() -> new AccessDeniedException("You do not have access to this device"));
    }
}

