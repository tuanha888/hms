import React, { useState } from "react";
import { useFetchData } from "../../hooks/useFethData";
import { AppDispatch, RootState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import {
  SurgeryRequest,
  createSurgery,
  deleteSurgery,
  getSurgeries,
  updateSurgery,
} from "../../../redux/actions/surgery-actions";
import "./Surgeries.scss";
import Surgery from "../Surgery";
import { Field } from "../interfaces";
import { getDoctors } from "../../../redux/actions/doctor-actions";
import { getPatients } from "../../../redux/actions/patient-actions";
import Overview from "../Overview";
import { IoIosAddCircle } from "react-icons/io";
import Create from "../Create";
import { useModal } from "../../hooks/useModal";
import ViewDetail from "../ViewDetail";
interface SurgeriesProps {
  role: "ADMIN" | "DOCTOR";
}
const Surgeries: React.FC<SurgeriesProps> = ({ role }) => {
  const [type, setType] = useState("DAY");
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return Promise.all([
      dispatch(getSurgeries()),
      dispatch(getDoctors()),
      dispatch(getPatients()),
    ]);
  });
  const {
    isModalOpen: isOpenCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const user = useSelector((state: RootState) => state.user.user);
  const surgeries =
    role === "ADMIN"
      ? useSelector((state: RootState) => state.surgery.surgeries)
      : useSelector((state: RootState) =>
          state.surgery.surgeries.filter(
            (surgery) => surgery.doctorId === user!.id
          )
        );
  const doctors = useSelector((state: RootState) => state.doctor.doctors);
  const patients = useSelector((state: RootState) => state.patient.patients);
  const surgeriesToday = surgeries.filter((surgery) => {
    const surgeryDate = new Date(surgery.time);

    return (
      surgeryDate.getDate() === new Date().getDate() &&
      surgeryDate.getMonth() === new Date().getMonth() &&
      surgeryDate.getFullYear() === new Date().getFullYear()
    );
  });
  const handleDelete = async (id: string) => {
    await dispatch(deleteSurgery(id));
  };
  const handleSubmit = async (data: { id: string; value: SurgeryRequest }) => {
    await dispatch(updateSurgery(data));
  };
  const handleCreate = async (data: any) => {
    await dispatch(createSurgery(data));
  };
  const fields: Field[] = [
    {
      fieldName: "doctorName",
      fieldDisplay: "Bác sĩ",
      overviewDisplay: role === "DOCTOR" ? false : true,
      detailDisplay: role === "DOCTOR" ? false : true,
      modifyDisplay: true,
      choosen: doctors,
      type: "text",
      viewDetail: ({ doctorId, patientId }) => {
        return <ViewDetail doctorId={doctorId} patientId={null} />;
      },
      needValidated: true,
    },
    {
      fieldName: "doctorId",
      fieldDisplay: "Bác sĩ",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "patientName",
      fieldDisplay: "Bệnh nhân",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: patients,
      type: "text",
      viewDetail: ({ doctorId, patientId }) => {
        return <ViewDetail patientId={patientId} doctorId={null} />;
      },
      needValidated: true,
    },
    {
      fieldName: "patientId",
      fieldDisplay: "Bệnh nhân",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: patients,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "time",
      fieldDisplay: "Thời gian",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "datetime",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "content",
      fieldDisplay: "Nội dung",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "textarea",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "expectedTime",
      fieldDisplay: "Thời gian dự kiến",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
  ];
  const renderSurgeries = () => {
    const renderSurgeries = type === "DAY" ? surgeriesToday : surgeries;
    return renderSurgeries.map((surgery) => {
      return (
        <Overview
          fields={fields}
          entity={surgery}
          handleDelete={handleDelete}
          handleSubmit={handleSubmit}
          openDetailEdit={role === "ADMIN" ? true : false}
        />
      );
    });
  };
  return (
    <div className="surgeries">
      <ul className="surgeries-top-list">
        <li
          className={`surgeries-top-item ${type === "DAY" ? "actived" : ""}`}
          onClick={() => setType("DAY")}
        >
          Trong ngày
        </li>
        <li
          className={`surgeries-top-item ${type === "WEEK" ? "actived" : ""}`}
          onClick={() => setType("WEEK")}
        >
          Trong tuần
        </li>
      </ul>
      {role === "ADMIN" && (
        <div className="doctors-create create-button" onClick={openCreateModal}>
          <IoIosAddCircle />
        </div>
      )}
      {isFetched && <ul className="surgery-list">{renderSurgeries()}</ul>}
      {isOpenCreateModal && (
        <Create
          fields={fields}
          handleSubmit={handleCreate}
          closeCreateModal={closeCreateModal}
          initFields={[]}
        />
      )}
    </div>
  );
};

export default Surgeries;
