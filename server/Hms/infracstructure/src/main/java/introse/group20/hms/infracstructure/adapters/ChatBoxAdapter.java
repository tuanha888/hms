package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.IChatBoxAdapter;
import introse.group20.hms.infracstructure.models.ChatBoxModel;
import introse.group20.hms.infracstructure.repositories.IChatBoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.UUID;

@Component
public class ChatBoxAdapter implements IChatBoxAdapter {
    @Autowired
    IChatBoxRepository chatBoxRepository;
    @Override
    public Optional<UUID> getConversationIdAdapter(UUID senderId, UUID receiverId, boolean createNewBoxIfNotExist) {
        return chatBoxRepository.findBySenderIdAndReceiverId(senderId, receiverId)
                .map(ChatBoxModel::getConversationId)
                .or(() -> {
                    if(createNewBoxIfNotExist) {
                        UUID conversationId = createChatBoxAdapter(senderId, receiverId);
                        return Optional.of(conversationId);
                    }
                    return Optional.empty();
                });
    }

    @Override
    public UUID createChatBoxAdapter(UUID senderId, UUID receiverId) {
        UUID newConversationId = UUID.randomUUID();
        ChatBoxModel newChatBox1 = new ChatBoxModel();
        newChatBox1.setSenderId(senderId);
        newChatBox1.setReceiverId(receiverId);
        newChatBox1.setConversationId(newConversationId);
        chatBoxRepository.save(newChatBox1);

        ChatBoxModel newChatBox2 = new ChatBoxModel();
        newChatBox2.setSenderId(receiverId);
        newChatBox2.setReceiverId(senderId);
        newChatBox2.setConversationId(newConversationId);
        chatBoxRepository.save(newChatBox2);
        return newConversationId;
    }
}
