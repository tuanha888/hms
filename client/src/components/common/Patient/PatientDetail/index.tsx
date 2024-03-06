import { ReactNode } from "react";
import { useModal } from "../../../hooks/useModal";
import "../../Detail/Detail.scss";
import { Field, InitField } from "../../interfaces";
import { FaTimes } from "react-icons/fa";
import Modify from "../../Modify";
import ConfirmModal from "../../ConfirmModal";
import "./PatientDetail.scss";
import Prescriptions from "../../Prescriptions";
import MedicalRecords from "../../MedicalRecords";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux";
import Create from "../../Create";
import { medicalRecordFields } from "../../../utils/constants";
import CreatePrescription from "../../CreatePrescription";
import { createMedicalRecord } from "../../../../redux/actions/medicalRecord-actions";
import { Patient } from "../../../../redux/features/patientSlice";
import { updatePatient } from "../../../../redux/actions/patient-actions";
interface DetailProps {
  fields: Field[];
  entity: any;
  closeDetailModal: Function;
  handleDelete: Function;
  openDetailEdit: boolean;
  handleSubmit: Function;
  id: string | null;
}
const PatientDetail: React.FC<DetailProps> = ({
  fields,
  entity,
  closeDetailModal,
  handleDelete,
  openDetailEdit,
  id,
}) => {
  const {
    isModalOpen: isModifyOpen,
    openModal: openModify,
    closeModal: closeModify,
  } = useModal();
  const user = useSelector((state: RootState) => state.user.user) as any;
  const {
    isModalOpen: isConfirmModal,
    openModal: openConfirmModal,
    closeModal: closeConfirmModal,
  } = useModal();
  const {
    isModalOpen: isPrescriptionModal,
    openModal: openPrescriptionModal,
    closeModal: closePrescriptinModal,
  } = useModal();
  const {
    isModalOpen: isMedicalRecordModal,
    openModal: openMedicalRecordModal,
    closeModal: closeMedicalRecordModal,
  } = useModal();
  const {
    isModalOpen: isOpenAddMR,
    closeModal: closeAddMR,
    openModal: openAddMR,
  } = useModal();
  const {
    isModalOpen: isOpenAddPrescription,
    closeModal: closeAddPrescription,
    openModal: openAddPrescription,
  } = useModal();
  const dispatch: AppDispatch = useDispatch();
  const initMedicalRecordFields: InitField[] = [
    {
      fieldName: "patientId",
      fieldValue: entity.id,
    },
    {
      fieldName: "departmentId",
      fieldValue: user.departmentId,
    },
    {
      fieldName: "stayType",
      fieldValue: "STAY",
    },
  ];
  console.log(
    entity.birthday.toLocaleDateString("vi", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  );
  entity =
    !entity && id !== null
      ? useSelector((state: RootState) =>
          state.patient.patients.filter((patient) => patient.id === id)
        )[0]
      : entity;
  const renderEntity = () => {
    const render: ReactNode[] = [];
    fields.forEach((field) => {
      if (field.detailDisplay)
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
  const handleAddMR = async (data: any) => {
    await dispatch(createMedicalRecord(data));
  };
  const handleModifyPatient = async (data: { id: string; value: Patient }) => {
    await dispatch(updatePatient(data));
  };
  const handleDeletePatient = async () => {
    await handleDelete(entity.id);
  };
  return (
    <div className="detail modal-container">
      {!isModifyOpen && (
        <div className="modal-wrapper">
          <div className="detail-modal modal">
            {renderEntity()}
            {openDetailEdit && (
              <div className="patient-button-container">
                <button
                  className="modal-button patient-button"
                  onClick={openModify}
                >
                  Sửa
                </button>
                <button
                  className="modal-button patient-button"
                  onClick={openAddMR}
                >
                  Thêm bệnh án
                </button>
                <button
                  className="modal-button patient-button"
                  onClick={openAddPrescription}
                >
                  Thêm đơn thuốc
                </button>
                <button
                  className="modal-button patient-button"
                  onClick={openMedicalRecordModal}
                >
                  Xem bệnh án
                </button>
                <button
                  className="modal-button patient-button"
                  onClick={openPrescriptionModal}
                >
                  Xem đơn thuốc
                </button>
              </div>
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
          handleSubmit={handleModifyPatient}
        />
      )}
      {isConfirmModal && (
        <ConfirmModal
          type="DELETE"
          closeConfirmModal={closeConfirmModal}
          closeModifyModal={null}
          deleteFunction={handleDeletePatient}
        />
      )}
      {isPrescriptionModal && (
        <div className="modal-container">
          <div className="modal-wrapper">
            <div className="modal">
              <Prescriptions id={entity.id} isMargin={false} />
              <FaTimes
                className="modal-close"
                onClick={closePrescriptinModal}
              />
            </div>
          </div>
        </div>
      )}
      {isMedicalRecordModal && (
        <div className="modal-container">
          <div className="modal-wrapper">
            <div className="modal">
              <MedicalRecords id={entity.id} />
              <FaTimes
                className="modal-close"
                onClick={closeMedicalRecordModal}
              />
            </div>
          </div>
        </div>
      )}
      {isOpenAddMR && (
        <Create
          fields={medicalRecordFields}
          initFields={initMedicalRecordFields}
          handleSubmit={handleAddMR}
          closeCreateModal={closeAddMR}
        />
      )}
      {isOpenAddPrescription && (
        <CreatePrescription
          patient={entity}
          closeCreateModal={closeAddPrescription}
        />
      )}
    </div>
  );
};

export default PatientDetail;
