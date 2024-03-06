package introse.group20.hms.infracstructure.repositories;

import introse.group20.hms.infracstructure.models.ChatBoxModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


public interface IChatBoxRepository extends JpaRepository<ChatBoxModel, UUID> {
    Optional<ChatBoxModel> findBySenderIdAndReceiverId(UUID senderId, UUID receiverId);
}
