package introse.group20.hms.application.services;

import introse.group20.hms.application.adapters.ICategoryAdapter;
import introse.group20.hms.application.services.interfaces.ICategoryService;
import introse.group20.hms.core.entities.Category;
import introse.group20.hms.core.exceptions.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.UUID;

public class CategoryService implements ICategoryService {
    @Autowired
    ICategoryAdapter categoryAdapter;
    public CategoryService(ICategoryAdapter categoryAdapter){this.categoryAdapter = categoryAdapter;}
    @Override
    public List<Category> getAllCategory() {
        return categoryAdapter.getAllCategoryAdapter();
    }

    @Override
    public Category addCategory(Category category) {
        return categoryAdapter.addCategoryAdapter(category);
    }

    @Override
    public void deleteCategory(UUID categoryId) throws BadRequestException {
        categoryAdapter.deleteCategory(categoryId);
    }
}
