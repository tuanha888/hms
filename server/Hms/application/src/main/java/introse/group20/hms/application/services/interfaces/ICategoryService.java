package introse.group20.hms.application.services.interfaces;

import introse.group20.hms.core.entities.Category;
import introse.group20.hms.core.exceptions.BadRequestException;

import java.util.List;
import java.util.UUID;

public interface ICategoryService {
    List<Category> getAllCategory();
    Category addCategory(Category category);
    void deleteCategory(UUID categoryId) throws BadRequestException;
}
