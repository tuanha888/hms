package introse.group20.hms.application.services;

import introse.group20.hms.application.adapters.IPatientAdapter;
import introse.group20.hms.application.services.interfaces.IPatientService;
import introse.group20.hms.core.entities.Patient;
import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public class PatientService implements IPatientService {
    private IPatientAdapter patientAdapter;
    public PatientService(IPatientAdapter patientAdapter)
    {
        this.patientAdapter = patientAdapter;
    }
    @Override
    public List<Patient> getPatientByType(String type) {
        return patientAdapter.getPatientByTypeAdapter(type);
    }

    @Override
    public List<Patient> getAllPatient() {
        return patientAdapter.getAllPatientAdapter();
    }

    @Override
    public Patient getPatientById(UUID id) throws NotFoundException {
        return patientAdapter.getPatientByIdAdapter(id)
                .orElseThrow(() -> new NotFoundException(String.format("Patient with id: %s not exist", id)));
    }

    @Override
    public List<Patient> getPatientOfDoctor(UUID doctorId) throws NotFoundException {
        return patientAdapter.getPatientOfDoctorAdapter(doctorId);
    }


    @Override
    public User addPatient(Patient patient)
    {
        return patientAdapter.addPatientAdapter(patient);
    }

    @Override
    public Patient updatePatient(Patient patient) throws BadRequestException {
        return patientAdapter.updatePatientAdapter(patient);
    }
}
