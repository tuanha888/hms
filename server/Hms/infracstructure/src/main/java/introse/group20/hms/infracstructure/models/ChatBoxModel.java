package introse.group20.hms.infracstructure.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "chatrooms")
@Data
@NoArgsConstructor
public class ChatBoxModel {
    @Id
    @GeneratedValue
    private UUID id;
    private UUID conversationId;
    private UUID senderId;
    private UUID receiverId;
}
