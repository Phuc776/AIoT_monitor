package com.main.aiot_service.service.team_lead;

import com.main.aiot_service.model.dto.ProfileDTO;
import com.main.aiot_service.model.entity.CommandList;
import com.main.aiot_service.model.entity.DeviceGroup;
import com.main.aiot_service.model.entity.Profile;
import com.main.aiot_service.model.mapper.ProfileMapper;
import com.main.aiot_service.model.request.ProfileRequest;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.model.response.ProfileResponse;
import com.main.aiot_service.repository.CommandListRepository;
import com.main.aiot_service.repository.DeviceGroupRepository;
import com.main.aiot_service.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements IProfileService{

    private final DeviceGroupRepository deviceGroupRepository;
    private final CommandListRepository commandListRepository;
    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;

    @Override
    public ProfileResponse createProfile(ProfileRequest request) {
        DeviceGroup deviceGroup = deviceGroupRepository.findById(request.getDeviceGroupId())
                .orElseThrow(() -> new RuntimeException("DeviceGroup not found"));

        CommandList commandList = commandListRepository.findById(request.getCommandListId())
                .orElseThrow(() -> new RuntimeException("CommandList not found"));

        Profile profile = Profile.builder()
                .profileName(request.getProfileName())
                .deviceGroup(deviceGroup)
                .commandList(commandList)
                .build();

        Profile savedProfile = profileRepository.save(profile);
        return new ProfileResponse(200, "Profile created successfully", profileMapper.toDTO(savedProfile));
    }

    @Override
    public ProfileResponse getProfileById(Long id) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        return new ProfileResponse(200, "Profile found", profileMapper.toDTO(profile));
    }

    @Override
    public Page<ProfileDTO> getAllProfiles(Pageable pageable) {
        return profileRepository.findAll(pageable)
                .map(profileMapper::toDTO);
    }

    @Override
    public ProfileResponse updateProfile(Long id, ProfileRequest request) {
        return null;
    }

    @Override
    public MessageResponse deleteProfile(Long id) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        profileRepository.delete(profile);
        return new MessageResponse(200, "Profile deleted successfully");
    }
}
