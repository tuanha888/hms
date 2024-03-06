import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import Sidebar from "../Sidebar";
import { Outlet } from "react-router-dom";
import UserTop from "../../../components/common/UserTop";

const AdminLayout = () => {
  const user = useSelector((state: RootState) => state.user.user!);
  return (
    <div className="admin">
      <UserTop user={user} managePage={true} />
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
