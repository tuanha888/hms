package introse.group20.hms.application.services;

import introse.group20.hms.application.adapters.IChatBoxAdapter;
import introse.group20.hms.application.services.interfaces.IChatBoxService;
import introse.group20.hms.core.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.UUID;

public class ChatBoxService implements IChatBoxService {
    @Autowired
    IChatBoxAdapter chatBoxAdapter;
    public ChatBoxService(IChatBoxAdapter chatBoxAdapter){this.chatBoxAdapter = chatBoxAdapter;}
    @Override
    public Optional<UUID> getConversationId(UUID senderId, UUID receiverId, boolean createNewBoxIfNotExist){
        return chatBoxAdapter.getConversationIdAdapter(senderId, receiverId, createNewBoxIfNotExist);
    }
}
