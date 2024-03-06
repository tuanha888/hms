package introse.group20.hms.webapi.DTOs.CategoryDTO;

import lombok.Data;

import java.util.UUID;

@Data
public class CategoryResponse {
    private UUID id;
    private String name;
}