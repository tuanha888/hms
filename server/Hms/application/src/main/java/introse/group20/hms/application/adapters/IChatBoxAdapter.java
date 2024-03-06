package introse.group20.hms.application.adapters;

import java.util.Optional;
import java.util.UUID;

public interface IChatBoxAdapter {
    Optional<UUID> getConversationIdAdapter(UUID senderId, UUID receiverId, boolean createNewBoxIfNotExist);
    UUID createChatBoxAdapter(UUID senderId, UUID receiverId);
}
