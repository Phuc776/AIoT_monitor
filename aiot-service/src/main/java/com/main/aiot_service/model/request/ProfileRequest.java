package com.main.aiot_service.model.request;

import lombok.Data;

@Data
public class ProfileRequest {
    private String profileName;
    private Long deviceGroupId;
    private Long commandListId;
}
