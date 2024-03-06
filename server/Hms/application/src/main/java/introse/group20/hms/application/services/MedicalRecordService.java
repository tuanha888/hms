package introse.group20.hms.application.services;

import introse.group20.hms.application.adapters.IMedicalRecordAdapter;
import introse.group20.hms.application.services.interfaces.IMedicalRecordService;
import introse.group20.hms.core.entities.MedicalRecord;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public class MedicalRecordService implements IMedicalRecordService {

    private IMedicalRecordAdapter iMedicalRecordAdapter;

    public MedicalRecordService(IMedicalRecordAdapter iMedicalRecordAdapter) {
        this.iMedicalRecordAdapter = iMedicalRecordAdapter;
    }

    @Override
    public List<MedicalRecord> getByPatientId(UUID patientId, int pageNo, int pageSize) {
        return iMedicalRecordAdapter.getByPatientIdAdapter(patientId, pageNo, pageSize);
    }

    @Override
    public MedicalRecord getById(UUID mrId) throws NotFoundException {
        Optional<MedicalRecord> medicalRecord = iMedicalRecordAdapter.getByIdAdapter(mrId);
        if (medicalRecord.isEmpty()) {
            throw new NotFoundException("Medical Record is not found!");
        }
        return medicalRecord.get();
    }

    @Override
    public MedicalRecord addMedicalRecord(UUID patientId, UUID departmentId, UUID doctorId, MedicalRecord medicalRecord) throws BadRequestException {
        return iMedicalRecordAdapter.addMedicalRecordAdapter(doctorId, departmentId, patientId, medicalRecord);
    }

    @Override
    public MedicalRecord updateMedicalRecord(UUID userId, MedicalRecord medicalRecord) throws BadRequestException {
        return iMedicalRecordAdapter.updateMedicalRecordAdapter(userId, medicalRecord);
    }

    @Override
    public void deleteMedicalRecord(UUID userId, UUID mrId) throws BadRequestException {
        iMedicalRecordAdapter.deleteMedicalRecordAdapter(userId, mrId);
    }
}
