package introse.group20.hms.webapi.DTOs.PrescriptionDTO;

import introse.group20.hms.webapi.DTOs.MedicineDTO.MedicineRequest;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
public class PrescriptionRequest {
    @NotNull
    private UUID patientId;
    @NotNull
    private Date createdDay;
    private String note;
    @NotEmpty
    private List<MedicineRequest> medicines;
}
