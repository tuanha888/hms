package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.IPatientAdapter;
import introse.group20.hms.core.entities.Patient;
import introse.group20.hms.core.entities.User;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.infracstructure.models.PatientModel;
import introse.group20.hms.infracstructure.models.UserModel;
import introse.group20.hms.infracstructure.models.enums.Role;
import introse.group20.hms.infracstructure.models.enums.StayType;
import introse.group20.hms.infracstructure.repositories.IDoctorRepository;
import introse.group20.hms.infracstructure.repositories.IMedicalRecordRepository;
import introse.group20.hms.infracstructure.repositories.IPatientRepository;
import introse.group20.hms.infracstructure.repositories.IUserRepository;
import jakarta.persistence.Column;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class PatientAdapter implements IPatientAdapter {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private EntityManager entityManager;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private IPatientRepository patientRepository;
    @Autowired
    private IMedicalRecordRepository medicalRecordRepository;
    @Autowired
    private IDoctorRepository doctorRepository;
    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<Patient> getAllPatientAdapter() {
        return patientRepository.findAll().stream()
                .map(patientModel -> modelMapper.map(patientModel, Patient.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Patient> getPatientByTypeAdapter(String type) {
        List<Patient> patients = medicalRecordRepository.findByStayType(StayType.valueOf(type))
                .stream()
                .map(medicalRecordModel -> {
                    UUID patientId = medicalRecordModel.getPatient().getId();
                    return patientRepository.findById(patientId)
                            .map(patientModel -> modelMapper.map(patientModel, Patient.class)).get();
                })
                .collect(Collectors.toList());
        return patients;
    }

    @Override
    public Optional<Patient> getPatientByIdAdapter(UUID id) {
        return patientRepository.findById(id)
                .map(patientModel -> modelMapper.map(patientModel, Patient.class));
    }

    @Override
    public List<Patient> getPatientOfDoctorAdapter(UUID doctorId) throws NotFoundException {
        doctorRepository.findById(doctorId).orElseThrow(() -> new NotFoundException(String.format("Doctor with id: %s not exist", doctorId)));
        List<Patient> patients = medicalRecordRepository.findByDoctorId(doctorId).stream()
                .map(medicalRecordModel -> {
                    UUID patientId = medicalRecordModel.getPatient().getId();
                    return patientRepository.findById(patientId)
                            .map(patientModel -> modelMapper.map(patientModel, Patient.class)).get();
                })
                .collect(Collectors.toList());
        return patients;
    }

    @Override
    @Transactional
    public User addPatientAdapter(Patient patient) {
        PatientModel patientModel = modelMapper.map(patient, PatientModel.class);
        String password = PasswordGenerator.generatePassword(10);
        UserModel userModel = new UserModel(patientModel.getName(), encoder.encode(password), Role.PATIENT);
        UUID id = UUID.randomUUID();
        patientModel.setId(id);
        userModel.setId(id);
        patientModel.setUser(userModel);
        userModel.setPatient(patientModel);
        entityManager.persist(userModel);
        entityManager.persist(patientModel);
        entityManager.flush();
        UserModel savedUserModel = userRepository.findById(id).get();
        String userName = String.format("BN-%s-%s", patientModel.getName(), savedUserModel.getStt());
        savedUserModel.setUsername(userName);
        entityManager.persist(savedUserModel);
        User user = new User();
        modelMapper.map(savedUserModel, user);
        user.setPassword(password);
        return user;
    }
    @Override
    public Patient updatePatientAdapter(Patient patient) throws BadRequestException {
        patientRepository.findById(patient.getId())
                .orElseThrow(() -> new BadRequestException("Bad Request! Patient not exist"));
        PatientModel patientModel = modelMapper.map(patient, PatientModel.class);
        PatientModel savedPatient = patientRepository.save(patientModel);
        return modelMapper.map(savedPatient, Patient.class);
    }
}
