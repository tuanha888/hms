package introse.group20.hms.infracstructure.adapters;

import introse.group20.hms.application.adapters.ICategoryAdapter;
import introse.group20.hms.core.entities.Category;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.infracstructure.models.CategoryModel;
import introse.group20.hms.infracstructure.repositories.ICategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
public class CategoryAdapter implements ICategoryAdapter {
    @Autowired
    ICategoryRepository categoryRepository;
    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<Category> getAllCategoryAdapter() {
        return categoryRepository.findAll().stream()
                .map(categoryModel -> modelMapper.map(categoryModel, Category.class))
                .collect(Collectors.toList());
    }

    @Override
    public Category addCategoryAdapter(Category category) {
        CategoryModel newCategory = modelMapper.map(category, CategoryModel.class);
        CategoryModel savedCategory = categoryRepository.save(newCategory);
        return modelMapper.map(savedCategory, Category.class);
    }

    @Override
    public void deleteCategory(UUID categoryId) throws BadRequestException {
        CategoryModel categoryModel = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new BadRequestException(String.format("Category with id : $s not exist", categoryId)));
        categoryRepository.delete(categoryModel);
    }
}
