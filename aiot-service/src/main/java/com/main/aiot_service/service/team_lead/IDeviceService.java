package com.main.aiot_service.service.team_lead;

import com.main.aiot_service.model.dto.DeviceDTO;
import com.main.aiot_service.model.entity.Device;
import com.main.aiot_service.model.request.DeviceRequest;
import com.main.aiot_service.model.response.DeviceResponse;
import com.main.aiot_service.model.response.MessageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IDeviceService {
    DeviceResponse createDevice(DeviceRequest request);
    Page<DeviceDTO> getAllDevices(Pageable pageable);
    DeviceResponse getDeviceById(Long id);
    Page<DeviceDTO> getUnassignedDevices(Pageable pageable);
    MessageResponse deleteDevice(Long id);
    Device getDeviceEntityById(Long id);
}
