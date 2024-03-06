package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.interfaces.IDepartmentService;
import introse.group20.hms.core.entities.Department;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.webapi.DTOs.DepartmentDTO.DepartmentRequest;
import introse.group20.hms.webapi.DTOs.DepartmentDTO.DepartmentResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class DepartmentController {
    @Autowired
    IDepartmentService departmentService;
    @Autowired
    ModelMapper modelMapper;

    @GetMapping("/departments")
    public ResponseEntity<List<DepartmentResponse>> getAll(
            @RequestParam(defaultValue = "1")int pageNo,
            @RequestParam(defaultValue = "10")int pageSize
    ){
        List<DepartmentResponse> response = departmentService.getAll(pageNo - 1,pageSize).stream()
                .map(department -> modelMapper.map(department, DepartmentResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/departments")
    @Secured("ADMIN")
    public ResponseEntity<DepartmentResponse> createDepartment(@RequestBody DepartmentRequest departmentRequest){
        Department department = modelMapper.map(departmentRequest, Department.class);
        Department savedDepartment = departmentService.addDepartment(department);
        return ResponseEntity.ok(modelMapper.map(savedDepartment, DepartmentResponse.class));
    }

    @DeleteMapping("/api/departments/{departmentId}")
    @Secured("ADMIN")
    public ResponseEntity<HttpStatus> deleteDepartment(@PathVariable UUID departmentId) throws BadRequestException {
        departmentService.deleteDepartment(departmentId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
