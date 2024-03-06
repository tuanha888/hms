package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.Doctor;
import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface IDoctorService {
    List<Doctor> getAllDoctor();
    List<Doctor> getPageDoctor(int pageNo, int pageSize);
    List<Doctor> getByDepartment(UUID departmentId, int pageNo, int pageSize);
    Doctor getById(UUID id) throws NotFoundException;
    User addDoctor(UUID departmentId, Doctor doctor) throws BadRequestException;
    Doctor updateDoctor(Doctor doctor) throws BadRequestException;
    void deleteDoctor(UUID doctorId) throws BadRequestException;
    void test();
}
