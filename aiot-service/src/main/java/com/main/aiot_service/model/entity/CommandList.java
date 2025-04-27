package com.main.aiot_service.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "command_lists")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommandList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String listName;

    @Lob
    private String commands;
}
