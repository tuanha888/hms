import React, { ReactNode } from "react";

import "../../Detail/Detail.scss";
import ConfirmModal from "../../ConfirmModal";
import Modify from "../../Modify";
import { useModal } from "../../../hooks/useModal";
import { FaTimes } from "react-icons/fa";
import { Field } from "../../interfaces";
import { AppDispatch, RootState } from "../../../../redux";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptAppoitment,
  deleteAppointment,
  rejectAppoitment,
  updateAppointment,
} from "../../../../redux/actions/appointment-actions";
import { setLoading } from "../../../../redux/features/loadingSlice";
import { Appointment } from "../../../../redux/features/appointmentSlice";
interface DetailProps {
  fields: Field[];
  entity: any;
  closeDetailModal: Function;
  openDetailEdit: boolean;
  role: "DOCTOR" | "PATIENT";
}
const AppointmentDetail: React.FC<DetailProps> = ({
  fields,
  entity,
  closeDetailModal,
  openDetailEdit,
  role,
}) => {
  const {
    isModalOpen: isModifyOpen,
    openModal: openModify,
    closeModal: closeModify,
  } = useModal();
  const {
    isModalOpen: isConfirmModal,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch: AppDispatch = useDispatch();
  const handleDelete = async () => {
    await dispatch(deleteAppointment(entity.id));
  };
  const handleUpdate = async (data: { id: string; value: Appointment }) => {
    await dispatch(updateAppointment(data));
  };
  const handleReject = async (id) => {
    try {
      dispatch(setLoading(true));
      await dispatch(rejectAppoitment(id));
      dispatch(setLoading(false));
      closeDetailModal();
    } catch (error) {
      dispatch(setLoading(false));
      closeDetailModal();
    }
  };
  const handleAccept = async (id) => {
    try {
      dispatch(setLoading(true));
      await dispatch(acceptAppoitment(id));
      dispatch(setLoading(false));
      closeDetailModal();
    } catch (error) {
      dispatch(setLoading(false));
      closeDetailModal();
    }
  };
  const renderEntity = () => {
    const render: ReactNode[] = [];
    fields.forEach((field) => {
      if (
        field.detailDisplay &&
        ((role === "DOCTOR" && field.fieldName !== "doctorName") ||
          (role === "PATIENT" && field.fieldName !== "patientName"))
      )
        if (field.type !== "image")
          render.push(
            <p className="modal-item">
              <span className="modal-field">{field.fieldDisplay}:</span>{" "}
              <span>
                {field.fieldName === "status"
                  ? entity[field.fieldName] === "ACCEPT"
                    ? "Đã chấp nhận"
                    : entity[field.fieldName] === "REJECT"
                    ? "Bị từ chối"
                    : "Chờ phản hồi"
                  : field.fieldName === "gender"
                  ? entity[field.fieldName] === "MALE"
                    ? "Nam"
                    : "Nữ"
                  : field.fieldName === "stayType"
                  ? entity[field.fieldName] === "STAY"
                    ? "Nội trú"
                    : entity[field.fieldName] === "NOT_STAY"
                    ? "Ngoại trú"
                    : "Ở ban ngày"
                  : !field.type.includes("date")
                  ? entity[field.fieldName]
                  : entity[field.fieldName].toLocaleDateString("vi", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
              </span>
            </p>
          );
        else
          render.unshift(
            <div className="overview-img-container">
              <div className="overview-img">
                <img src={entity[field.fieldName]} alt="" />
              </div>
            </div>
          );
    });
    return render;
  };
  return (
    <div className="detail modal-container">
      {!isModifyOpen && (
        <div className="modal-wrapper">
          <div className="detail-modal modal">
            {renderEntity()}
            {openDetailEdit && entity.status === "PENDING" && (
              <>
                <button className="modal-button" onClick={openModify}>
                  Sửa
                </button>
                <button className="modal-button" onClick={openConfirmModal}>
                  Xóa
                </button>
              </>
            )}
            {role === "DOCTOR" && entity.status === "PENDING" && (
              <>
                <button
                  className="modal-button"
                  onClick={() => handleReject(entity.id)}
                >
                  Từ chối
                </button>
                <button
                  className="modal-button"
                  onClick={() => handleAccept(entity.id)}
                >
                  Chấp nhận
                </button>
              </>
            )}
            <FaTimes className="modal-close" onClick={closeDetailModal} />
          </div>
        </div>
      )}
      {isModifyOpen && (
        <Modify
          fields={fields}
          entity={entity}
          closeModifyModal={closeModify}
          handleSubmit={handleUpdate}
        />
      )}
      {isConfirmModal && (
        <ConfirmModal
          type="DELETE"
          closeConfirmModal={closeConfirmModal}
          closeModifyModal={null}
          deleteFunction={handleDelete}
        />
      )}
    </div>
  );
};

export default AppointmentDetail;
