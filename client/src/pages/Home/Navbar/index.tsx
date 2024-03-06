import React from "react";
import "./Navbar.scss";
import { useModal } from "../../../components/hooks/useModal";
import LoginModal from "./LoginModal";
import { useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import UserTop from "../../../components/common/UserTop";
const Navbar = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const handleOpenLoginModel = (event: any) => {
    event.stopPropagation();
    openModal();
  };
  const user = useSelector((state: RootState) => state.user.user);
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div className="container">
        <div className="nav-content">
          <div className="nav-logo">
            <img src={Logo} alt="" />
          </div>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home-page">Trang chủ</a>
            </li>
            <li className="nav-item">
              <a href="#services">Dịch vụ</a>
            </li>
            <li className="nav-item">
              <a href="#about">Về chúng tôi</a>
            </li>
            <li className="nav-item" onClick={() => navigate("/posts")}>
              <a>Bài viết</a>
            </li>

            {user === null ? (
              <li
                className="nav-login"
                onClick={(e) => handleOpenLoginModel(e)}
              >
                Đăng nhập
              </li>
            ) : (
              <>
                <UserTop user={user} managePage={false} />
              </>
            )}
          </ul>
          {isModalOpen && (
            <LoginModal openModal={openModal} closeModal={closeModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
