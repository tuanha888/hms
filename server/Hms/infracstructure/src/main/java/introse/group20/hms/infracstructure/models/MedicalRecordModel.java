package introse.group20.hms.infracstructure.models;

import introse.group20.hms.infracstructure.models.enums.StayType;
import jakarta.persistence.*;
import jdk.jfr.DataAmount;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;
@Entity
@Data
@Table(name = "medical_records")
@NoArgsConstructor
public class MedicalRecordModel {
    @Id
    @GeneratedValue
    private UUID id;
    private String bhytCode;
    private Date inDay;
    private Date outDay;
    @Column(length = 1000)
    private String inDayDiagnose;
    @Column(length = 1000)
    private String outDayDiagnose;
//    @Lob
    @Column(length = 1000)
    private String medicalHistory;
//    @Lob
    @Column(length = 1000)
    private String diseaseProgress;
    @Column(length = 1000)
    private String testResults;
    @Column(length = 1000)
    private String hospitalDischargeStatus;
    @Enumerated(EnumType.STRING)
    private StayType stayType;
    @Column(length = 1000)
    private String note;
    private Date createdDay;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patient_id")
    private PatientModel patient;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name= "department_id")
    private DepartmentModel department;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "doctor_id")
    private DoctorModel doctor;
    @OneToOne(mappedBy = "medicalRecord", cascade = CascadeType.ALL)
    private TreatmentPlanModel treatmentPlan;
}
