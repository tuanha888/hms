package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.ITreatmentPlanAdapter;
import introse.group20.hms.core.entities.MedicalRecord;
import introse.group20.hms.core.entities.TreatmentPlan;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.infracstructure.models.DoctorModel;
import introse.group20.hms.infracstructure.models.MedicalRecordModel;
import introse.group20.hms.infracstructure.models.PatientModel;
import introse.group20.hms.infracstructure.models.TreatmentPlanModel;
import introse.group20.hms.infracstructure.repositories.IDoctorRepository;
import introse.group20.hms.infracstructure.repositories.IMedicalRecordRepository;
import introse.group20.hms.infracstructure.repositories.IPatientRepository;
import introse.group20.hms.infracstructure.repositories.ITreatmentPlanRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class TreatmentPlanAdapter implements ITreatmentPlanAdapter {
    @Autowired
    private ITreatmentPlanRepository treatmentPlanRepository;
    @Autowired
    private IMedicalRecordRepository medicalRecordRepository;
    @Autowired
    private IPatientRepository patientRepository;
    @Autowired
    private IDoctorRepository doctorRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private EntityManager entityManager;
    @Override
    public List<TreatmentPlan> getForUserAdapter(UUID userId, int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDay").descending());
        List<TreatmentPlanModel> treatmentPlanModels = treatmentPlanRepository.findByPatientId(userId, pageRequest);
        return treatmentPlanModels.stream()
                .map(treatmentPlanModel -> modelMapper.map(treatmentPlanModel, TreatmentPlan.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<TreatmentPlan> getByIdAdapter(UUID id) {
        return treatmentPlanRepository.findById(id)
                .map(treatmentPlanModel -> modelMapper.map(treatmentPlanModel, TreatmentPlan.class));
    }

    @Override
    public TreatmentPlan createTreatmentPlanAdapter(UUID patientId, UUID doctorId, TreatmentPlan treatmentPlan) throws BadRequestException {
        TreatmentPlanModel treatmentPlanModel = modelMapper.map(treatmentPlan, TreatmentPlanModel.class);
        MedicalRecordModel medicalRecordModel = medicalRecordRepository.findById(treatmentPlan.getMedicalRecordId())
                .orElseThrow(() -> new BadRequestException(String.format("Medical Record with id: %s not exist", treatmentPlan.getMedicalRecordId())));
        Optional<PatientModel> patientModel = patientRepository.findById(patientId);
        Optional<DoctorModel> doctorModel = doctorRepository.findById(doctorId);
        if (patientModel.isEmpty() || doctorModel.isEmpty())
        {
            throw new BadRequestException("Bad request!");
        }
        treatmentPlanModel.setCreatedDay(new Date());
        treatmentPlanModel.setDoctor(doctorModel.get());
        treatmentPlanModel.setPatient(patientModel.get());
        treatmentPlanModel.setMedicalRecord(medicalRecordModel);
        TreatmentPlanModel saveTreatmentPlan = treatmentPlanRepository.save(treatmentPlanModel);
        medicalRecordModel.setTreatmentPlan(saveTreatmentPlan);
        medicalRecordRepository.save(medicalRecordModel);
        return modelMapper.map(saveTreatmentPlan, TreatmentPlan.class);
    }

    @Override
    @Transactional
    public TreatmentPlan updateTreatmentPlanAdapter(UUID userId, TreatmentPlan treatmentPlan) throws BadRequestException {
        TreatmentPlanModel treatmentPlanModel = treatmentPlanRepository.findById(treatmentPlan.getId())
                .orElseThrow(() -> new BadRequestException("TreatmentPlan not exist"));
        if(userId.compareTo(treatmentPlanModel.getDoctor().getId()) != 0) {
            throw new BadRequestException("Bad Request! Action not allowed!");
        }
//        treatmentPlanModel.setTreatmentMethod(treatmentPlan.getTreatmentMethod());
//        treatmentPlanModel.setLastExaminationDay(treatmentPlan.getLastExaminationDay());
//        treatmentPlanModel.setNextExpectedExaminationDay(treatmentPlan.getNextExpectedExaminationDay());
//        treatmentPlanModel.setNote(treatmentPlan.getNote());
        TreatmentPlanModel updated = modelMapper.map(treatmentPlan, TreatmentPlanModel.class);
        updated.setDoctor(treatmentPlanModel.getDoctor());
        updated.setPatient(treatmentPlanModel.getPatient());
        entityManager.merge(updated);
        entityManager.flush();
        TreatmentPlanModel saved = treatmentPlanRepository.findById(treatmentPlan.getId()).get();
        return modelMapper.map(saved, TreatmentPlan.class);
    }

    @Override
    @Transactional
    public void deleteTreatmentPlanAdapter(UUID userId, UUID id) throws BadRequestException {
        TreatmentPlanModel treatmentPlanModel = treatmentPlanRepository.findById(id)
                .orElseThrow(() -> new BadRequestException("TreatmentPlan not exist"));
        if(userId.compareTo(treatmentPlanModel.getDoctor().getId()) != 0) {
            throw new BadRequestException("Bad Request! Action not allowed!");
        }
        MedicalRecordModel medicalRecordModel = medicalRecordRepository.findById(treatmentPlanModel.getMedicalRecord().getId())
                .orElseThrow(() -> new BadRequestException("Medical Record not exist"));
        medicalRecordModel.setTreatmentPlan(null);
//        medicalRecordRepository.save(medicalRecordModel);
//        treatmentPlanModel.setMedicalRecord(null);
//        TreatmentPlanModel saved = treatmentPlanRepository.save(treatmentPlanModel);
        entityManager.remove(treatmentPlanModel);
//        treatmentPlanRepository.delete(saved);
    }
}
