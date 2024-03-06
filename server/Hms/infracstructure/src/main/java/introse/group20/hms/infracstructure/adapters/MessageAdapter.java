package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.IChatBoxAdapter;
import introse.group20.hms.application.adapters.IMessageAdapter;
import introse.group20.hms.core.entities.Doctor;
import introse.group20.hms.core.entities.Message;
import introse.group20.hms.core.entities.Patient;
import introse.group20.hms.infracstructure.mappers.DoctorMapperInfra;
import introse.group20.hms.infracstructure.models.DoctorModel;
import introse.group20.hms.infracstructure.models.MessageModel;
import introse.group20.hms.infracstructure.models.PatientModel;
import introse.group20.hms.infracstructure.repositories.IMessageRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class MessageAdapter implements IMessageAdapter {
    @Autowired
    IMessageRepository messageRepository;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    DoctorMapperInfra doctorMapperInfra;
    @Override
    public Message saveMessage(Message message) {
        MessageModel newMessage = modelMapper.map(message, MessageModel.class);
        MessageModel savedMessage = messageRepository.save(newMessage);
        return modelMapper.map(savedMessage, Message.class);
    }

    @Override
    public List<Message> getConversationAdapter(UUID conversationId) {
        List<MessageModel> messageModelList = messageRepository.findByConversationId(conversationId);
        return messageModelList.stream()
                .map(messageModel -> modelMapper.map(messageModel, Message.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Message> getAllMessagesOfUserAdapter(UUID userId) {
        List<MessageModel> messageModelList = messageRepository.findBySenderIdOrReceiverId(userId, userId);
        return messageModelList.stream()
                .map(messageModel -> modelMapper.map(messageModel, Message.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Doctor> getContactedDoctorAdapter(UUID patientId) {
        List<DoctorModel> doctorModels = messageRepository.findContactedDoctor(patientId);
        return doctorModels.stream()
                .map(doctorModel -> doctorMapperInfra.mapToDoctor(doctorModel))
                .collect(Collectors.toList());
    }

    @Override
    public List<Patient> getContactedPatientAdapter(UUID doctorId) {
        List<PatientModel> patientModels = messageRepository.findContactedPatient(doctorId);
        return patientModels.stream()
                .map(patientModel -> modelMapper.map(patientModel, Patient.class))
                .collect(Collectors.toList());
    }
}
