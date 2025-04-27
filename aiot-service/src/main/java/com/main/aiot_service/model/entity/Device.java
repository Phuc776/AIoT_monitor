package com.main.aiot_service.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "devices")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Device {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceName;

    private String ipAddress;

    private String deviceType; // e.g., switch, router, server

    private String location;

    private String status; // e.g., active, inactive, maintenance
    @ManyToOne
    @JoinColumn(name = "device_group_id")
    private DeviceGroup deviceGroup;
}
