package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.ISurgeryAdapter;
import introse.group20.hms.core.entities.Surgery;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.infracstructure.models.DoctorModel;
import introse.group20.hms.infracstructure.models.PatientModel;
import introse.group20.hms.infracstructure.models.SurgeryModel;
import introse.group20.hms.infracstructure.repositories.IDoctorRepository;
import introse.group20.hms.infracstructure.repositories.IPatientRepository;
import introse.group20.hms.infracstructure.repositories.ISurgeryRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.query.BadJpqlGrammarException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;
@Component
public class SurgeryAdapter implements ISurgeryAdapter {
    @Autowired
    private ISurgeryRepository surgeryRepository;
    @Autowired
    private IDoctorRepository doctorRepository;
    @Autowired
    private IPatientRepository patientRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private EntityManager entityManager;
    @Override
    public List<Surgery> getAllAdapter() {
        List<SurgeryModel> surgeryModels = surgeryRepository.findAll();
        return surgeryModels.stream()
                .map(surgeryModel -> modelMapper.map(surgeryModel, Surgery.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Surgery> getSurgeriesInWeek() {
        List<SurgeryModel> surgeryModels = surgeryRepository.findAll();
        LocalDateTime now = LocalDateTime.now();
        int currentWeek = now.get(WeekFields.of(Locale.getDefault()).weekOfYear());
        int currentYear = now.getYear();
        return surgeryModels.stream()
                .filter(surgeryModel -> {
                    LocalDateTime surgeryDateTime = LocalDateTime.ofInstant(surgeryModel.getTime().toInstant(), ZoneId.systemDefault())
                            .atZone(ZoneId.systemDefault())
                            .withZoneSameInstant(ZoneId.of("Asia/Ho_Chi_Minh"))
                            .toLocalDateTime();
//                    int surgeryWeek = surgeryDateTime.get((WeekFields.of(Locale.getDefault()).weekOfYear()));
//                    int surgeryYear = surgeryDateTime.getYear();
//                    return currentWeek == surgeryWeek && currentYear == surgeryYear;
                    return surgeryDateTime.isAfter(now) && surgeryDateTime.isBefore(now.plusDays(7));
                })
                .sorted(Comparator.comparing(SurgeryModel::getTime))
                .map(surgeryModel -> modelMapper.map(surgeryModel, Surgery.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Surgery> getSurgeryForDoctorAdapter(UUID doctorId) {
        return surgeryRepository.findByDoctorId(doctorId).stream()
                .map(surgeryModel -> modelMapper.map(surgeryModel, Surgery.class))
                .collect(Collectors.toList());
    }

    @Override
    public Surgery addSurgeryAdapter(UUID doctorId, UUID patientId, Surgery surgery) throws BadRequestException {
        DoctorModel doctorModel = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new BadRequestException(String.format("Bad Request! Doctor with id: %s not exist", doctorId)));
        PatientModel patientModel = patientRepository.findById(patientId)
                .orElseThrow(() -> new BadRequestException(String.format("Bad Request! Patient with id: %s not exist", patientId)));
        SurgeryModel surgeryModel = modelMapper.map(surgery, SurgeryModel.class);
        surgeryModel.setDoctor(doctorModel);
        surgeryModel.setPatient(patientModel);
        SurgeryModel savedSurgery = surgeryRepository.save(surgeryModel);
        return modelMapper.map(savedSurgery, Surgery.class);
    }

    @Override
    @Transactional
    public Surgery updateSurgeryAdapter(Surgery surgery) throws BadRequestException {
        SurgeryModel surgeryModel = surgeryRepository.findById(surgery.getId())
                .orElseThrow(() -> new BadRequestException(String.format("Surgery with id: %s not exist", surgery.getId())));
//        surgeryModel.setTime(surgery.getTime());
//        surgeryModel.setContent(surgery.getContent());
//        surgeryModel.setExpectedTime(surgery.getExpectedTime());
        SurgeryModel newSurgeryModel = modelMapper.map(surgery, SurgeryModel.class);
        entityManager.merge(newSurgeryModel);
        entityManager.flush();
        SurgeryModel savedSurgery = surgeryRepository.findById(surgery.getId()).get();
        return modelMapper.map(savedSurgery, Surgery.class);
    }

    @Override
    public void deleteSurgeAdapter(UUID surgeryId) throws BadRequestException {
        SurgeryModel surgeryModel = surgeryRepository.findById(surgeryId)
                .orElseThrow(() -> new BadRequestException(String.format("Surgery with id: %s not exist", surgeryId)));
        surgeryRepository.delete(surgeryModel);
    }
}
