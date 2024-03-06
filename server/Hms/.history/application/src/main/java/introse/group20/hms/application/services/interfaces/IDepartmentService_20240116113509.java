package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.Department;
import introse.group20.hms.core.exceptions.BadRequestException;

import java.util.List;
import java.util.UUID;

public interface IDepartmentService {
    List<Department> getAll(int pageNo, int pageSize);
    Department addDepartment(Department department);
    void deleteDepartment(UUID id) throws BadRequestException;
}
