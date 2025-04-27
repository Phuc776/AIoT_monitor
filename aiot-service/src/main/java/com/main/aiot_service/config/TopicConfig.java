package com.main.aiot_service.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TopicConfig {
    // Topic sends SSH commands
    @Bean
    public NewTopic sshCommandsTopic() {
        return new NewTopic("ssh-commands", 1, (short) 1);
    }

    // Topic sends file edit commands
    @Bean
    public NewTopic fileEditCommandsTopic() {
        return new NewTopic("file-edit-commands", 1, (short) 1);
    }

    // Topic gives commands to the supervisor
    @Bean
    public NewTopic supervisorActionsTopic() {
        return new NewTopic("supervisor-actions", 1, (short) 1);
    }

    // Topic writes session logs
    @Bean
    public NewTopic sessionLogsTopic() {
        return new NewTopic("session-logs", 1, (short) 1);
    }
}
