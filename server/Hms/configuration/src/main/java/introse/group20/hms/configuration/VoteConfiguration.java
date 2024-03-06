package introse.group20.hms.configuration;

import introse.group20.hms.application.adapters.IVoteAdapter;
import introse.group20.hms.application.services.VoteService;
import introse.group20.hms.application.services.interfaces.IVoteService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class VoteConfiguration {

    @Bean
    public IVoteService voteService(IVoteAdapter voteAdapter) {
        return new VoteService(voteAdapter);
    }

}
