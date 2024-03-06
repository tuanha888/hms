package introse.group20.hms.application.services;

import introse.group20.hms.application.adapters.IPrescriptionAdapter;
import introse.group20.hms.application.services.interfaces.IPrescriptionService;
import introse.group20.hms.core.entities.Prescription;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public class PrescriptionService implements IPrescriptionService {
    private IPrescriptionAdapter prescriptionAdapter;
    public PrescriptionService(IPrescriptionAdapter prescriptionAdapter){this.prescriptionAdapter = prescriptionAdapter;}
    @Override
    public List<Prescription> getByPatient(UUID patientId, int pageNo, int pageSize) {
        return prescriptionAdapter.getByPatientAdapter(patientId, pageNo, pageSize);
    }

    @Override
    public Prescription getById(UUID presId) throws NotFoundException {
        return prescriptionAdapter.getByIdAdapter(presId)
                .orElseThrow(() -> new NotFoundException(String.format("Prescription with id: %s is not existed", presId)));
    }

    @Override
    public Prescription addPrescription(UUID doctorId, UUID patientId, Prescription prescription) throws BadRequestException {
        return prescriptionAdapter.addPrescriptionAdapter(doctorId, patientId, prescription);

    }

    @Override
    public Prescription updatePrescription(UUID userId, Prescription prescription) throws BadRequestException {
        return prescriptionAdapter.updatePrescriptionAdapter(userId, prescription);
    }

    @Override
    public void deletePrescription(UUID userId, UUID presId) throws BadRequestException {
        prescriptionAdapter.deletePrescriptionAdapter(userId, presId);
    }
}
