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
    private Integer port;
    private String deviceType; // e.g., switch, router, server

    private String location;
    private String status; // e.g., active, inactive, maintenance

    private String connectionProtocol; // SSH, HTTP, MQTT, etc.
    private String authMethod;         // password, ssh-key
    private String username;
    private String password;           // stored securely, encrypted
    private String publicKey;          // optional, if SSH key
    private String osType;             // linux, alpine, etc.
    @ManyToOne
    @JoinColumn(name = "device_group_id")
    private DeviceGroup deviceGroup;
}
