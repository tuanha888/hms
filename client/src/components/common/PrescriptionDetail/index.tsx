import React, { useState } from "react";
import { Field, InitField } from "../interfaces";
import { Prescription } from "../../../redux/features/prescriptionSlice";
import Medicine from "../Medicine";
import { useModal } from "../../hooks/useModal";
import { v4 as uuidv4 } from "uuid";
import { FaTimes } from "react-icons/fa";
import Modify from "../Modify";
import Create from "../Create";
import {
  deletePrescription,
  updatePrescription,
} from "../../../redux/actions/prescription-actions";
import { AppDispatch } from "../../../redux";
import { useDispatch } from "react-redux";
import ConfirmModal from "../ConfirmModal";
import ViewDetail from "../ViewDetail";

interface PrescriptionDetailProps {
  prescription: Prescription;
  closeDetailModal: Function;
  openDetailEdit: boolean;
}
const PrescriptionDetail: React.FC<PrescriptionDetailProps> = ({
  prescription: pres,
  closeDetailModal,
  openDetailEdit,
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
  const {
    isModalOpen: isAddMed,
    closeModal: closeAddMed,
    openModal: openAddMed,
  } = useModal();
  const dispatch: AppDispatch = useDispatch();
  const medFields: Field[] = [
    {
      fieldName: "name",
      fieldDisplay: "Tên",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "quantity",
      fieldDisplay: "Số lượng",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "breakfast",
      fieldDisplay: "Sáng",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "beforeBreakfast",
      fieldDisplay: "Trước ăn",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "boolean",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "lunch",
      fieldDisplay: "Trưa",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "beforeLunch",
      fieldDisplay: "Trước ăn",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "boolean",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "dinner",
      fieldDisplay: "Tối",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "beforeDinner",
      fieldDisplay: "Trước ăn",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "boolean",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "prescriptionId",
      fieldDisplay: "Trước ăn",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: null,
      type: "boolean",
      viewDetail: null,
    },
  ];
  const [prescription, setPres] = useState({
    patientId: pres.patientId,
    note: pres.note,
    createdDay: pres.createdDay,
    medicines: pres.medicines,
  });
  const handleModify = async ({ id, value }) => {
    await setPres((prevState) => ({
      ...prevState,
      note: value.note,
    }));
    await dispatch(updatePrescription({ id: id, value: prescription }));
  };
  const handleAddMed = (values) => {
    setPres((prevState) => {
      const medicines = [...prevState.medicines, values];
      return {
        ...prevState,
        medicines,
      };
    });
  };
  const handleDelete = async () => {
    await dispatch(deletePrescription(pres.id));
  };
  const fields: Field[] = [
    {
      fieldName: "note",
      fieldDisplay: "Ghi chú",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: true,
      choosen: null,
      type: "textarea",
      viewDetail: null,
    },
  ];
  const initFields: InitField[] = [
    {
      fieldName: "id",
      fieldValue: uuidv4(),
    },
    {
      fieldName: "prescriptionId",
      fieldValue: pres.id,
    },
  ];
  const renderMedicines = () => {
    return prescription.medicines.map((medicine) => {
      return (
        <Medicine
          medicine={medicine}
          openEdit={openDetailEdit}
          setPres={setPres}
          isOverview={false}
        />
      );
    });
  };
  return (
    <>
      <div className="modal-container">
        <div className="modal-wrapper">
          <div className="modal">
            {openDetailEdit && (
              <p className="modal-item overview-item">
                <span className="modal-field overview-field">Bệnh nhân:</span>{" "}
                <span>{pres.patientName}</span>
              </p>
            )}
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">Bác sĩ:</span>{" "}
              <ViewDetail doctorId={pres.doctorId} patientId={null} />
            </p>
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">Ngày tạo:</span>{" "}
              <span>
                {prescription.createdDay.toLocaleDateString("vi", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
            </p>
            <ul className="medicines">{renderMedicines()}</ul>
            {openDetailEdit && (
              <button className="modal-button" onClick={openAddMed}>
                Thêm thuốc
              </button>
            )}
            <p className="modal-item overview-item">
              <span className="modal-field overview-field">Lưu ý:</span>{" "}
              <span>{prescription.note}</span>
            </p>
            <FaTimes className="modal-close" onClick={closeDetailModal} />
            {openDetailEdit && (
              <>
                <button className="modal-button" onClick={openModify}>
                  Thay đổi
                </button>
                <button className="modal-button" onClick={openConfirmModal}>
                  Xóa
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {isModifyOpen && (
        <Modify
          fields={fields}
          handleSubmit={handleModify}
          entity={pres}
          closeModifyModal={closeModify}
        />
      )}
      {isAddMed && (
        <Create
          fields={medFields}
          initFields={initFields}
          closeCreateModal={closeAddMed}
          handleSubmit={handleAddMed}
        />
      )}
      {isConfirmModal && (
        <ConfirmModal
          type={"DELETE"}
          closeConfirmModal={closeConfirmModal}
          closeModifyModal={null}
          deleteFunction={handleDelete}
        />
      )}
    </>
  );
};

export default PrescriptionDetail;
