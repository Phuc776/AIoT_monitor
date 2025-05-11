package com.main.aiot_service.service.team_lead;

import com.main.aiot_service.model.dto.DeviceGroupDto;
import com.main.aiot_service.model.request.DeviceGroupRequest;
import com.main.aiot_service.model.response.DeviceGroupResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IDeviceGroupService {
    DeviceGroupResponse createGroup(DeviceGroupRequest request);
    Page<DeviceGroupDto> getAllGroups(Pageable pageable);
    DeviceGroupResponse addDevicesToGroup(Long groupId, List<Long> deviceIds);
}
