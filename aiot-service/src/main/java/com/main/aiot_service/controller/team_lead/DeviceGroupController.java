package com.main.aiot_service.controller.team_lead;

import com.main.aiot_service.model.dto.DeviceDTO;
import com.main.aiot_service.model.dto.DeviceGroupDTO;
import com.main.aiot_service.model.request.DeviceGroupRequest;
import com.main.aiot_service.model.response.DeviceGroupResponse;
import com.main.aiot_service.service.team_lead.IDeviceGroupService;
import com.main.aiot_service.service.team_lead.IDeviceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team-lead/device-group")
@RequiredArgsConstructor
public class DeviceGroupController {
    private final IDeviceService deviceService;
    private final IDeviceGroupService deviceGroupService;


    @PostMapping
    public DeviceGroupResponse createGroup(@Valid @RequestBody DeviceGroupRequest request) {
        return deviceGroupService.createGroup(request);
    }

    @GetMapping
    public ResponseEntity<Page<DeviceGroupDTO>> getAllGroups(Pageable pageable) {
        return ResponseEntity.ok(deviceGroupService.getAllGroups(pageable));
    }

    @GetMapping("/available-devices")
    public ResponseEntity<Page<DeviceDTO>> getAvailableDevices(Pageable pageable) {
        return ResponseEntity.ok(deviceService.getUnassignedDevices(pageable));
    }
    @PostMapping("/{groupId}/add-device")
    public DeviceGroupResponse addDevicesToGroup(
            @PathVariable Long groupId,
            @RequestBody List<Long> deviceIds
    ) {
        return deviceGroupService.addDevicesToGroup(groupId, deviceIds);
    }
}
