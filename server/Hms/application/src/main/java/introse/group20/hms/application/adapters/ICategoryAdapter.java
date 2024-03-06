package introse.group20.hms.application.adapters;

import introse.group20.hms.core.entities.Category;
import introse.group20.hms.core.exceptions.BadRequestException;

import java.util.List;
import java.util.UUID;

public interface ICategoryAdapter {
    List<Category> getAllCategoryAdapter();
    Category addCategoryAdapter(Category category);
    void deleteCategory(UUID categoryId) throws BadRequestException;
}
