package com.main.aiot_service.model.request;

import lombok.Data;

@Data
public class FileEditRequest {
    private String deviceName;
    private String filePath;
    private String newContent;
}