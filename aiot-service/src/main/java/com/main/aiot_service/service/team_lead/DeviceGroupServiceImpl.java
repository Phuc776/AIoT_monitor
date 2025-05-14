package com.main.aiot_service.service.team_lead;

import com.main.aiot_service.model.dto.DeviceGroupDTO;
import com.main.aiot_service.model.entity.Device;
import com.main.aiot_service.model.entity.DeviceGroup;
import com.main.aiot_service.model.mapper.DeviceGroupMapper;
import com.main.aiot_service.model.request.DeviceGroupRequest;
import com.main.aiot_service.model.response.DeviceGroupResponse;
import com.main.aiot_service.repository.DeviceGroupRepository;
import com.main.aiot_service.repository.DeviceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeviceGroupServiceImpl implements IDeviceGroupService {

    private final DeviceGroupRepository deviceGroupRepository;
    private final DeviceRepository deviceRepository;
    private final DeviceGroupMapper deviceGroupMapper;

    @Override
    public DeviceGroupResponse createGroup(DeviceGroupRequest request) {
        DeviceGroup group = new DeviceGroup();
        group.setGroupName(request.getGroupName());
        group.setDevices(new ArrayList<>());

        deviceGroupRepository.save(group);
        return new DeviceGroupResponse(201, "Group created", deviceGroupMapper.toDTO(group));
    }

    @Override
    public Page<DeviceGroupDTO> getAllGroups(Pageable pageable) {
        return deviceGroupRepository.findAll(pageable)
                .map(deviceGroupMapper::toDTO);
    }

    @Override
    public DeviceGroupResponse addDevicesToGroup(Long groupId, List<Long> deviceIds) {
        DeviceGroup group = deviceGroupRepository.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Device group not found"));
        List<Device> devices = deviceRepository.findAllById(deviceIds);
        for (Device device : devices) {
            device.setDeviceGroup(group);
        }

        deviceRepository.saveAll(devices);

        return new DeviceGroupResponse(200, "Devices added to group", deviceGroupMapper.toDTO(group));
    }
}
