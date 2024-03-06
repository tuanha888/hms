package introse.group20.hms.application.adapters;

import introse.group20.hms.core.entities.Doctor;
import introse.group20.hms.core.entities.Message;
import introse.group20.hms.core.entities.Patient;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IMessageAdapter {
//    List<Message> getConversationAdapter(UUID patientId, UUID doctorId);
//    Optional<Message> SendMessageAdapter(UUID doctorId, UUID patientId, Message message);
//    Optional<Message> getLatestMessageAdapter(UUID doctorId, UUID patientId);
    Message saveMessage(Message message);
    List<Message> getConversationAdapter(UUID conversationId);
    List<Message> getAllMessagesOfUserAdapter(UUID userId);
    List<Doctor> getContactedDoctorAdapter(UUID patientId);
    List<Patient> getContactedPatientAdapter(UUID doctorId);
}
