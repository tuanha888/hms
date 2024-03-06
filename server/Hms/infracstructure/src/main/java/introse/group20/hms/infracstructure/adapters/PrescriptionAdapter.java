package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.IPrescriptionAdapter;
import introse.group20.hms.core.entities.Prescription;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.infracstructure.models.DoctorModel;
import introse.group20.hms.infracstructure.models.MedicineModel;
import introse.group20.hms.infracstructure.models.PatientModel;
import introse.group20.hms.infracstructure.models.PrescriptionModel;
import introse.group20.hms.infracstructure.repositories.IDoctorRepository;
import introse.group20.hms.infracstructure.repositories.IMedicineRepository;
import introse.group20.hms.infracstructure.repositories.IPatientRepository;
import introse.group20.hms.infracstructure.repositories.IPrescriptionRepository;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class PrescriptionAdapter implements IPrescriptionAdapter {
    @Autowired
    private IPrescriptionRepository prescriptionRepository;
    @Autowired
    private IDoctorRepository doctorRepository;
    @Autowired
    private IPatientRepository patientRepository;
    @Autowired
    private IMedicineRepository medicineRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    EntityManager entityManager;

    @Override
    public List<Prescription> getByPatientAdapter(UUID patientId, int pageNo, int pageSize) {
        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDay").descending());
        List<PrescriptionModel> prescriptionModels = prescriptionRepository.findByPatientId(patientId, pageRequest);
        return prescriptionModels.stream()
                .map(prescriptionModel -> modelMapper.map(prescriptionModel, Prescription.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<Prescription> getByIdAdapter(UUID presId) {
        return prescriptionRepository.findById(presId)
                .map(prescriptionModel -> modelMapper.map(prescriptionModel, Prescription.class));
    }

    @Override
    public Prescription addPrescriptionAdapter(UUID doctorId, UUID patientId, Prescription prescription) throws BadRequestException {
        PrescriptionModel newPrescription = modelMapper.map(prescription, PrescriptionModel.class);
        DoctorModel doctorModel = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new BadRequestException("Bad Request! Doctor not exist!"));
        PatientModel patientModel = patientRepository.findById(patientId)
                .orElseThrow(() -> new BadRequestException("Bad Request! Patient not exist"));
        newPrescription.setPatient(patientModel);
        newPrescription.setDoctor(doctorModel);
        List<MedicineModel> newListMedicine = prescription.getMedicines().stream()
                .map(medicine -> {
                    MedicineModel newMedicine = modelMapper.map(medicine, MedicineModel.class);
                    newMedicine.setPrescription(newPrescription);
                    return newMedicine;
                })
                .collect(Collectors.toList());
        newPrescription.setMedicines(newListMedicine);
        PrescriptionModel savePrescription = prescriptionRepository.save(newPrescription);
        return modelMapper.map(savePrescription, Prescription.class);
    }
    @Transactional
    @Override
    public Prescription updatePrescriptionAdapter(UUID userId, Prescription prescription) throws BadRequestException {
        PrescriptionModel prescriptionModel = prescriptionRepository.findById(prescription.getId())
                .orElseThrow(() -> new BadRequestException("Bad Request! Prescription not exist!"));
        if(userId.compareTo(prescriptionModel.getDoctor().getId()) != 0) {
            throw new BadRequestException("Bad Request! Action not allowed!");
        }
        prescriptionModel.setCreatedDay(prescription.getCreatedDay());
        prescriptionModel.setNote(prescription.getNote());
        for(MedicineModel medicineModel : prescriptionModel.getMedicines()){
            medicineRepository.delete(medicineModel);
        }
        prescriptionModel.getMedicines().clear();
        List<MedicineModel> newListMedicine = prescription.getMedicines().stream()
                .map(medicine -> {
                    MedicineModel medicineModel = modelMapper.map(medicine, MedicineModel.class);
                    medicineModel.setPrescription(prescriptionModel);
                    return medicineModel;
                }).collect(Collectors.toList());
        prescriptionModel.getMedicines().addAll(newListMedicine);
        entityManager.persist(prescriptionModel);
        entityManager.flush();
        PrescriptionModel updatedPres = prescriptionRepository.findById(prescription.getId()).get();
        return modelMapper.map(updatedPres, Prescription.class);
    }

    @Override
    public void deletePrescriptionAdapter(UUID userId, UUID presId) throws BadRequestException {
        PrescriptionModel prescriptionModel = prescriptionRepository.findById(presId)
                .orElseThrow(() -> new BadRequestException("Bad Request! Prescription not exist!"));
        if(userId.compareTo(prescriptionModel.getDoctor().getId()) != 0) {
            throw new BadRequestException("Bad Request! Action not allowed!");
        }
        prescriptionRepository.delete(prescriptionModel);
    }
}
