package introse.group20.hms.configuration;

import introse.group20.hms.application.adapters.ISendSmsAdapter;
import introse.group20.hms.application.services.SendSmsService;
import introse.group20.hms.application.services.interfaces.ISendSmsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SmsConfiguration {
    @Bean
    public ISendSmsService sendSmsService(ISendSmsAdapter sendSmsAdapter){
        return new SendSmsService(sendSmsAdapter);
    }
}
