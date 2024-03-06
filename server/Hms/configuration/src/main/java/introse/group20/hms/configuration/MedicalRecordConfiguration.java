package introse.group20.hms.configuration;

import introse.group20.hms.application.adapters.IMedicalRecordAdapter;
import introse.group20.hms.application.services.MedicalRecordService;
import introse.group20.hms.application.services.interfaces.IMedicalRecordService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MedicalRecordConfiguration {

    @Bean
    public IMedicalRecordService medicalRecordService(IMedicalRecordAdapter iMedicalRecordAdapter) {
        return new MedicalRecordService(iMedicalRecordAdapter);
    }

}
