import React, { ReactNode } from "react";
import { Field } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import Detail from "../Detail";
import "../Overview/Overview.scss";
import AppointmentDetail from "./AppointmentDetail";
interface AppoinmentProps {
  fields: Field[];
  entity: any;
  openDetailEdit: boolean;
  role: "DOCTOR" | "PATIENT";
}
const Appointment: React.FC<AppoinmentProps> = ({
  fields,
  entity,
  openDetailEdit,
  role,
}) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const renderEntity = () => {
    const render: ReactNode[] = [];
    fields.forEach((field) => {
      if (
        field.overviewDisplay &&
        ((role === "DOCTOR" && field.fieldName !== "doctorName") ||
          (role === "PATIENT" && field.fieldName !== "patientName"))
      )
        if (field.type !== "image")
          render.push(
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">
                {field.fieldDisplay}:
              </span>{" "}
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
    <>
      <li className="overview" onClick={openModal}>
        {renderEntity()}
      </li>
      {isModalOpen && (
        <AppointmentDetail
          fields={fields}
          entity={entity}
          closeDetailModal={closeModal}
          openDetailEdit={role === "DOCTOR" ? false : true}
          role={role}
        />
      )}
    </>
  );
};
export default Appointment;
