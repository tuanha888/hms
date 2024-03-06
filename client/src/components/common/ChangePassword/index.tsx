import React, { useEffect, useRef } from "react";
import {
  ChangePassword,
  ChangePasswordAPI,
} from "../../../redux/actions/auth-actions";
import * as yup from "yup";
import { useFormik } from "formik";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../redux/features/loadingSlice";
import { FaTimes } from "react-icons/fa";

interface ChangePasswordProps {
  closeModal: Function;
}
const initialValues = {
  oldPassword: "",
  newPassword: "",
};
const changePasswordSchema = yup.object({
  oldPassword: yup.string().min(5, "Mật khẩu phải có ít nhất 5 kí tự!"),
  newPassword: yup
    .string()
    .min(5, "Mật khẩu phải có ít nhất 5 kí tự!")
    .required("Vui lòng nhập mật khẩu mới"),
});
const ChangePasswordModal: React.FC<ChangePasswordProps> = ({ closeModal }) => {
  const dispatch: AppDispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values) => {
      console.log(values);
      dispatch(setLoading(true));
      await dispatch(
        ChangePasswordAPI({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        })
      );
      dispatch(setLoading(false));
      closeModal();
    },
  });
  const changePasswordModal = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleShowLoginModal = (event: MouseEvent) => {
      if (
        event.target === changePasswordModal.current ||
        changePasswordModal.current?.contains(event.target as Node)
      )
        return;
      closeModal();
    };
    window.addEventListener("click", handleShowLoginModal);
    return () => {
      window.removeEventListener("click", handleShowLoginModal);
    };
  }, []);
  return (
    <div className="modal-container" style={{ zIndex: 999999 }}>
      <div className="modal" ref={changePasswordModal}>
        <FaTimes className="modal-close" onClick={closeModal} />
        <form onSubmit={formik.handleSubmit} className="login-form">
          <input
            type="password"
            name="oldPassword"
            className="modal-input"
            placeholder="Mật khẩu hiện tại"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.oldPassword && formik.errors.oldPassword && (
            <div className="error-message">{formik.errors.oldPassword}</div>
          )}
          <input
            type="password"
            name="newPassword"
            className="modal-input"
            placeholder="Mật khẩu mới"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
          />
          {formik.touched.newPassword && formik.errors.newPassword && (
            <div className="error-message">{formik.errors.newPassword}</div>
          )}
          <button type="submit">Đổi mật khẩu</button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
