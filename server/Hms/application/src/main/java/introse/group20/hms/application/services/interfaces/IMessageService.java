package introse.group20.hms.application.services.interfaces;


import introse.group20.hms.core.entities.Doctor;
import introse.group20.hms.core.entities.Message;
import introse.group20.hms.core.entities.Patient;

import java.util.List;
import java.util.UUID;

public interface IMessageService {
    List<Message> getConversation(UUID senderId, UUID receiverId);
    Message saveMessage(Message message);
    List<Message> getAllMessageOfUser(UUID userId);
    List<Doctor> getContactedDoctor(UUID patientId);
    List<Patient> getContactedPatient(UUID doctorId);
//    Message getLatestMessage(UUID doctorId, UUID patientId);
}
