package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.interfaces.IMedicalRecordService;
import introse.group20.hms.core.entities.MedicalRecord;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.webapi.DTOs.MedicalRecordDTO.MedicalRecordRequest;
import introse.group20.hms.webapi.DTOs.MedicalRecordDTO.MedicalRecordResponse;
import introse.group20.hms.webapi.utils.AuthExtensions;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/medical_records")
public class MedicalRecordController {

    @Autowired
    private IMedicalRecordService medicalRecordService;

    @Autowired
    private ModelMapper modelMapper;
    @GetMapping
    @Transactional
    @Secured({"DOCTOR", "PATIENT"})
    //route: /api/medical_records?patientId=<id of patient>
    public ResponseEntity<List<MedicalRecordResponse>> getByPatientId(
            @RequestParam UUID patientId,
            @RequestParam(defaultValue = "1")int pageNo,
            @RequestParam(defaultValue = "10")int pageSize
    ){
        List<MedicalRecord> medicalRecords = medicalRecordService.getByPatientId(patientId, pageNo - 1, pageSize);
        List<MedicalRecordResponse> medicalRecordResponses = medicalRecords.stream()
                .map(medicalRecord -> modelMapper.map(medicalRecord, MedicalRecordResponse.class))
                .collect(Collectors.toList());
        return new ResponseEntity<>(medicalRecordResponses, HttpStatus.OK);
    }

    @GetMapping(value = "/{id}", name = "getById")
    @Transactional
    @Secured({"DOCTOR", "PATIENT"})
    public ResponseEntity<MedicalRecordResponse> getById(@PathVariable UUID id) throws NotFoundException {
        MedicalRecord medicalRecord = medicalRecordService.getById(id);
        MedicalRecordResponse medicalRecordResponse = modelMapper.map(medicalRecord, MedicalRecordResponse.class);
        return new ResponseEntity<>(medicalRecordResponse, HttpStatus.OK);
    }

    @PostMapping
    @Secured("DOCTOR")
    public ResponseEntity<MedicalRecordResponse> createMedicalRecord(@Valid @RequestBody MedicalRecordRequest request) throws BadRequestException {
        UUID doctorID = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        TypeMap<MedicalRecordRequest, MedicalRecord> typeMap =
                modelMapper.getTypeMap(MedicalRecordRequest.class, MedicalRecord.class);
        if (typeMap == null) {
            modelMapper.addMappings(new PropertyMap<MedicalRecordRequest, MedicalRecord>() {

                @Override
                protected void configure() {
                    skip(destination.getId());
                }
            });
        }
        MedicalRecord medicalRecord = modelMapper.map(request, MedicalRecord.class);
        MedicalRecord addedRecord = medicalRecordService.addMedicalRecord(request.getPatientId(), request.getDepartmentId(), doctorID, medicalRecord);
        return new ResponseEntity<>(modelMapper.map(addedRecord, MedicalRecordResponse.class), HttpStatus.CREATED);
    }

    @PutMapping("/{medicalRecordId}")
    @Secured("DOCTOR")
    public ResponseEntity<MedicalRecordResponse> updateMedicalRecord(@PathVariable UUID medicalRecordId,
                                                          @Valid @RequestBody MedicalRecordRequest request)
            throws BadRequestException {
        var typeMap =
                modelMapper.getTypeMap(MedicalRecordRequest.class, MedicalRecord.class);
        if (typeMap == null) {
            modelMapper.addMappings(new PropertyMap<MedicalRecordRequest, MedicalRecord>() {

                @Override
                protected void configure() {
                    skip(destination.getId());
                }
            });
        }
        MedicalRecord medicalRecord = modelMapper.map(request, MedicalRecord.class);
        medicalRecord.setId(medicalRecordId);
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        MedicalRecord savedMR = medicalRecordService.updateMedicalRecord(userId, medicalRecord);
        return new ResponseEntity<>(modelMapper.map(savedMR, MedicalRecordResponse.class), HttpStatus.ACCEPTED);
    }

    @DeleteMapping("{id}")
    @Secured("DOCTOR")
    public ResponseEntity<HttpStatus> deleteMedicalRecord(@PathVariable UUID id) throws BadRequestException {
        UUID userId = AuthExtensions.GetUserIdFromContext(SecurityContextHolder.getContext());
        medicalRecordService.deleteMedicalRecord(userId, id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
