package com.main.aiot_service.controller.operator;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.main.aiot_service.model.request.FileEditRequest;
import com.main.aiot_service.model.request.OperatorCommandRequest;
import com.main.aiot_service.model.response.MessageResponse;
import com.main.aiot_service.service.operator.OperatorKafkaProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/operator")
@RequiredArgsConstructor
public class OperatorController {
    private final OperatorKafkaProducer kafkaProducer;

    @PostMapping("/ssh-command")
    public MessageResponse sendSSHCommand(@RequestBody OperatorCommandRequest request) throws JsonProcessingException {
        kafkaProducer.sendSSHCommand(
                request.getOperatorName(),
                request.getDeviceId(),
                request.getCommand()
        );
        return new MessageResponse(200, "SSH command sent to device");
    }
    @PostMapping("/file-edit")
    public MessageResponse editFile(@RequestBody FileEditRequest request) throws JsonProcessingException {
        kafkaProducer.sendFileEditCommand(request.getDeviceName(), request.getFilePath(), request.getNewContent());
        return new MessageResponse(200, "File edit command sent to device");
    }
}
