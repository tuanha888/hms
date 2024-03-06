package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.interfaces.IPrescriptionService;
import introse.group20.hms.core.entities.Medicine;
import introse.group20.hms.core.entities.Post;
import introse.group20.hms.core.entities.Prescription;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.webapi.DTOs.MedicineDTO.MedicineResponse;
import introse.group20.hms.webapi.DTOs.PrescriptionDTO.PrescriptionRequest;
import introse.group20.hms.webapi.DTOs.PrescriptionDTO.PrescriptionResponse;
import introse.group20.hms.webapi.utils.AuthExtensions;
import jakarta.validation.Valid;
import org.apache.coyote.Response;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/prescriptions")
@Validated
public class PrescriptionController {
    @Autowired
    private IPrescriptionService prescriptionService;
    @Autowired
    private ModelMapper modelMapper;
    @GetMapping
    @Secured({"DOCTOR", "PATIENT"})
    public ResponseEntity<List<PrescriptionResponse>> getByPatient(
            @RequestParam(name = "patient_id") UUID patientId,
            @RequestParam(defaultValue = "1")int pageNo,
            @RequestParam(defaultValue = "10")int pageSize
    ){
        List<PrescriptionResponse> response =  prescriptionService.getByPatient(patientId, pageNo - 1, pageSize).stream()
                .map(this::mapToPrescriptionResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{prescriptionId}")
    @Secured({"DOCTOR", "PATIENT"})
    public ResponseEntity<PrescriptionResponse> getById(@PathVariable UUID prescriptionId) throws NotFoundException {
        PrescriptionResponse prescriptionResponse = mapToPrescriptionResponse(prescriptionService.getById(prescriptionId));
        return ResponseEntity.ok(prescriptionResponse);
    }

    @PostMapping
    @Secured("DOCTOR")
    public ResponseEntity<PrescriptionResponse> createPrescription(@Valid @RequestBody PrescriptionRequest request) throws BadRequestException {
        UUID doctorId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Prescription newPrescription = modelMapper.map(request, Prescription.class);
        Prescription savedPrescription = prescriptionService.addPrescription(doctorId, request.getPatientId(), newPrescription);
        return new ResponseEntity<>(mapToPrescriptionResponse(savedPrescription), HttpStatus.CREATED);
    }

    @PutMapping("/{presId}")
    @Secured("DOCTOR")
    public ResponseEntity<PrescriptionResponse> updatePrescription(@PathVariable UUID presId, @Valid @RequestBody PrescriptionRequest request) throws BadRequestException {
        Prescription updatedPrescription = modelMapper.map(request, Prescription.class);
        updatedPrescription.setId(presId);
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        Prescription savedPres = prescriptionService.updatePrescription(userId, updatedPrescription);
        return new ResponseEntity<>(mapToPrescriptionResponse(savedPres), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{presId}")
    @Secured("DOCTOR")
    public ResponseEntity<HttpStatus> deletePrescription(@PathVariable UUID presId) throws BadRequestException {
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        prescriptionService.deletePrescription(userId, presId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
    private PrescriptionResponse mapToPrescriptionResponse(Prescription prescription){
        return new PrescriptionResponse(
                prescription.getId(),
                prescription.getDoctor().getId(),
                prescription.getDoctor().getName(),
                prescription.getPatient().getId(),
                prescription.getPatient().getName(),
                prescription.getCreatedDay(),
                prescription.getNote(),
                prescription.getMedicines().stream()
                        .map(medicine -> modelMapper.map(medicine, MedicineResponse.class)).collect(Collectors.toList())
        );
    }
}
