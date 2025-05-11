package com.main.aiot_service.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String profileName;

    @ManyToOne
    @JoinColumn(name = "device_group_id")
    private DeviceGroup deviceGroup;

    @ManyToOne
    @JoinColumn(name = "command_list_id")
    private CommandList commandList;

    @ManyToMany(mappedBy = "assignedProfiles")
    private List<User> assignedOperators;
}

