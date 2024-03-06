package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.IDoctorAdapter;
import introse.group20.hms.core.entities.Doctor;
import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.infracstructure.mappers.DoctorMapperInfra;
import introse.group20.hms.infracstructure.models.DepartmentModel;
import introse.group20.hms.infracstructure.models.DoctorModel;
import introse.group20.hms.infracstructure.models.UserModel;
import introse.group20.hms.infracstructure.models.enums.Role;
import introse.group20.hms.infracstructure.repositories.IDepartmentRepository;
import introse.group20.hms.infracstructure.repositories.IDoctorRepository;
import introse.group20.hms.infracstructure.repositories.IRefreshTokenRepository;
import introse.group20.hms.infracstructure.repositories.IUserRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.print.Doc;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
@Component
public class DoctorAdapter implements IDoctorAdapter {
    @Autowired
    private IDoctorRepository doctorRepository;
    @Autowired
    private IRefreshTokenRepository refreshTokenRepository;
    @Autowired
    private DoctorMapperInfra doctorMapperInfra;
    @Autowired
    private IUserRepository userRepository;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private IDepartmentRepository departmentRepository;
    @Autowired
    private PasswordEncoder encoder;

    @Override
    public List<Doctor> getAllDoctorAdapter() {
        return doctorRepository.findAll().stream()
                .map(doctorModel -> doctorMapperInfra.mapToDoctor(doctorModel))
                .collect(Collectors.toList());
    }

    @Override
    public List<Doctor> getPageDoctorsAdapter(int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize);
        Page<DoctorModel> list = doctorRepository.findAll(pageRequest);
        return list.stream()
                .map(doctorModel -> doctorMapperInfra.mapToDoctor(doctorModel))
                .collect(Collectors.toList());
    }

    @Override
    public List<Doctor> getByDepartmentIdAdapter(UUID departmentId, int pageNo, int pageSize)
    {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize);
        List<DoctorModel> doctors = doctorRepository.findByDepartmentId(departmentId, pageRequest);
        return doctors.stream()
                .map(doctorModel -> doctorMapperInfra.mapToDoctor(doctorModel))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Doctor> getByIdAdapter(UUID id)
    {
        Optional<DoctorModel> doctorModel = doctorRepository.findById(id);
        if (doctorModel.isPresent())
        {
            Doctor doctor = doctorMapperInfra.mapToDoctor(doctorModel.get());
            return Optional.of(doctor);
        }
        else return Optional.empty();

    }

    @Override
    @Transactional
    public User addDoctorAdapter(UUID departmentId, Doctor doctor) throws BadRequestException {
        Optional<DepartmentModel> departmentModel = departmentRepository.findById(departmentId);
        if (departmentModel.isPresent())
        {
            DepartmentModel department = departmentModel.get();
            DoctorModel doctorModel = modelMapper.map(doctor, DoctorModel.class);
            doctorModel.setDepartment(department);
            String password = PasswordGenerator.generatePassword(10);
            UserModel userModel = new UserModel(doctorModel.getName(), encoder.encode(password), Role.DOCTOR);
            UUID id = UUID.randomUUID();
            doctorModel.setId(id);
            userModel.setId(id);
            doctorModel.setUser(userModel);
            userModel.setDoctor(doctorModel);
            entityManager.persist(userModel);
            entityManager.flush();
            UserModel savedUserModel = userRepository.findById(id).get();
            String userName = String.format("BS-%s-%s", doctorModel.getName(), savedUserModel.getStt());
            savedUserModel.setUsername(userName);
//            doctorRepository.save(doctorModel);
            entityManager.persist(savedUserModel);
            User user = new User();
            modelMapper.map(savedUserModel, user);
            user.setPassword(password);
            return user;
        }
        else throw new BadRequestException("Bad request!");
    }

    @Override
    @Transactional
    public Doctor updateDoctorAdapter(Doctor doctor) throws BadRequestException {
        DoctorModel doctorModel = doctorRepository.findById(doctor.getId())
                .orElseThrow(() -> new BadRequestException(String.format("Doctor with id: %s not exist", doctor.getId())));
        DoctorModel newDoctorModel = modelMapper.map(doctor, DoctorModel.class);
        if(doctor.getImage() == null){
            newDoctorModel.setImage(doctorModel.getImage());
        }
        entityManager.merge(newDoctorModel);
        entityManager.flush();
        DoctorModel savedDoctor = doctorRepository.findById(doctor.getId()).get();
        return doctorMapperInfra.mapToDoctor(savedDoctor);
    }

    @Override
    public void deleteDoctorAdapter(UUID doctorId) throws BadRequestException {
        DoctorModel doctorModel = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new BadRequestException(String.format("Doctor with id: %s not exist", doctorId)));
        refreshTokenRepository.deleteByUserId(doctorModel.getId());
        doctorRepository.delete(doctorModel);
    }
    @Override
    @Transactional
    public void test()
    {
        UUID id = UUID.randomUUID();
        DoctorModel doctorModel = new DoctorModel();
        doctorModel.setId(id);
        DepartmentModel departmentModel = departmentRepository.findAll().get(0);
        doctorModel.setDepartment(departmentModel);
        doctorModel.setBirthday(new Date());
        UserModel userModel = new UserModel();
        userModel.setId(id);
        userModel.setRole(Role.ADMIN);
        userModel.setUsername("12345");
        userModel.setPassword("123456");
        userModel.setDoctor(doctorModel);
        doctorModel.setUser(userModel);
        entityManager.persist(doctorModel);
        entityManager.persist(userModel);
    }
}
