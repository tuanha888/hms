package introse.group20.hms.infracstructure.repositories;

import introse.group20.hms.infracstructure.models.PrescriptionModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface IPrescriptionRepository extends JpaRepository<PrescriptionModel, UUID> {
    List<PrescriptionModel> findByPatientId(UUID patientId, Pageable pageable);
}
