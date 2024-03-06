package introse.group20.hms.application.adapters;

import introse.group20.hms.core.entities.Patient;
import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IPatientAdapter {
    List<Patient> getAllPatientAdapter();
    List<Patient> getPatientByTypeAdapter(String type);
    Optional<Patient> getPatientByIdAdapter(UUID id);
    List<Patient> getPatientOfDoctorAdapter(UUID doctorId) throws NotFoundException;
    User addPatientAdapter(Patient patient);
    Patient updatePatientAdapter(Patient patient) throws BadRequestException;
}
