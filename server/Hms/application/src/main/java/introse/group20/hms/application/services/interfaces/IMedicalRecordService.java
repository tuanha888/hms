package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.MedicalRecord;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface IMedicalRecordService {
    List<MedicalRecord> getByPatientId(UUID patientId, int pageNo, int pageSize);
    MedicalRecord getById(UUID mrId) throws NotFoundException;
    MedicalRecord addMedicalRecord(UUID patientId, UUID departmentId, UUID doctorId, MedicalRecord medicalRecord) throws BadRequestException;
    MedicalRecord updateMedicalRecord(UUID userId, MedicalRecord medicalRecord) throws BadRequestException;
    void deleteMedicalRecord(UUID userId, UUID mrId) throws BadRequestException;
}
