import React from "react";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import UserTop from "../../../components/common/UserTop";
import { AppDispatch, RootState } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useFetchData } from "../../../components/hooks/useFethData";
import { getPatient } from "../../../redux/actions/patient-actions";
import { getDoctors } from "../../../redux/actions/doctor-actions";

const PatientLayout = () => {
  const user = useSelector((state: RootState) => state.user.user!);
  const dispatch: AppDispatch = useDispatch();
  const isFetched = useFetchData(() => {
    return Promise.all([dispatch(getPatient(user.id)), dispatch(getDoctors())]);
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

export default PatientLayout;
