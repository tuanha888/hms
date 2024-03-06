import React from "react";
import "./Landing.scss";
const Landing = () => {
  return (
    <div id="home-page">
      <div className="container">
        <div className="overlay"></div>
        <div className="landing">
          <h1 className="landing-heading">
            Bệnh viện đa khoa 20 xin kính chào quý khách
          </h1>
          <p className="landing-content">
            Bệnh viện đa khoa 20 được thành lập với sứ mệnh <br /> “Mang lại sự
            lựa chọn hoàn hảo về chăm sóc sức khỏe" <br /> <br />
            Với đội ngũ chuyên gia, bác sĩ, dược sĩ và điều dưỡng trình độ
            chuyên môn cao, giàu kinh nghiệm. tận tâm và chuyên nghiệp. Luôn đặt
            người bệnh làm trung tâm. Chúng tôi cam kết đem đến dịch vụ chăm sóc
            sức khỏe tốt
          </p>
          <a href="#services">Dịch vụ</a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
