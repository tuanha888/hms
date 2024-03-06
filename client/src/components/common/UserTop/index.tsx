import React from "react";
import { User } from "../../../redux/features/userSlice";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import "./UserTop.scss";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { Logout } from "../../../redux/actions/auth-actions";
import { useModal } from "../../hooks/useModal";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "../ChangePassword";
import ConfirmModal from "../ConfirmModal";
import { setLoading } from "../../../redux/features/loadingSlice";
interface UserTopProps {
  user: User;
  managePage: boolean;
}
const UserTop: React.FC<UserTopProps> = ({ user, managePage }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(setLoading(true));
    await dispatch(Logout());
    dispatch(setLoading(false));
    navigate("/");
  };
  const { isModalOpen, openModal, closeModal } = useModal();
  const {
    isModalOpen: isLogoutModal,
    openModal: openLogoutModal,
    closeModal: closeLogoutModal,
  } = useModal();
  return (
    <>
      <div className={`usertop ${managePage ? "usertop-shadow" : ""}`}>
        <div className="usertop-content">
          <span className="usertop-content-name">{user.name}</span>
          <div className="usertop-content-img">
            <img src={user.avatar} alt="" />
            <IoIosArrowDropdownCircle className="usertop-icon" />
            <ul className="usertop-choosen">
              <li
                className="usertop-item"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal();
                }}
              >
                Đổi mật khẩu
              </li>
              <li className="usertop-item" onClick={openLogoutModal}>
                Đăng xuất
              </li>
              {!managePage && (
                <li className="usertop-item" onClick={() => navigate("/admin")}>
                  Trang quản lý
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
      {isModalOpen && <ChangePasswordModal closeModal={closeModal} />}
      {isLogoutModal && (
        <ConfirmModal
          type={"LOGOUT"}
          closeConfirmModal={closeLogoutModal}
          closeModifyModal={null}
          deleteFunction={handleLogout}
        />
      )}
    </>
  );
};

export default UserTop;
