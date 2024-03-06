package introse.group20.hms.configuration;

import introse.group20.hms.application.adapters.IPrescriptionAdapter;
import introse.group20.hms.application.services.PrescriptionService;
import introse.group20.hms.application.services.interfaces.IPrescriptionService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PrescriptionConfiguration {
    @Bean
    public IPrescriptionService prescriptionService(IPrescriptionAdapter prescriptionAdapter){
        return new PrescriptionService(prescriptionAdapter);
    }
}
