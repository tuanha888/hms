package introse.group20.hms.webapi.DTOs.MessageDTO;

import java.util.Date;
import java.util.UUID;
import lombok.Data;

@Data
public class MessageDisplay {
    private UUID id;
    private UUID senderId;
    private UUID receiverId;
    private String content;
    private Date time;
}
