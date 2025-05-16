package com.main.aiot_service.model.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ProfileDTO {
    private Long id;
    private String profileName;
    private Long deviceGroupId;
    private Long commandListId;
    private List<UserDTO> assignedOperators;
}
