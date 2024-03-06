package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.IDepartmentAdapter;
import introse.group20.hms.core.entities.Department;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.infracstructure.models.DepartmentModel;
import introse.group20.hms.infracstructure.repositories.IDepartmentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class DepartmentAdapter implements IDepartmentAdapter {
    @Autowired
    IDepartmentRepository departmentRepository;
    @Autowired
    ModelMapper modelMapper;
    @Override
    public List<Department> getAllAdapter() {
        return departmentRepository.findAll().stream()
                .map(departmentModel -> modelMapper.map(departmentModel, Department.class))
                .collect(Collectors.toList());
    }

    @Override
    public Department addDepartmentAdapter(Department department) {
        DepartmentModel departmentModel = modelMapper.map(department, DepartmentModel.class);
        DepartmentModel savedDepartment = departmentRepository.save(departmentModel);
        return modelMapper.map(savedDepartment, Department.class);
    }

    @Override
    public void deleteDepartmentAdapter(UUID id) throws BadRequestException {
        DepartmentModel departmentModel = departmentRepository.findById(id)
                .orElseThrow(() -> new BadRequestException(String.format("Department with id: %s not exist", id)));
        departmentRepository.delete(departmentModel);
    }
}
