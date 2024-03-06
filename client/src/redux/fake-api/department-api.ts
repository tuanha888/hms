
import {v4 as uuidv4} from 'uuid'

const departmentNames = [
    "Khoa Sản phụ khoa",
    "Khoa Ngoại chung",
    "Trung tâm Hỗ trợ sinh sản IVF",
    "Khoa Nhi",
    "Khoa Nội chung",
    "Khoa Chẩn đoán hình ảnh và Thăm dò chức năng",
    "Khoa Xét nghiệm – Giải phẫu",
    "Khoa Vật lý trị liệu – Phục hồi chức năng",
    "Khoa Tiêu hóa – Gan – Mật",
    "Khoa Mắt",
    "Khoa Răng – Hàm – Mặt",
    "Khoa Tai – Mũi – Họng",
    "Khoa Da liễu",
    "Khoa Nam học",
    "Khoa Nội tiết",
    "Khoa Tim mạch",
    "Khoa Thận lọc máu",
    "Khoa Ung bướu",
    "Khoa Khám bệnh",
    "Khoa Kiểm soát nhiễm khuẩn",
    "Phòng Tiêm chủng vacxin",
    "Khoa Cấp cứu Hồi sức tích cực ICU",
    "Khoa Cơ – Xương – Khớp",
    "Khoa Tâm lý và Sức khỏe tâm thần",
    "Khoa Hô Hấp"
  ];
export const departments = departmentNames.map(name => {
    return {
        id: uuidv4(),
        name: name
    }
})