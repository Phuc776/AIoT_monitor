package com.main.aiot_service.service.operator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OperatorKafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendSSHCommand(String operator, Long deviceId, String command) throws JsonProcessingException {
        Map<String, Object> message = Map.of(
                "operator", operator,
                "deviceId", deviceId,
                "command", command
        );
        kafkaTemplate.send("ssh-commands", new ObjectMapper().writeValueAsString(message));
    }

    public void sendFileEditCommand(String deviceName, String filePath, String content) throws JsonProcessingException {
        Map<String, String> message = Map.of(
                "device", deviceName,
                "filePath", filePath,
                "content", content
        );
        kafkaTemplate.send("file-edit-commands", new ObjectMapper().writeValueAsString(message));
    }
}
