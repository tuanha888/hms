package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.TreatmentPlanService;
import introse.group20.hms.application.services.interfaces.ITreatmentPlanService;
import introse.group20.hms.core.entities.TreatmentPlan;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.webapi.DTOs.TreatmentPlanDTO.TreatmentPlanRequest;
import introse.group20.hms.webapi.DTOs.TreatmentPlanDTO.TreatmentPlanResponse;
import introse.group20.hms.webapi.utils.AuthExtensions;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
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
@CrossOrigin("*")
@RequestMapping("/api/treatment_plans")
@Validated
public class TreatmentPlanController {
    @Autowired
    private ITreatmentPlanService treatmentPlanService;
    @Autowired
    private ModelMapper modelMapper;
    @GetMapping("/patient")
    @Secured({"DOCTOR", "PATIENT"})
    //route: /api/treatment_plans/patient?patientId=<if of patient>
    public ResponseEntity<List<TreatmentPlanResponse>> getForPatient(
            @RequestParam UUID patientId,
            @RequestParam(defaultValue = "1")int pageNo,
            @RequestParam(defaultValue = "10")int pageSize
    ){
        List<TreatmentPlan> treatmentPlans = treatmentPlanService.getForUser(patientId, pageNo - 1, pageSize);
        List<TreatmentPlanResponse> treatmentPlanResponses = treatmentPlans.stream()
                .map(this::mapToTreatmentPlanResponse)
                .collect(Collectors.toList());
        return new ResponseEntity<List<TreatmentPlanResponse>>(treatmentPlanResponses, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Secured({"DOCTOR", "PATIENT"})
    public ResponseEntity<TreatmentPlanResponse> getById(@PathVariable UUID id) throws NotFoundException {
        TreatmentPlan treatmentPlan = treatmentPlanService.getById(id);
        return ResponseEntity.ok(mapToTreatmentPlanResponse(treatmentPlan));
    }
//
    @PostMapping
    @Secured("DOCTOR")
    public ResponseEntity<TreatmentPlanResponse> createTreatmentPlan(@Valid @RequestBody TreatmentPlanRequest request) throws BadRequestException {
        UUID doctorId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        TreatmentPlan treatmentPlan = modelMapper.map(request, TreatmentPlan.class);
        TreatmentPlan savedTp = treatmentPlanService.createTreatmentPlan(request.getPatientId(), doctorId, treatmentPlan);
        return new ResponseEntity<>(mapToTreatmentPlanResponse(savedTp), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    @Secured("DOCTOR")
    @Transactional
    public ResponseEntity<TreatmentPlanResponse> updateTreatmentPlan(@PathVariable UUID id, @Valid @RequestBody TreatmentPlanRequest request) throws BadRequestException {
        TreatmentPlan treatmentPlan = modelMapper.map(request, TreatmentPlan.class);
        treatmentPlan.setId(id);
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        TreatmentPlan savedTP = treatmentPlanService.updateTreatmentPlan(userId, treatmentPlan);
        return new ResponseEntity<>(mapToTreatmentPlanResponse(savedTP), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("/{id}")
    @Secured("DOCTOR")
    public ResponseEntity<HttpStatus> deleteTreatmentPlan(@PathVariable UUID id) throws BadRequestException {
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        treatmentPlanService.deleteTreatmentPlan(userId, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private TreatmentPlanResponse mapToTreatmentPlanResponse(TreatmentPlan treatmentPlan){
        return new TreatmentPlanResponse(
                treatmentPlan.getId(),
                treatmentPlan.getDoctor().getId(),
                treatmentPlan.getDoctor().getName(),
                treatmentPlan.getPatient().getId(),
                treatmentPlan.getPatient().getName(),
                treatmentPlan.getTreatmentMethod(),
                treatmentPlan.getLastExaminationDay(),
                treatmentPlan.getNextExpectedExaminationDay(),
                treatmentPlan.getNote(),
                treatmentPlan.getMedicalRecordId()
        );
    }

    public ResponseEntity<TreatmentPlanResponse> updatetreatmentPlan(@PathVariable UUID id, @Valid @RequestBody TreatmentPlanRequest request) throws BadRequestException {
        TreatmentPlan treatmentPlan = modelMapper.map(request, TreatmentPlan.class);
        treatmentPlan.setId(id);
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        TreatmentPlan savedTP = treatmentPlanService.updateTreatmentPlan(userId, treatmentPlan);
        return new ResponseEntity<>(mapToTreatmentPlanResponse(savedTP), HttpStatus.ACCEPTED);
    }
}
