import React, { useEffect, useState } from "react";
import { useFetchData } from "../../../components/hooks/useFethData";
import { AppDispatch, RootState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { getDepartments } from "../../../redux/actions/department-actions";
import {
  DoctorRequest,
  createDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
} from "../../../redux/actions/doctor-actions";
import { find } from "../../../components/utils/find";
import "./AdminDoctor.scss";
import { IoIosAddCircle } from "react-icons/io";
import Overview from "../../../components/common/Overview";
import { Field, InitField } from "../../../components/common/interfaces";
import { useModal } from "../../../components/hooks/useModal";
import Create from "../../../components/common/Create";
import { setUser } from "../../../redux/features/displayUserSlice";
const AdminDoctor = () => {
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return Promise.all([dispatch(getDepartments()), dispatch(getDoctors())]);
  });
  const departments = useSelector(
    (state: RootState) => state.department.departments
  );
  const {
    isModalOpen: isOpenCreateModal,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();
  const [doctorName, setDoctorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const doctorsState = useSelector((state: RootState) => state.doctor.doctors);
  const [doctors, setDoctors] = useState(doctorsState);
  console.log(doctors);
  const fields: Field[] = [
    {
      fieldName: "name",
      fieldDisplay: "Họ tên",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "departmentName",
      fieldDisplay: "Chuyên khoa",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: departments,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "departmentId",
      fieldDisplay: "Chuyên khoa",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "address",
      fieldDisplay: "Địa chỉ",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "birthday",
      fieldDisplay: "Ngày sinh",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "dateday",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "phoneNumber",
      fieldDisplay: "Số điện thoại",
      overviewDisplay: false,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: true,
    },
    {
      fieldName: "gender",
      fieldDisplay: "Giới tính",
      overviewDisplay: false,
      detailDisplay: false,
      modifyDisplay: true,
      choosen: null,
      type: "select",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "image",
      fieldDisplay: "",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: true,
      choosen: null,
      type: "image",
      viewDetail: null,
      needValidated: false,
    },
    {
      fieldName: "rating",
      fieldDisplay: "Đánh giá",
      overviewDisplay: true,
      detailDisplay: true,
      modifyDisplay: false,
      choosen: null,
      type: "text",
      viewDetail: null,
      needValidated: false,
    },
  ];
  const initFields: InitField[] = [
    {
      fieldName: "gender",
      fieldValue: "MALE",
    },
  ];
  const handleDelete = async (id: string) => {
    await dispatch(deleteDoctor(id));
  };
  useEffect(() => {
    setDoctors(doctorsState);
  }, [doctorsState]);
  const handleChangeName = (e: any) => {
    setDoctorName(e.target.value);
    setDoctors(
      find(
        {
          field: "name",
          condition: e.target.value.trim(),
        },
        doctorsState
      )
    );
  };
  const handleChangePhone = (e: any) => {
    setPhoneNumber(e.target.value);
    setDoctors(
      find(
        {
          field: "phoneNumber",
          condition: e.target.value.trim(),
        },
        doctorsState
      )
    );
  };
  const handleSubmit = async (data: { id: string; value: any }) => {
    await dispatch(updateDoctor(data));
  };
  const handleCreate = async (data: any) => {
    await dispatch(createDoctor(data));
  };
  const renderDoctors = () => {
    return doctors.map((doctor) => {
      return (
        <Overview
          fields={fields}
          entity={doctor}
          handleDelete={() => handleDelete(doctor.id)}
          openDetailEdit={true}
          handleSubmit={handleSubmit}
        />
      );
    });
  };

  return (
    <div className="doctors">
      <div className="doctors-input-container">
        <input
          type="text"
          name="doctorName"
          id=""
          value={doctorName}
          placeholder="Tìm kiếm theo tên"
          className="modal-input doctors-input"
          onChange={(e) => handleChangeName(e)}
        />
        <input
          type="text"
          name="phoneNumber"
          id=""
          value={phoneNumber}
          placeholder="Tìm kiếm theo số điện thoại"
          className="modal-input doctors-input"
          onChange={(e) => handleChangePhone(e)}
        />
      </div>
      <div className="doctors-create create-button" onClick={openCreateModal}>
        <IoIosAddCircle />
      </div>
      {isFetched && (
        <>
          <ul className="doctor-list">{renderDoctors()}</ul>
        </>
      )}
      {isOpenCreateModal && (
        <Create
          fields={fields}
          handleSubmit={handleCreate}
          closeCreateModal={closeCreateModal}
          initFields={initFields}
        />
      )}
    </div>
  );
};

export default AdminDoctor;
