import React from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux";
import UserTop from "../../../components/common/UserTop";
import { useFetchData } from "../../../components/hooks/useFethData";
import { getDoctor } from "../../../redux/actions/doctor-actions";
import { getPatients } from "../../../redux/actions/patient-actions";

const DoctorLayout = () => {
  const user = useSelector((state: RootState) => state.user.user!);
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return Promise.all([dispatch(getDoctor(user.id)), dispatch(getPatients())]);
  });
  return (
    <>
      {isFetched && (
        <>
          <UserTop user={user} managePage={true} />
          <Sidebar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default DoctorLayout;
