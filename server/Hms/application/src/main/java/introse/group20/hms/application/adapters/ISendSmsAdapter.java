package introse.group20.hms.application.adapters;

import introse.group20.hms.core.exceptions.BadRequestException;

import java.io.IOException;

public interface ISendSmsAdapter {
    void sendSmsAdapter(String phoneNumber, String password) throws IOException, BadRequestException;
}
