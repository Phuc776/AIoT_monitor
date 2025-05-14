package com.main.aiot_service.model.entity;

import com.main.aiot_service.model.converter.CommandListConverter;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

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

    private String name;

    @Column(columnDefinition = "json")
    @Convert(converter = CommandListConverter.class)
    private List<String> commands;
}
