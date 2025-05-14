package com.main.aiot_service.model.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ProfileDTO {
    private Long id;
    private String profileName;
    private Long deviceGroupId;
    private Long commandListId;
}
