package introse.group20.hms.configuration;

import introse.group20.hms.application.adapters.IChatBoxAdapter;
import introse.group20.hms.application.adapters.IMessageAdapter;
import introse.group20.hms.application.services.ChatBoxService;
import introse.group20.hms.application.services.MessageService;
import introse.group20.hms.application.services.interfaces.IChatBoxService;
import introse.group20.hms.application.services.interfaces.IMessageService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ChatConfiguration {
    @Bean
    public IChatBoxService chatBoxService(IChatBoxAdapter chatBoxAdapter){
        return new ChatBoxService(chatBoxAdapter);
    }
    @Bean
    public IMessageService messageService(IChatBoxAdapter chatBoxAdapter, IMessageAdapter messageAdapter){
        return new MessageService(chatBoxAdapter, messageAdapter);
    }
}
