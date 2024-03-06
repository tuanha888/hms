import React from "react";

import Logo from "../../../assets/images/logo-white.png";
import "./Sidebar.scss";
import { v4 as uuidv4 } from "uuid";
import { NavLink, useNavigate } from "react-router-dom";
const Sidebar = () => {
  const items = [
    {
      name: "Đơn thuốc",
      to: "/patient/prescriptions",
    },
    {
      name: "Kế hoạch điều trị",
      to: "/patient/treatment_plans",
    },
    {
      name: "Lịch hẹn",
      to: "/patient/appointments",
    },
    {
      name: "Bác sĩ",
      to: "/patient/doctors",
    },
    {
      name: "Nhắn tin",
      to: "/patient/chat",
    },
  ];
  const navigate = useNavigate();
  const renderSidebarList = () => {
    return items.map((item) => {
      return (
        <li className="sidebar-item" key={uuidv4()}>
          <NavLink
            to={item.to}
            className={({ isActive }) => {
              const classes = ["sidebar-item-link"];
              if (isActive) classes.push("actived");
              return classes.join(" ");
            }}
          >
            {item.name}
          </NavLink>
        </li>
      );
    });
  };
  return (
    <div className="admin-sidebar sidebar">
      <div className="sidebar-top">
        <img
          src={Logo}
          alt=""
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
      </div>
      <ul className="sidebar-list">{renderSidebarList()}</ul>
    </div>
  );
};

export default Sidebar;
