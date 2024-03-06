package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.Patient;
import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface IPatientService {
    List<Patient> getAllPatient();
    List<Patient> getPatientByType(String type);
    Patient getPatientById(UUID id) throws NotFoundException;
    List<Patient> getPatientOfDoctor(UUID doctorId) throws NotFoundException;
    User addPatient(Patient patient);
    Patient updatePatient(Patient patient) throws BadRequestException;
}
