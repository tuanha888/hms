package introse.group20.hms.application.adapters;

import introse.group20.hms.core.entities.TreatmentPlan;
import introse.group20.hms.core.exceptions.BadRequestException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ITreatmentPlanAdapter {
    List<TreatmentPlan> getForUserAdapter(UUID userId, int pageNo, int pageSize);
    Optional<TreatmentPlan> getByIdAdapter(UUID id);
    TreatmentPlan createTreatmentPlanAdapter(UUID patientId, UUID doctorId, TreatmentPlan treatmentPlan) throws BadRequestException;
    TreatmentPlan updateTreatmentPlanAdapter(UUID userId, TreatmentPlan treatmentPlan) throws BadRequestException;
    void deleteTreatmentPlanAdapter(UUID userId, UUID id) throws BadRequestException;
}
