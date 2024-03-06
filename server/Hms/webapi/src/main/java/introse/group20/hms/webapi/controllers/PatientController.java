package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.interfaces.IPatientService;
import introse.group20.hms.application.services.interfaces.ISendSmsService;
import introse.group20.hms.core.entities.Patient;
import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.entities.enums.Gender;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.webapi.DTOs.AuthDTO.UserDTO;
import introse.group20.hms.webapi.DTOs.PatientDTO.PatientRequest;
import introse.group20.hms.webapi.DTOs.PatientDTO.PatientResponse;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import static org.springframework.web.bind.annotation.RequestMethod.POST;
import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/patients")
public class PatientController {
    @Autowired
    private IPatientService patientService;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ISendSmsService smsService;
    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @PostMapping
    @Secured("DOCTOR")
    @Transactional
    public ResponseEntity<UserDTO> createPatient(@Valid @RequestBody PatientRequest patientRequest) throws IOException, BadRequestException {
        Patient patient = new Patient();
        modelMapper.map(patientRequest, patient);
        patient.setGender(Gender.valueOf(patientRequest.getGender()));
        User user = patientService.addPatient(patient);
        UserDTO userDTO = modelMapper.map(user, UserDTO.class);
//        simpMessagingTemplate.convertAndSend("/topic/doctor", userDTO);
        String message = String.format("Tài khoản: %s\nMật khẩu: %s", userDTO.getUsername(), userDTO.getPassword());
        smsService.sendSms(patientRequest.getPhoneNumber(), message);
        return new ResponseEntity<UserDTO>(userDTO, HttpStatus.CREATED);
    }

    @GetMapping
    @Secured({"DOCTOR", "ADMIN"})
    public ResponseEntity<List<PatientResponse>> getAllPatient(){
        List<PatientResponse> patientResponses = patientService.getAllPatient().stream()
                .map(patient -> modelMapper.map(patient, PatientResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(patientResponses);
    }

    @GetMapping("/{patientId}")
    @Secured({"DOCTOR", "PATIENT"})
    public ResponseEntity<PatientResponse> getPatientById(@PathVariable UUID patientId) throws NotFoundException {
        Patient patient = patientService.getPatientById(patientId);
        return ResponseEntity.ok(modelMapper.map(patient, PatientResponse.class));
    }

    @GetMapping("/byType")
    @Secured("DOCTOR")
    public ResponseEntity<List<PatientResponse>> getPatientByType(@RequestParam String stayType){
        List<PatientResponse> list =  patientService.getPatientByType(stayType).stream()
                .map(patient -> modelMapper.map(patient, PatientResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @GetMapping("/doctor")
    @Secured("DOCTOR")
    public ResponseEntity<List<PatientResponse>> getPatientOfDoctor(@RequestParam UUID doctorId) throws NotFoundException {
        List<PatientResponse> list = patientService.getPatientOfDoctor(doctorId).stream()
                .map(patient -> modelMapper.map(patient, PatientResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{patientId}")
    @Secured("DOCTOR")
    public ResponseEntity<PatientResponse> updatePatient(@PathVariable UUID patientId, @Valid @RequestBody PatientRequest request) throws BadRequestException {
        Patient patient = modelMapper.map(request, Patient.class);
        patient.setId(patientId);
        Patient savePatient = patientService.updatePatient(patient);
        return new ResponseEntity<>(modelMapper.map(savePatient, PatientResponse.class), HttpStatus.ACCEPTED);
    }
}
