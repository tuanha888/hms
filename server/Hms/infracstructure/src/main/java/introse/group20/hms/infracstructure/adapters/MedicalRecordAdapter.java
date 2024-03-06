package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.IMedicalRecordAdapter;
import introse.group20.hms.core.entities.MedicalRecord;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.core.exceptions.NotFoundException;
import introse.group20.hms.infracstructure.models.DepartmentModel;
import introse.group20.hms.infracstructure.models.DoctorModel;
import introse.group20.hms.infracstructure.models.MedicalRecordModel;
import introse.group20.hms.infracstructure.models.PatientModel;
import introse.group20.hms.infracstructure.models.enums.StayType;
import introse.group20.hms.infracstructure.repositories.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class MedicalRecordAdapter implements IMedicalRecordAdapter {

    @Autowired
    private IMedicalRecordRepository iMedicalRecordRepository;
    @Autowired
    private ITreatmentPlanRepository iTreatmentPlanRepository;

    @Autowired
    private IPatientRepository iPatientRepository;

    @Autowired
    private IDoctorRepository iDoctorRepository;

    @Autowired
    private IDepartmentRepository iDepartmentRepository;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<MedicalRecord> getByPatientIdAdapter(UUID patientId, int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDay").descending());
        List<MedicalRecordModel> medicalRecordModels = iMedicalRecordRepository.findByPatientId(patientId, pageRequest);
        return medicalRecordModels.stream()
                .map(medicalRecordModel -> modelMapper.map(medicalRecordModel, MedicalRecord.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<MedicalRecord> getByIdAdapter(UUID mrId) throws NotFoundException {
        Optional<MedicalRecordModel> medicalRecordModel = iMedicalRecordRepository.findById(mrId);
        if (medicalRecordModel.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(modelMapper.map(medicalRecordModel.get(), MedicalRecord.class));
    }

    @Override
    public MedicalRecord addMedicalRecordAdapter(UUID doctorId, UUID departmentId, UUID patientId, MedicalRecord medicalRecord) throws BadRequestException {
        MedicalRecordModel medicalRecordModel = modelMapper.map(medicalRecord, MedicalRecordModel.class);
        Optional<PatientModel> patientModel = iPatientRepository.findById(patientId);
        Optional<DoctorModel> doctorModel = iDoctorRepository.findById(doctorId);
        Optional<DepartmentModel> departmentModel = iDepartmentRepository.findById(departmentId);
        if (patientModel.isEmpty()) {
            throw new BadRequestException("Bad Request! Patient is not exist!");
        }
        if (doctorModel.isEmpty()) {
            throw new BadRequestException("Bad Request! Doctor is not exist!");
        }
        if (departmentModel.isEmpty()) {
            throw new BadRequestException("Bad Request! Department is not exist!");
        }
        medicalRecordModel.setCreatedDay(new Date());
        medicalRecordModel.setPatient(patientModel.get());
        medicalRecordModel.setDoctor(doctorModel.get());
        medicalRecordModel.setDepartment(departmentModel.get());
        MedicalRecordModel savedRecord = iMedicalRecordRepository.save(medicalRecordModel);
        return modelMapper.map(savedRecord, MedicalRecord.class);
    }

    @Override
    public MedicalRecord updateMedicalRecordAdapter(UUID userId, MedicalRecord medicalRecord) throws BadRequestException {
        Optional<MedicalRecordModel> medicalRecordModel = iMedicalRecordRepository.findById(medicalRecord.getId());
        if (medicalRecordModel.isEmpty()) {
            throw new BadRequestException("Bad request!");
        }
        MedicalRecordModel updatedMedicalRecordModel = medicalRecordModel.get();

        if(userId.compareTo(updatedMedicalRecordModel.getDoctor().getId()) != 0){
            throw new BadRequestException("Bad Request! Action now allowed!");
        }
        updatedMedicalRecordModel.setNote(medicalRecord.getNote());
        updatedMedicalRecordModel.setBhytCode(medicalRecord.getBHYTCode());
        updatedMedicalRecordModel.setInDay(medicalRecord.getInDay());
        updatedMedicalRecordModel.setOutDay(medicalRecord.getOutDay());
        updatedMedicalRecordModel.setInDayDiagnose(medicalRecord.getInDayDiagnose());
        updatedMedicalRecordModel.setOutDayDiagnose(medicalRecord.getOutDayDiagnose());
        updatedMedicalRecordModel.setMedicalHistory(medicalRecord.getMedicalHistory());
        updatedMedicalRecordModel.setDiseaseProgress(medicalRecord.getDiseaseProgress());
        updatedMedicalRecordModel.setTestResults(medicalRecord.getTestResults());
        updatedMedicalRecordModel.setHospitalDischargeStatus(medicalRecord.getHospitalDischargeStatus());
        updatedMedicalRecordModel.setStayType(StayType.valueOf(medicalRecord.getStayType().toString()));
        MedicalRecordModel savedModel = iMedicalRecordRepository.save(updatedMedicalRecordModel);
        return modelMapper.map(savedModel, MedicalRecord.class);
    }

    @Override
    public void deleteMedicalRecordAdapter(UUID userId, UUID mrId) throws BadRequestException {
        MedicalRecordModel medicalRecordModel = iMedicalRecordRepository.findById(mrId)
                .orElseThrow(() -> new BadRequestException("Bad Request!"));
        if(userId.compareTo(medicalRecordModel.getDoctor().getId()) != 0){
            throw new BadRequestException("Bad Request! Action now allowed!");
        }
        iMedicalRecordRepository.deleteById(mrId);
    }
}
