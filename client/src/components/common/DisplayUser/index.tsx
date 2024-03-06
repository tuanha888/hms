import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { FaTimes } from "react-icons/fa";
import { setUser } from "../../../redux/features/displayUserSlice";

const DisplayUser = () => {
  const displayUser = useSelector((state: RootState) => state.displayUser);
  const dispatch: AppDispatch = useDispatch();
  return (
    <>
      {displayUser.display && (
        <div className="modal-container">
          <div className="modal-wrapper">
            <div className="modal">
              <p className="modal-item overview-item">
                <span className="modal-field overview-field">
                  Tên đăng nhập:
                </span>{" "}
                <span>{displayUser.username}</span>
              </p>
              <p className="modal-item overview-item">
                <span className="modal-field overview-field">Mật khẩu:</span>{" "}
                <span>{displayUser.password}</span>
              </p>
              <FaTimes
                className="modal-close"
                onClick={() =>
                  dispatch(
                    setUser({
                      username: "",
                      password: "",
                      display: false,
                    })
                  )
                }
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayUser;
