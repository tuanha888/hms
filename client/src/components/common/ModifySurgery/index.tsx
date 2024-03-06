import React from "react";
import { Surgery } from "../../../redux/features/surgerySlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ModifySurgery.scss";
import { useModal } from "../../hooks/useModal";
import ConfirmModal from "../ConfirmModal";
interface ModifySurgeryProps {
  surgery: Surgery;
  closeModifyModal: Function;
}
const DateTimeInput = ({ field, form, ...props }) => {
  return (
    <div>
      <DatePicker
        {...field}
        {...props}
        selected={field.value}
        onChange={(val) => form.setFieldValue(field.name, val)}
        showTimeSelect
        timeIntervals={15} // Adjust as needed
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <ErrorMessage name={field.name} component="div" className="error" />
    </div>
  );
};
const ModifySurgery: React.FC<ModifySurgeryProps> = ({
  surgery,
  closeModifyModal,
}) => {
  const {
    isModalOpen: isConfirmModal,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();
  const handleCloseModify = () => {
    openConfirmModal();
  };
  const initialValues = {
    doctorName: surgery.doctorName,
    patientName: surgery.patientName,
    doctorId: surgery.doctorId,
    patientId: surgery.patientId,
    expectedTime: surgery.expectedTime,
    content: surgery.content,
    time: surgery.time,
  };
  const dispatch: AppDispatch = useDispatch();
  const handleChange = (values) => {};

  return (
    <div className="modal-container">
      <div className="modal">
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleChange(values)}
        >
          <Form>
            <div className="modal-data">
              <label className="modal-label" htmlFor="doctorName">
                Bác sĩ
              </label>
              <Field type="text" name="doctorName" className="modal-input" />
            </div>
            <div className="modal-data">
              <label className="modal-label" htmlFor="patientName">
                Bệnh nhân
              </label>
              <Field type="text" name="patientName" className="modal-input" />
            </div>
            <div className="modal-data">
              <label htmlFor="time" className="modal-label">
                Thời gian
              </label>
              <Field
                name="time"
                className="modal-input"
                component={DateTimeInput}
              />
            </div>
            <div className="modal-data">
              <label htmlFor="content" className="modal-label">
                Nội dung
              </label>
              <Field as="textarea" name="content" className="modal-input" />
            </div>
            <div className="modal-data">
              <label className="modal-label" htmlFor="expectedTime">
                Thời gian dự kiến
              </label>
              <Field type="text" name="expectedTime" className="modal-input" />
            </div>
            <button type="submit" className="modal-button">
              Thay đổi
            </button>
            <button
              type="button"
              className="modal-button"
              onClick={() => handleCloseModify()}
            >
              Hủy
            </button>
          </Form>
        </Formik>
        <FaTimes className="modal-close" onClick={handleCloseModify} />
      </div>
      {isConfirmModal && (
        <ConfirmModal
          type="MODIFY"
          closeConfirmModal={closeConfirmModal}
          closeModifyModal={closeModifyModal}
          deleteFunction={null}
        />
      )}
    </div>
  );
};

export default ModifySurgery;
