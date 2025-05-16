package com.main.aiot_service.controller.team_lead;

import com.main.aiot_service.model.dto.ProfileDTO;
import com.main.aiot_service.model.dto.UserDTO;
import com.main.aiot_service.model.request.ProfileRequest;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.model.response.ProfileResponse;
import com.main.aiot_service.service.team_lead.IProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/team-lead/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final IProfileService profileService;

    @PostMapping
    public ProfileResponse createProfile(@RequestBody ProfileRequest request) {
        return profileService.createProfile(request);
    }

    @GetMapping("/{id}")
    public ProfileResponse getProfileById(@PathVariable Long id) {
        return profileService.getProfileById(id);
    }

    @GetMapping
    public ResponseEntity<Page<ProfileDTO>> getAllProfiles(Pageable pageable) {
        return ResponseEntity.ok(profileService.getAllProfiles(pageable));
    }

    @PostMapping("/{id}")
    public ProfileResponse updateProfile(@PathVariable Long id, @RequestBody ProfileRequest request) {
        return profileService.updateProfile(id, request);
    }

    @DeleteMapping("/{id}")
    public MessageResponse deleteProfile(@PathVariable Long id) {
        return profileService.deleteProfile(id);
    }

    @PostMapping("/{profileId}/assign-operators")
    public MessageResponse assignOperatorsToProfile(
            @PathVariable Long profileId,
            @RequestBody List<Long> operatorIds
    ) {
        return profileService.assignOperatorsToProfile(profileId, operatorIds);
    }

    @GetMapping("/operators")
    public ResponseEntity<Page<UserDTO>> getAllOperators(Pageable pageable) {
        return ResponseEntity.ok(profileService.getAllOperators(pageable));
    }
}
