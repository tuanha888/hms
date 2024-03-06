package introse.group20.hms.application.services;

import introse.group20.hms.application.adapters.IDepartmentAdapter;
import introse.group20.hms.application.services.interfaces.IDepartmentService;
import introse.group20.hms.core.entities.Department;
import introse.group20.hms.core.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

public class DepartmentService implements IDepartmentService {
    @Autowired
    IDepartmentAdapter departmentAdapter;
    public DepartmentService(IDepartmentAdapter departmentAdapter){
        this.departmentAdapter = departmentAdapter;
    }
    @Override
    public List<Department> getAll() {
        return departmentAdapter.getAllAdapter();
    }

    @Override
    public Department addDepartment(Department department) {
        return departmentAdapter.addDepartmentAdapter(department);
    }

    @Override
    public void deleteDepartment(UUID id) throws BadRequestException {
        departmentAdapter.deleteDepartmentAdapter(id);
    }
}
