package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.Optional;
import java.util.UUID;

public interface IChatBoxService {
    Optional<UUID> getConversationId(UUID senderId, UUID receiverId, boolean createNewBoxIfNotExist);
}
