package introse.group20.hms.webapi.controllers;

import introse.group20.hms.application.services.CategoryService;
import introse.group20.hms.application.services.interfaces.ICategoryService;
import introse.group20.hms.core.entities.Category;
import introse.group20.hms.core.exceptions.BadRequestException;
import introse.group20.hms.webapi.DTOs.CategoryDTO.CategoryRequest;
import introse.group20.hms.webapi.DTOs.CategoryDTO.CategoryResponse;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@CrossOrigin("*")
public class CategoryController {
    @Autowired
    ICategoryService categoryService;
    @Autowired
    ModelMapper modelMapper;

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryResponse>> getAllCategory(){
        List<CategoryResponse> response = categoryService.getAllCategory().stream()
                .map(category -> modelMapper.map(category, CategoryResponse.class))
                .collect(Collectors.toList());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/api/categories")
    @Secured("ADMIN")
    public ResponseEntity<CategoryResponse> addCategory(@Valid @RequestBody CategoryRequest request){
        Category newCategory = modelMapper.map(request, Category.class);
        Category savedCategory = categoryService.addCategory(newCategory);
        return ResponseEntity.ok(modelMapper.map(savedCategory, CategoryResponse.class));
    }

    @DeleteMapping("/api/categories/{categoryId}")
    @Secured("ADMIN")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable UUID categoryId) throws BadRequestException {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}