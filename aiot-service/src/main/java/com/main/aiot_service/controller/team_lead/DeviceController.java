package com.main.aiot_service.controller.team_lead;

import com.main.aiot_service.model.dto.DeviceDTO;
import com.main.aiot_service.model.request.DeviceRequest;
import com.main.aiot_service.model.response.DeviceResponse;
import com.main.aiot_service.service.team_lead.DeviceServiceImpl;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team-lead/device")
@RequiredArgsConstructor
public class DeviceController {
    private final DeviceServiceImpl deviceService;

    @PostMapping
    public DeviceResponse createDevice(@Valid @RequestBody DeviceRequest request) {
        return deviceService.createDevice(request);
    }

    @GetMapping
    public ResponseEntity<Page<DeviceDTO>> getAllDevices(Pageable pageable) {
        return ResponseEntity.ok(deviceService.getAllDevices(pageable));
    }

    @GetMapping("/{id}")
    public DeviceResponse getDeviceById(@PathVariable Long id) {
        return deviceService.getDeviceById(id);
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteDevice(Long id) {
//        deviceService.deleteDevice(id);
//        return ResponseEntity.noContent().build();
//    }
}
