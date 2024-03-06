package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.Prescription;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface IPrescriptionService {
    List<Prescription> getByPatient(UUID patientId, int pageNo, int pageSize);
    Prescription getById(UUID presId) throws NotFoundException;
    Prescription addPrescription(UUID doctorId, UUID patientId, Prescription prescription) throws BadRequestException;
    Prescription updatePrescription(UUID userId, Prescription prescription) throws BadRequestException;
    void deletePrescription(UUID userId, UUID presId) throws BadRequestException;
}
