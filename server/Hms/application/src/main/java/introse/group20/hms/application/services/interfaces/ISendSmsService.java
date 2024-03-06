package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.exceptions.BadRequestException;

import java.io.IOException;

public interface ISendSmsService {
    void sendSms(String phoneNumber, String message) throws IOException, BadRequestException;

}
