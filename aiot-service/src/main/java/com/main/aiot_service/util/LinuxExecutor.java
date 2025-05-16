package com.main.aiot_service.util;


import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.ChannelExec;
import com.main.aiot_service.model.entity.Device;

import java.io.ByteArrayOutputStream;

public class LinuxExecutor {

    public static String executeCommand(Device device, String command) throws Exception {

        JSch jsch = new JSch();
        Session session;

        // Auth: password-based for now
        session = jsch.getSession(device.getUsername(), device.getIpAddress(), device.getPort());
        session.setPassword(device.getPassword());

        session.setConfig("StrictHostKeyChecking", "no");
        session.connect(10000); // 10 sec timeout

        // Open exec channel
        ChannelExec channel = (ChannelExec) session.openChannel("exec");
        channel.setCommand(command);

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        channel.setOutputStream(outputStream);

        channel.connect();

        // Wait until execution finishes
        while (!channel.isClosed()) {
            Thread.sleep(100);
        }

        String output = outputStream.toString();
        channel.disconnect();
        session.disconnect();
        return output;
    }
}

