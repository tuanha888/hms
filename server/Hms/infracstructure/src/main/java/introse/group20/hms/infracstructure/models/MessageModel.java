package introse.group20.hms.infracstructure.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;
@Entity
@Data
@Table(name = "messages")
@NoArgsConstructor
public class MessageModel {
    @Id
//    @GeneratedValue
    private UUID id;
    private UUID conversationId;
    private UUID senderId;
    private UUID receiverId;
    private String content;
    private Date time;
}
