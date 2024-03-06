package introse.group20.hms.webapi.DTOs.PrescriptionDTO;

import introse.group20.hms.webapi.DTOs.MedicineDTO.MedicineResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PrescriptionResponse {
    private UUID id;
    private UUID doctorId;
    private String doctorName;
    private UUID patientId;
    private String patientName;
    private Date createdDay;
    private String note;
    private List<MedicineResponse> medicines;
}