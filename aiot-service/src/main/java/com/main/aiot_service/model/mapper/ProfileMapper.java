package com.main.aiot_service.model.mapper;

import com.main.aiot_service.model.dto.ProfileDTO;
import com.main.aiot_service.model.entity.CommandList;
import com.main.aiot_service.model.entity.DeviceGroup;
import com.main.aiot_service.model.entity.Profile;
import org.springframework.stereotype.Component;

@Component
public class ProfileMapper {

    public ProfileDTO toDTO(Profile profile) {
        return ProfileDTO.builder()
                .id(profile.getId())
                .profileName(profile.getProfileName())
                .deviceGroupId(profile.getDeviceGroup().getId())
                .commandListId(profile.getCommandList().getId())
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

