package com.main.aiot_service.service.team_lead;

import com.main.aiot_service.model.dto.DeviceDTO;
import com.main.aiot_service.model.entity.Device;
import com.main.aiot_service.model.entity.DeviceGroup;
import com.main.aiot_service.model.mapper.DeviceMapper;
import com.main.aiot_service.model.request.DeviceRequest;
import com.main.aiot_service.model.response.DeviceResponse;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.repository.DeviceGroupRepository;
import com.main.aiot_service.repository.DeviceRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DeviceServiceImpl implements IDeviceService{
    private final DeviceRepository deviceRepository;
    private final DeviceGroupRepository deviceGroupRepository;
    private final DeviceMapper deviceMapper;

    @Override
    public DeviceResponse createDevice(DeviceRequest request) {
        DeviceGroup group = deviceGroupRepository.findById(request.getDeviceGroupId())
                .orElseThrow(() -> new EntityNotFoundException("Device Group not found."));

        Device device = deviceMapper.toEntity(request, group);
        deviceRepository.save(device);
        return new DeviceResponse(200, "Create device successfully", deviceMapper.toDTO(device));
    }

    @Override
    public Page<DeviceDTO> getAllDevices(Pageable pageable) {
        return deviceRepository.findAll(pageable)
                .map(deviceMapper::toDTO);
    }

    @Override
    public Page<DeviceDTO> getUnassignedDevices(Pageable pageable) {
        return deviceRepository.findByDeviceGroupIsNull(pageable)
                .map(deviceMapper::toDTO);
    }

    @Override
    public DeviceResponse getDeviceById(Long id) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Device not found."));
        return new DeviceResponse(200, "Device found!",deviceMapper.toDTO(device));
    }

    @Override
    public MessageResponse deleteDevice(Long id) {
        deviceRepository.deleteById(id);
        return new MessageResponse(200, "Device deleted successfully");
    }

    @Override
    public Device getDeviceEntityById(Long id) {
        return deviceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Device not found."));
    }
}
