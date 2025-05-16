package com.main.aiot_service.kafka;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.main.aiot_service.model.entity.Device;
import com.main.aiot_service.model.entity.OperatorSession;
import com.main.aiot_service.service.supervisor.OperatorSessionService;
import com.main.aiot_service.service.team_lead.DeviceServiceImpl;
import com.main.aiot_service.util.LinuxExecutor;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaSSHCommandConsumer {

    private final OperatorSessionService sessionService;
    private final DeviceServiceImpl deviceService;

    @KafkaListener(topics = "ssh-commands", groupId = "aiot-monitor")
    public void listen(String messageJson) throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode json = mapper.readTree(messageJson);

        String operator = json.get("operator").asText();
        Long deviceId = json.get("deviceId").asLong();
        String command = json.get("command").asText();

        Device device = deviceService.getDeviceEntityById(deviceId);

        // Start session
        OperatorSession session = sessionService.startSession(operator, device.getDeviceName(), "Executing: " + command);

        // Run command simulation or actual SSH
        String output = LinuxExecutor.executeCommand(device, command);

        // Optionally send back result via WebSocket
        sessionService.endSession(session.getId(), false);
    }
}

