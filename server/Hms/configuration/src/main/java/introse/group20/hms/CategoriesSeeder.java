package introse.group20.hms;

import introse.group20.hms.infracstructure.models.CategoryModel;
import introse.group20.hms.infracstructure.repositories.ICategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CategoriesSeeder implements CommandLineRunner {
    @Autowired
    private ICategoryRepository categoryRepository;
    @Override
    public void run(String... args) throws Exception {
        List<CategoryModel> categoryModels = new ArrayList<>();
        categoryModels.add(new CategoryModel("Sức khỏe mắt"));
        categoryModels.add(new CategoryModel("Tiểu đường"));
        categoryModels.add(new CategoryModel("Bệnh tim mạch"));
        categoryModels.add(new CategoryModel("Bệnh hô hấp"));
        categoryModels.add(new CategoryModel("Bệnh thận và Đường tiết niệu"));
        categoryModels.add(new CategoryModel("Bệnh cơ xương khớp"));
        categoryModels.add(new CategoryModel("Bệnh tai mũi họng"));
        categoryModels.add(new CategoryModel("Chăm sóc giấc ngủ"));
        categoryModels.add(new CategoryModel("Dị ứng"));
        categoryModels.add(new CategoryModel("Sức khỏe răng miệng"));
        categoryModels.add(new CategoryModel("Da liễu"));
        categoryModels.add(new CategoryModel("Sức khỏe tình dục"));
        categoryModels.add(new CategoryModel("Bệnh về máu"));
        categoryModels.add(new CategoryModel("Bệnh tiêu hóa"));
        categoryModels.add(new CategoryModel("Bệnh truyền nhiễm"));
        categoryModels.add(new CategoryModel("Bệnh về não & hệ thần kinh"));
        categoryModels.add(new CategoryModel("Ung thư - Ung bướu"));
        categoryModels.add(new CategoryModel("Ăn uống lành mạnh"));
        categoryModels.add(new CategoryModel("Thói quen lành mạnh"));
        categoryModels.add(new CategoryModel("Lão hóa lành mạnh"));
        categoryModels.add(new CategoryModel("Thể dục thể thao"));
        categoryModels.add(new CategoryModel("Sức khỏe phụ nữ"));
        categoryModels.add(new CategoryModel("Sức khỏe nam giới"));
        categoryModels.add(new CategoryModel("Thuốc và thực phẩm chức năng"));
        categoryModels.add(new CategoryModel("Tâm lý - Tâm thần"));
        categoryModels.add(new CategoryModel("Dược liệu"));
        categoryRepository.saveAll(categoryModels);
    }
}
