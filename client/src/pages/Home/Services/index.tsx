import React from "react";
import Service01 from "../../../assets/images/services_01.jpg";
import Service02 from "../../../assets/images/services_02.jpg";
import "./Services.scss";
const Services = () => {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="services-heading">Dịch vụ</h2>
        <ul className="services-list">
          <li className="services-item">
            <div className="services-img">
              <img src={Service01} alt="" />
            </div>
            <p className="services-content">
              Cung cấp giải pháp thăm khám toàn diện và sàng lọc một số bệnh lý
              ung thư như dạ dày, đại tràng ... với các bác sĩ, chuyên gia hàng
              đầu, từ đó có hướng xây dựng kế hoạch chăm sóc sức khoẻ
            </p>
          </li>
          <li className="services-item">
            <div className="services-img">
              <img src={Service02} alt="" />
            </div>
            <p className="services-content">
              Cung cấp giải pháp thăm khám toàn diện và sàng lọc một số bệnh lý
              ung thư như dạ dày, đại tràng ... với các bác sĩ, chuyên gia hàng
              đầu, từ đó có hướng xây dựng kế hoạch chăm sóc sức khoẻ
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
