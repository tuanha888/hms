package introse.group20.hms.configuration;

import introse.group20.hms.application.adapters.ICategoryAdapter;
import introse.group20.hms.application.services.CategoryService;
import introse.group20.hms.application.services.interfaces.ICategoryService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CategoryConfiguration {
    @Bean
    public ICategoryService categoryService(ICategoryAdapter categoryAdapter){
        return new CategoryService(categoryAdapter);
    }
}
