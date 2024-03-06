package introse.group20.hms.infracstructure.repositories;

import introse.group20.hms.infracstructure.models.DoctorModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
@Repository
public interface IDoctorRepository extends JpaRepository<DoctorModel, UUID> {
    List<DoctorModel> findByDepartmentId(UUID departmentId, Pageable pageable);
}
