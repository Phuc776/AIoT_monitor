package com.main.aiot_service.service.team_lead;

import com.main.aiot_service.model.dto.ProfileDTO;
import com.main.aiot_service.model.dto.UserDTO;
import com.main.aiot_service.model.request.ProfileRequest;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.model.response.ProfileResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProfileService {
    ProfileResponse createProfile(ProfileRequest request);
    ProfileResponse getProfileById(Long id);
    Page<ProfileDTO> getAllProfiles(Pageable pageable);
    ProfileResponse updateProfile(Long id, ProfileRequest request);
    MessageResponse deleteProfile(Long id);
    Page<UserDTO> getAllOperators(Pageable pageable);
    MessageResponse assignOperatorsToProfile(Long profileId, List<Long> operatorIds);
}
