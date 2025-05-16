package com.main.aiot_service.model.mapper;

import com.main.aiot_service.model.dto.ProfileDTO;
import com.main.aiot_service.model.dto.UserDTO;
import com.main.aiot_service.model.entity.CommandList;
import com.main.aiot_service.model.entity.DeviceGroup;
import com.main.aiot_service.model.entity.Profile;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProfileMapper {

    public ProfileDTO toDTO(Profile profile) {
        List<UserDTO> operatorDTOs = null;

        if (profile.getAssignedOperators() != null) {
            operatorDTOs = profile.getAssignedOperators().stream()
                    .map(UserMapper::toDTO)
                    .collect(Collectors.toList());
        }

        return ProfileDTO.builder()
                .id(profile.getId())
                .profileName(profile.getProfileName())
                .deviceGroupId(profile.getDeviceGroup().getId())
                .commandListId(profile.getCommandList().getId())
                .assignedOperators(operatorDTOs)
                .build();
    }

    public Profile toEntity(ProfileDTO dto, DeviceGroup deviceGroup, CommandList commandList) {
        return Profile.builder()
                .id(dto.getId())
                .profileName(dto.getProfileName())
                .deviceGroup(deviceGroup)
                .commandList(commandList)
                .build();
    }
}


