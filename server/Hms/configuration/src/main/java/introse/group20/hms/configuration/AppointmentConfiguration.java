package introse.group20.hms.configuration;

import introse.group20.hms.application.adapters.IAppointmentAdapter;
import introse.group20.hms.application.services.AppointmentService;
import introse.group20.hms.application.services.interfaces.IAppointmentService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppointmentConfiguration {
    @Bean
    public IAppointmentService appointmentService(IAppointmentAdapter appointmentAdapter){
        return new AppointmentService(appointmentAdapter);
    }
}
