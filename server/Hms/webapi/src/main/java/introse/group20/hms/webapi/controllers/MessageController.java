package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.interfaces.IMessageService;
import introse.group20.hms.core.entities.Doctor;
import introse.group20.hms.core.entities.Message;
import introse.group20.hms.webapi.DTOs.DoctorDTO.DoctorResponse;
import introse.group20.hms.webapi.DTOs.MessageDTO.MessageDisplay;
import introse.group20.hms.webapi.DTOs.MessageDTO.MessageRequest;
import introse.group20.hms.webapi.DTOs.PatientDTO.PatientResponse;
import introse.group20.hms.webapi.utils.AuthExtensions;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class MessageController {
    @Autowired
    SimpMessagingTemplate messagingTemplate;
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    IMessageService messageService;
    @MessageMapping("/sendMessage")
    public void sendMessage(@Payload MessageRequest messageRequest){
        Message message = modelMapper.map(messageRequest, Message.class);
        Message saveMessage = messageService.saveMessage(message);
        MessageDisplay response = modelMapper.map(saveMessage, MessageDisplay.class);
        messagingTemplate.convertAndSendToUser(message.getReceiverId().toString(), "/queue/messages", response);
    }

    @GetMapping("/history")
    public ResponseEntity<List<MessageDisplay>> getConversation(
            @RequestParam(name = "senderId") UUID senderId,
            @RequestParam(name = "receiverId") UUID receiverId
    ){
        List<Message> messageList = messageService.getConversation(senderId, receiverId);
        List<MessageDisplay> messageDisplayList = messageList.stream()
                .map(message -> modelMapper.map(message, MessageDisplay.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(messageDisplayList);
    }
    @GetMapping("/getMessagesOfUser")
    public ResponseEntity<List<MessageDisplay>> getAllMessagesOfUser(){
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        List<MessageDisplay> messageList = messageService.getAllMessageOfUser(userId).stream()
                .map(message -> modelMapper.map(message, MessageDisplay.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(messageList);
    }

    @GetMapping("/api/message/contactedDoctor")
    @Secured("PATIENT")
    public ResponseEntity<List<DoctorResponse>> getContactedDoctor(){
        UUID patientId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        List<DoctorResponse> doctors = messageService.getContactedDoctor(patientId).stream()
                .map(doctor -> modelMapper.map(doctor, DoctorResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(doctors);
    }

    @GetMapping("/api/message/contactedPatient")
    @Secured("DOCTOR")
    public ResponseEntity<List<PatientResponse>> getContactedPatient(){
        UUID doctorId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        List<PatientResponse> patientResponses = messageService.getContactedPatient(doctorId).stream()
                .map(patient -> modelMapper.map(patient, PatientResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(patientResponses);
    }
    // for testing
    @PostMapping("/message/sendMessage")
    public ResponseEntity<MessageDisplay> createMessage(@RequestBody MessageRequest messageRequest){
        Message message = modelMapper.map(messageRequest, Message.class);
        Message savedMessage = messageService.saveMessage(message);
        return ResponseEntity.ok(modelMapper.map(savedMessage, MessageDisplay.class));
    }

}