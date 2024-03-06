package introse.group20.hms.configuration;

import introse.group20.hms.application.adapters.IPostAdapter;
import introse.group20.hms.application.services.PostService;
import introse.group20.hms.application.services.interfaces.IPostService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PostConfiguration {
    @Bean
    public IPostService postService(IPostAdapter postAdapter){
        return new PostService(postAdapter);
    }
}
