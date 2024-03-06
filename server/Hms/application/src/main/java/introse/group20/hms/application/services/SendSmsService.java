package introse.group20.hms.application.services;

import introse.group20.hms.application.adapters.ISendSmsAdapter;
import introse.group20.hms.application.services.interfaces.ISendSmsService;
import introse.group20.hms.core.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;

public class SendSmsService implements ISendSmsService {
    @Autowired
    ISendSmsAdapter sendSmsAdapter;
    public SendSmsService(ISendSmsAdapter sendSmsAdapter){
        this.sendSmsAdapter = sendSmsAdapter;
    }
    @Override
    public void sendSms(String phoneNumber, String message) throws IOException, BadRequestException {
        sendSmsAdapter.sendSmsAdapter(phoneNumber, message);
    }
}
