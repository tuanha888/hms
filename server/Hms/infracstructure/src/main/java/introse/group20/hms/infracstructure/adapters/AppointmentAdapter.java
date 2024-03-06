package introse.group20.hms.infracstructure.adapters;

import com.twilio.rest.microvisor.v1.App;
import introse.group20.hms.application.adapters.IAppointmentAdapter;
import introse.group20.hms.application.services.interfaces.IAppointmentService;
import introse.group20.hms.core.entities.Appointment;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.infracstructure.models.AppointmentModel;
import introse.group20.hms.infracstructure.models.DoctorModel;
import introse.group20.hms.infracstructure.models.PatientModel;
import introse.group20.hms.infracstructure.models.enums.AppointmentStatus;
import introse.group20.hms.infracstructure.repositories.IAppointmentRepository;
import introse.group20.hms.infracstructure.repositories.IDoctorRepository;
import introse.group20.hms.infracstructure.repositories.IPatientRepository;
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
public class AppointmentAdapter implements IAppointmentAdapter {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    IAppointmentRepository appointmentRepository;
    @Autowired
    IDoctorRepository doctorRepository;
    @Autowired
    IPatientRepository patientRepository;

    @Override
    public Optional<Appointment> getAppointmentById(UUID id) {
        return appointmentRepository.findById(id)
                .map(appointmentModel -> modelMapper.map(appointmentModel, Appointment.class));
    }

    @Override
    public List<Appointment> getAppointmentByDoctorAdapter(UUID doctorId) {
//        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDay").descending());
        return appointmentRepository.findByDoctorId(doctorId).stream()
                .filter(appointmentModel -> appointmentModel.getTime().compareTo(new Date()) > 0)
                .map(appointmentModel -> modelMapper.map(appointmentModel, Appointment.class))
                .collect(Collectors.toList());
    }

    @Override
    public List<Appointment> getAppointmentByPatientAdapter(UUID patientId) {
//        PageRequest pageRequest = PageRequest.of(pageNo, pageSize, Sort.by("createdDay").descending());
        return appointmentRepository.findByPatientId(patientId).stream()
                .filter(appointmentModel -> appointmentModel.getTime().compareTo(new Date()) > 0)
                .map(appointmentModel -> modelMapper.map(appointmentModel, Appointment.class))
                .collect(Collectors.toList());
    }

    @Override
    public Appointment addAppointmentAdapter(UUID doctorId, UUID patientId, Appointment apm) throws BadRequestException {
        DoctorModel doctorModel = doctorRepository.findById(doctorId)
                .orElseThrow(() -> new BadRequestException(String.format("Doctor with id: %s not exist", doctorId)));
        PatientModel patientModel = patientRepository.findById(patientId)
                .orElseThrow(() -> new BadRequestException(String.format("Patient with id: %s not exist", patientId)));
        AppointmentModel appointmentModel = modelMapper.map(apm, AppointmentModel.class);
        appointmentModel.setCreatedDay(new Date());
        appointmentModel.setDoctor(doctorModel);
        appointmentModel.setPatient(patientModel);
        appointmentModel.setStatus(AppointmentStatus.PENDING);
        AppointmentModel savedApm = appointmentRepository.save(appointmentModel);
        Appointment returnApm = modelMapper.map(savedApm, Appointment.class);
        returnApm.setPatientName(savedApm.getPatient().getName());
        return returnApm;
    }

    @Override
    public Appointment updateAppointmentAdapter(UUID userId, Appointment appointment) throws BadRequestException {
        AppointmentModel appointmentModel = appointmentRepository.findById(appointment.getId())
                .orElseThrow(() -> new BadRequestException(String.format("Appointment with id: %s not exist", appointment.getId())));
        if(userId.compareTo(appointmentModel.getDoctor().getId()) != 0
                && userId.compareTo(appointmentModel.getPatient().getId()) != 0
        ) {
            throw new BadRequestException("Bad Request! Action not allowed!");
        }
        appointmentModel.setNote(appointment.getNote());
        appointmentModel.setTime(appointment.getTime());
        appointmentModel.setStatus(AppointmentStatus.valueOf(appointment.getStatus().toString()));
        AppointmentModel savedAppointment = appointmentRepository.save(appointmentModel);
        return modelMapper.map(savedAppointment, Appointment.class);
    }

    @Override
    public void deleteAppointmentAdapter(UUID userId, UUID id) throws BadRequestException {
        AppointmentModel appointmentModel = appointmentRepository.findById(id)
                .orElseThrow(() -> new BadRequestException(String.format("Appointment with id: %s not exist", id)));
        if(userId.compareTo(appointmentModel.getPatient().getId()) != 0) {
            throw new BadRequestException("Bad Request! Action not allowed!");
        }
        appointmentRepository.delete(appointmentModel);
    }
}
