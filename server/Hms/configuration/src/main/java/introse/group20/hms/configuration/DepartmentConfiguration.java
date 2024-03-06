package introse.group20.hms.configuration;

import introse.group20.hms.application.adapters.IDepartmentAdapter;
import introse.group20.hms.application.services.DepartmentService;
import introse.group20.hms.application.services.interfaces.IDepartmentService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DepartmentConfiguration {
    @Bean
    public IDepartmentService departmentService(IDepartmentAdapter departmentAdapter){
        return new DepartmentService(departmentAdapter);
    }
}
