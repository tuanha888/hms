package introse.group20.hms.infracstructure.adapters;

import com.fasterxml.jackson.databind.JsonNode;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.verify.v2.service.Verification;
import com.twilio.type.PhoneNumber;
import introse.group20.hms.application.adapters.ISendSmsAdapter;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.infracstructure.sms.SpeedSMSAPI;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.HashMap;

@Component
public class SendSmsAdapter implements ISendSmsAdapter {

    @Override
    public void sendSmsAdapter(String phoneNumber, String password) throws IOException, BadRequestException {
        SpeedSMSAPI api = new SpeedSMSAPI("CbIbCtZNZ065XSlnkbJpibxFCmGoH_rN");
        String result = api.sendSMS(phoneNumber, password, 5, "f5b2ed33c923ad4c");
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(result);
        String status = jsonNode.get("status").asText();
        if(status.equals("error")) {
            String errorMessage = jsonNode.get("message").asText();
            throw new BadRequestException(errorMessage);
        }
    }
}
