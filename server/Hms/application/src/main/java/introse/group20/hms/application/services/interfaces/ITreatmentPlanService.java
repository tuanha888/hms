package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.TreatmentPlan;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface ITreatmentPlanService {
    List<TreatmentPlan> getForUser(UUID userId, int pageNo, int pageSize);
    TreatmentPlan getById(UUID id) throws NotFoundException;
    TreatmentPlan createTreatmentPlan(UUID patientId,UUID doctorId, TreatmentPlan treatmentPlan) throws BadRequestException;
    void deleteTreatmentPlan(UUID userId, UUID id) throws BadRequestException;
    TreatmentPlan updateTreatmentPlan(UUID userId, TreatmentPlan treatmentPlan) throws BadRequestException;
}
