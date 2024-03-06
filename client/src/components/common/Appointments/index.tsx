import React, { useEffect, useState } from "react";
import { useFetchData } from "../../hooks/useFethData";
import { AppDispatch, RootState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import {
  createAppointment,
  getAppointmentsOfDoctor,
  getAppointmentsOfPatient,
} from "../../../redux/actions/appointment-actions";
import { getDoctors } from "../../../redux/actions/doctor-actions";
import Appointment from "../Appointment";
import "../Surgeries/Surgeries.scss";
import "./Appointments.scss";
import { Field, InitField } from "../interfaces";
import { useModal } from "../../hooks/useModal";
import Create from "../Create";
import { IoIosAddCircle } from "react-icons/io";
import ViewDetail from "../ViewDetail";
interface AppointmentsProps {
  role: "DOCTOR" | "PATIENT";
}
const Appointments: React.FC<AppointmentsProps> = ({ role }) => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    if (role === "DOCTOR") return dispatch(getAppointmentsOfDoctor());
    else
      return Promise.all([
        dispatch(getAppointmentsOfPatient()),
        dispatch(getDoctors()),
      ]);
  });
  const user = useSelector((state: RootState) => state.user.user);
  const [type, setType] = useState("ACCEPT");
  const doctors =
    role === "PATIENT"
      ? useSelector((state: RootState) => state.doctor.doctors)
      : [];
  const appointments =
    role === "DOCTOR"
      ? useSelector((state: RootState) => state.appointment.doctorAppointments)
      : useSelector(
          (state: RootState) => state.appointment.patientAppointments
        );
  const [filteredAppointments, setFilteredAppointments] = useState(
    appointments.filter((app) => app.status === "ACCEPT")
  );
  const createFields: Field[] = [
    {
      fieldName: "doctorName",
      fieldDisplay: "Bác sĩ",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: role === "PATIENT" ? doctors : null,
      type: "text",
      viewDetail: null,
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
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "patientId",
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
      fieldName: "status",
      fieldDisplay: "Trạng thái",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "note",
      fieldDisplay: "Ghi chú",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
  ];
  const fields: Field[] = [
    {
      fieldName: "doctorName",
      fieldDisplay: "Bác sĩ",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: false,
      choosen: role === "PATIENT" ? doctors : null,
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
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: ({ doctorId, patientId }) => {
        return <ViewDetail patientId={patientId} doctorId={null} />;
      },
      needValidated: false,
    },
    {
      fieldName: "patientId",
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
      fieldName: "status",
      fieldDisplay: "Trạng thái",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "note",
      fieldDisplay: "Ghi chú",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
  ];
  const {
    isModalOpen: isOpenCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const initFields: InitField[] = [
    {
      fieldName: "patientId",
      fieldValue: user!.id,
    },
    {
      fieldName: "patientName",
      fieldValue: user!.name,
    },
  ];
  useEffect(() => {
    setFilteredAppointments(appointments.filter((app) => app.status === type));
  }, []);
  useEffect(() => {
    setFilteredAppointments(appointments.filter((app) => app.status === type));
  }, [appointments]);
  const handleClick = (type: any) => {
    if (type === "ACCEPT") {
      setType("ACCEPT");
      setFilteredAppointments(
        appointments.filter((appointment) => appointment.status === "ACCEPT")
      );
    }

    if (type === "REJECT") {
      setType("REJECT");
      setFilteredAppointments(
        appointments.filter((appointment) => appointment.status === "REJECT")
      );
    }

    if (type === "PENDING") {
      setType("PENDING");
      setFilteredAppointments(
        appointments.filter((appointment) => appointment.status === "PENDING")
      );
    }
  };
  const renderAppointments = () => {
    return filteredAppointments.map((appointment) => {
      return <Appointment fields={fields} entity={appointment} role={role} />;
    });
  };
  const handleCreate = async (data) => {
    await dispatch(createAppointment(data));
  };
  return (
    <div className="page-index">
      <ul className="surgeries-top-list list-filter">
        <li
          className={`surgeries-top-item ${type === "ACCEPT" ? "actived" : ""}`}
          onClick={() => handleClick("ACCEPT")}
        >
          Sắp tới
        </li>
        <li
          className={`surgeries-top-item ${
            type === "PENDING" ? "actived" : ""
          }`}
          onClick={() => handleClick("PENDING")}
        >
          Chờ chấp nhận
        </li>
        {role === "PATIENT" && (
          <li
            className={`surgeries-top-item ${
              type === "REJECT" ? "actived" : ""
            }`}
            onClick={() => handleClick("REJECT")}
          >
            Bị từ chối
          </li>
        )}
      </ul>
      <ul className="appointments layout">
        {isFetched && renderAppointments()}
      </ul>
      {role === "PATIENT" && (
        <div className="doctors-create create-button" onClick={openCreateModal}>
          <IoIosAddCircle />
        </div>
      )}
      {isOpenCreateModal && (
        <Create
          fields={createFields}
          handleSubmit={handleCreate}
          closeCreateModal={closeCreateModal}
          initFields={initFields}
        />
      )}
    </div>
  );
};

export default Appointments;
