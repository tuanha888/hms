package introse.group20.hms.application.adapters;

import introse.group20.hms.core.entities.Appointment;
import introse.group20.hms.core.entities.enums.AppointmentStatus;
import introse.group20.hms.core.exceptions.BadRequestException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IAppointmentAdapter {
    Optional<Appointment> getAppointmentById(UUID id);
    List<Appointment> getAppointmentByDoctorAdapter(UUID doctorId);
    List<Appointment> getAppointmentByPatientAdapter(UUID patientId);
    Appointment addAppointmentAdapter(UUID doctorId, UUID patientId, Appointment apm) throws BadRequestException;
    Appointment updateAppointmentAdapter(UUID userId, Appointment appointment) throws BadRequestException;
    void deleteAppointmentAdapter(UUID userId, UUID id) throws BadRequestException;
}
