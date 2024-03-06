package introse.group20.hms.webapi.DTOs.MedicalRecordDTO;

import introse.group20.hms.webapi.DTOs.TreatmentPlanDTO.TreatmentPlanResponse;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class MedicalRecordResponse {
    private UUID id;
    private UUID doctorId;
    private String doctorName;
    private UUID patientId;
    private String patientName;
    private UUID departmentId;
    private String departmentName;
    private String bhytCode;
    private Date inDay;
    private Date outDay;
    private String inDayDiagnose;
    private String outDayDiagnose;
    private String medicalHistory;
    private String diseaseProgress;
    private String testResults;
    private String hospitalDischargeStatus;
    private String stayType;
    private String note;
    private TreatmentPlanResponse treatmentPlan;
}
