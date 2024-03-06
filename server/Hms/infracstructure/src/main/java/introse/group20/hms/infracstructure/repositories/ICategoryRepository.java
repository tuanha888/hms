package introse.group20.hms.infracstructure.repositories;

import introse.group20.hms.infracstructure.models.CategoryModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface ICategoryRepository extends JpaRepository<CategoryModel, UUID> {
}
