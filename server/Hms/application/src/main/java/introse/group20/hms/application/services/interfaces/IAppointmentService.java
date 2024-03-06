package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.Appointment;
import introse.group20.hms.core.entities.enums.AppointmentStatus;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface IAppointmentService {
    Appointment getById(UUID id) throws NotFoundException;
    List<Appointment> getAppointmentByDoctor(UUID doctorId);
    List<Appointment> getAppointmentByPatient(UUID patientId);
    Appointment addAppointment(UUID doctorId, UUID patientId, Appointment apm) throws BadRequestException;
    Appointment updateAppointment(UUID userId, Appointment appointment) throws BadRequestException;
    void deleteAppointment(UUID userId, UUID id) throws BadRequestException;
}
