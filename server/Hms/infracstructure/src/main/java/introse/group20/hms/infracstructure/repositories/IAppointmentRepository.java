package introse.group20.hms.infracstructure.repositories;

import introse.group20.hms.infracstructure.models.AppointmentModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface IAppointmentRepository extends JpaRepository<AppointmentModel, UUID> {
    List<AppointmentModel> findByDoctorId(UUID doctorId);
    List<AppointmentModel> findByPatientId(UUID patientId);
}
