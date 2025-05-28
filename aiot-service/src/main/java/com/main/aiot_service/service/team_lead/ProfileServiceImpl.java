package com.main.aiot_service.service.team_lead;

import com.main.aiot_service.model.dto.ProfileDTO;
import com.main.aiot_service.model.dto.UserDTO;
import com.main.aiot_service.model.entity.*;
import com.main.aiot_service.model.mapper.ProfileMapper;
import com.main.aiot_service.model.mapper.UserMapper;
import com.main.aiot_service.model.request.ProfileRequest;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.model.response.ProfileResponse;
import com.main.aiot_service.repository.CommandListRepository;
import com.main.aiot_service.repository.DeviceGroupRepository;
import com.main.aiot_service.repository.ProfileRepository;
import com.main.aiot_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements IProfileService{

    private final DeviceGroupRepository deviceGroupRepository;
    private final CommandListRepository commandListRepository;
    private final ProfileRepository profileRepository;
    private final ProfileMapper profileMapper;
    private final UserRepository userRepository;

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
        Profile existingProfile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        DeviceGroup deviceGroup = deviceGroupRepository.findById(request.getDeviceGroupId())
                .orElseThrow(() -> new RuntimeException("DeviceGroup not found"));

        CommandList commandList = commandListRepository.findById(request.getCommandListId())
                .orElseThrow(() -> new RuntimeException("CommandList not found"));

        existingProfile.setProfileName(request.getProfileName());
        existingProfile.setDeviceGroup(deviceGroup);
        existingProfile.setCommandList(commandList);

        Profile updatedProfile = profileRepository.save(existingProfile);
        return new ProfileResponse(200, "Profile updated successfully", profileMapper.toDTO(updatedProfile));
    }

    @Override
    public MessageResponse deleteProfile(Long id) {
        Profile profile = profileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Profile not found"));
        profileRepository.delete(profile);
        return new MessageResponse(200, "Profile deleted successfully");
    }
    @Override
    @Transactional
    public MessageResponse assignOperatorsToProfile(Long profileId, List<Long> operatorIds) {
        Profile profile = profileRepository.findById(profileId)
                .orElseThrow(() -> new RuntimeException("Profile not found"));

        // 2. Xóa hết các liên kết cũ
        List<User> previouslyAssigned = userRepository.findAllByAssignedProfiles_Id(profileId);
        for (User u : previouslyAssigned) {
            u.getAssignedProfiles().removeIf(p -> p.getId().equals(profileId));
        }
        userRepository.saveAll(previouslyAssigned);

        List<User> operators = userRepository.findAllById(operatorIds);
        if (operators.size() != operatorIds.size()) {
            throw new RuntimeException("One or more users not found");
        }

//        profile.setAssignedOperators(operators);
//        profileRepository.save(profile);
        for (User user : operators) {
            // khởi tạo list nếu null
            if (user.getAssignedProfiles() == null) {
                user.setAssignedProfiles(new ArrayList<>());
            }
            user.getAssignedProfiles().add(profile);
        }

        // 4. Save tất cả User
        userRepository.saveAll(operators);

        return new MessageResponse(200, "Operators assigned to profile successfully");
    }

    @Override
    public Page<UserDTO> getAllOperators(Pageable pageable) {
        return userRepository.findByRole(Role.ROLE_OPERATOR, pageable)
                .map(UserMapper::toDTO);
    }

}
