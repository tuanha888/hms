package introse.group20.hms.webapi.DTOs.CategoryDTO;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryRequest {
    @NotBlank(message = "category name can not be blank")
    private String name;
}
