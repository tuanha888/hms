import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import { useModal } from "../../hooks/useModal";
import PatientDetail from "../Patient/PatientDetail";
import { doctorFields, patientFields } from "../../utils/constants";
import DoctorDetail from "../Doctors/DoctorDetail";
import {
  DoctorRequest,
  deleteDoctor,
  updateDoctor,
} from "../../../redux/actions/doctor-actions";
import { Doctor } from "../../../redux/features/doctorSlice";
import {
  deletePatient,
  updatePatient,
} from "../../../redux/actions/patient-actions";
import { Patient } from "../../../redux/features/patientSlice";
import "./ViewDetail.scss";
interface ViewDetailProps {
  patientId: string | null;
  doctorId: string | null;
}
const ViewDetail: React.FC<ViewDetailProps> = ({ patientId, doctorId }) => {
  const entity =
    patientId !== null
      ? useSelector((state: RootState) =>
          state.patient.patients.filter((patient) => patient.id === patientId)
        )[0]
      : useSelector((state: RootState) =>
          state.doctor.doctors.filter((doctor) => doctor.id === doctorId)
        )[0];
  console.log(entity);
  const user = useSelector((state: RootState) => state.user.user);
  const { isModalOpen, closeModal, openModal } = useModal();
  const dispatch: AppDispatch = useDispatch();
  const handleDeleteDoctor = async (id: string) => {
    await dispatch(deleteDoctor(id));
  };
  const handleUpdateDoctor = async (data: {
    id: string;
    value: DoctorRequest;
  }) => {
    await dispatch(updateDoctor(data));
  };
  const handleDeletePatient = async (id: string) => {
    await dispatch(deletePatient(id));
  };
  const handleUpdatePatient = async (data: { id: string; value: Patient }) => {
    await dispatch(updatePatient(data));
  };
  return (
    <>
      <span onClick={openModal} className="view-detail">
        {entity?.name}
      </span>
      {isModalOpen && patientId !== null && (
        <PatientDetail
          entity={entity}
          fields={patientFields}
          id={null}
          closeDetailModal={closeModal}
          handleDelete={handleDeleteDoctor}
          openDetailEdit={user!.role === "DOCTOR" ? true : false}
          handleSubmit={handleUpdateDoctor}
        />
      )}
      {isModalOpen && doctorId !== null && (
        <DoctorDetail
          fields={doctorFields}
          entity={entity}
          closeDetailModal={closeModal}
          id={null}
          handleDelete={handleDeletePatient}
          handleSubmit={handleUpdatePatient}
        />
      )}
    </>
  );
};

export default ViewDetail;
