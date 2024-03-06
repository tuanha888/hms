package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.Surgery;
import introse.group20.hms.core.exceptions.BadRequestException;

import java.util.List;
import java.util.UUID;

public interface ISurgeryService {
    List<Surgery> getAll();
    List<Surgery> getInWeek();
    List<Surgery> getSurgeryForDoctor(UUID doctorId);
    Surgery addSurgery(UUID doctorId, UUID patientId, Surgery surgery) throws BadRequestException;
    Surgery updateSurgery(Surgery surgery) throws BadRequestException;
    void deleteSurgery(UUID surgeryId) throws BadRequestException;
}
