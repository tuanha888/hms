package introse.group20.hms.application.adapters;

import introse.group20.hms.core.entities.Surgery;
import introse.group20.hms.core.exceptions.BadRequestException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ISurgeryAdapter {
    List<Surgery> getAllAdapter();
    List<Surgery> getSurgeriesInWeek();
    List<Surgery> getSurgeryForDoctorAdapter(UUID doctorId);
    Surgery addSurgeryAdapter(UUID doctorId, UUID patientId, Surgery surgery) throws BadRequestException;
    Surgery updateSurgeryAdapter(Surgery surgery) throws BadRequestException;
    void deleteSurgeAdapter(UUID surgeryId) throws BadRequestException;
}
