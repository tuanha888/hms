import React from "react";
import "./AboutUs.scss";
const AboutUs = () => {
  return (
    <section className="about" id="about">
      <div className="about-heading">Về chúng tôi</div>
      <p className="about-content">
        Ra đời năm 2012, Bệnh viện đa khoa 20 mang sứ mệnh “Mang lại sự lựa chọn
        hoàn hảo về chăm sóc sức khỏe". Với cơ sở vật chất vượt trội; đội ngũ
        chuyên gia, bác sỹ nhiều năm kinh nghiệm; liên tục ứng dụng các phương
        pháp điều trị mới nhất thế giới cùng chất lượng dịch vụ hoàn hảo, đến
        nay Bệnh viện đa khoa 20 đã trở thành địa chỉ chăm sóc sức khỏe hàng đầu
        tại Việt Nam.
      </p>
      <ul className="about-list">
        <li className="about-item">
          <h3 className="about-item-title">Sứ mệnh</h3>
          <p className="about-item-content">
            Chăm sóc bằng tài năng, y đức và sự thấu cảm
          </p>
        </li>
        <li className="about-item">
          <h3 className="about-item-title">Tầm nhìn</h3>
          <p className="about-item-content">
            Trở thành cơ sở y tế hàng đầu Việt Nam
          </p>
        </li>
      </ul>
    </section>
  );
};

export default AboutUs;
