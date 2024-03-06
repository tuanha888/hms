package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.interfaces.IAppointmentService;
import introse.group20.hms.core.entities.Appointment;
import introse.group20.hms.core.entities.enums.AppointmentStatus;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.webapi.DTOs.AppointmentDTO.AppointmentRequest;
import introse.group20.hms.webapi.DTOs.AppointmentDTO.AppointmentResponse;
import introse.group20.hms.webapi.utils.AuthExtensions;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
@Validated
public class AppointmentController {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    IAppointmentService appointmentService;
    @GetMapping(value = "/doctor", name = "getForDoctor")
    @Secured("DOCTOR")
    //route" /api/appointments/doctor
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsOfDoctor(){
        UUID doctorId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        List<AppointmentResponse> appointmentResponses = appointmentService.getAppointmentByDoctor(doctorId).stream()
                .map(this::mapToApmResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(appointmentResponses);
    }

    @GetMapping(value = "/patient", name = "getForPatient")
    @Secured("PATIENT")
        //route" /api/appointments/patient
    public ResponseEntity<List<AppointmentResponse>> getAppointmentsOfPatient(){
        UUID patientId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        List<AppointmentResponse> appointmentResponses = appointmentService.getAppointmentByPatient(patientId).stream()
                .map(this::mapToApmResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(appointmentResponses);
    }

    @PostMapping("/")
    @Secured("PATIENT")
    public ResponseEntity<AppointmentResponse> createAppointment(@Valid @RequestBody AppointmentRequest appointmentRequest) throws BadRequestException {
        UUID patientId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Appointment appointment = modelMapper.map(appointmentRequest, Appointment.class);
        Appointment savedApm = appointmentService.addAppointment(appointmentRequest.getDoctorId(), patientId, appointment);
        return ResponseEntity.ok(mapToApmResponse(savedApm));
    }

    @PutMapping("/{appointmentId}")
    @Secured("PATIENT")
    public ResponseEntity<AppointmentResponse> updateAppointment(@PathVariable UUID appointmentId, @Valid @RequestBody AppointmentRequest apmRequest) throws NotFoundException, BadRequestException {
//        AppointmentStatus apmStatus = AppointmentStatus.valueOf(status);
        Appointment appointment = modelMapper.map(apmRequest, Appointment.class);
//        appointment.setStatus(apmStatus);
        appointment.setId(appointmentId);
        appointment.setStatus(AppointmentStatus.PENDING);
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Appointment updatedAppointment = appointmentService.updateAppointment(userId, appointment);
        return new ResponseEntity<>(mapToApmResponse(updatedAppointment), HttpStatus.ACCEPTED);
    }

    @PutMapping("/accept/{appointmentId}")
    @Secured("DOCTOR")
    public ResponseEntity<AppointmentResponse> acceptAppointment(@PathVariable UUID appointmentId) throws NotFoundException, BadRequestException {
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Appointment appointment = appointmentService.getById(appointmentId);
        if(appointment.getStatus() != AppointmentStatus.PENDING){
            throw new BadRequestException("Action not allowed!");
        }
        appointment.setStatus(AppointmentStatus.ACCEPT);
        Appointment updatedAppointment = appointmentService.updateAppointment(userId, appointment);
        return new ResponseEntity<>(mapToApmResponse(updatedAppointment), HttpStatus.ACCEPTED);
    }

    @PutMapping("/reject/{appointmentId}")
    @Secured("DOCTOR")
    public ResponseEntity<AppointmentResponse> rejectAppointment(@PathVariable UUID appointmentId) throws NotFoundException, BadRequestException {
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Appointment appointment = appointmentService.getById(appointmentId);
        if(appointment.getStatus() != AppointmentStatus.PENDING){
            throw new BadRequestException("Action not allowed!");
        }
        appointment.setStatus(AppointmentStatus.REJECT);
        Appointment updatedAppointment = appointmentService.updateAppointment(userId, appointment);
        return new ResponseEntity<>(mapToApmResponse(updatedAppointment), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{appointmentId}")
    @Secured({"PATIENT"})
    public ResponseEntity<HttpStatus> deleteAppointment(@PathVariable UUID appointmentId) throws BadRequestException {
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        appointmentService.deleteAppointment(userId, appointmentId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    private AppointmentResponse mapToApmResponse(Appointment appointment){
        var status = modelMapper.map(appointment.getStatus(), introse.group20.hms.webapi.DTOs.enums.AppointmentStatus.class);
        return new AppointmentResponse(
                appointment.getId(),
                appointment.getDoctor().getId(),
                appointment.getPatient().getId(),
                appointment.getDoctor().getName(),
                appointment.getPatient().getName(),
                appointment.getTime(),
                status,
                appointment.getNote()
        );
    }
}
