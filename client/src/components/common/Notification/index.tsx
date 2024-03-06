import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Alert } from "@mui/material";
import { RootState } from "../../../redux";
// Adjust the path accordingly
import "./Notification.scss";
const Notification = () => {
  const noti = useSelector((state: RootState) => state.notification.value);

  return (
    <>
      {noti !== " " && (
        <div className="notification">
          {noti === "error" ? (
            <Alert severity="error">Thất bại!</Alert>
          ) : (
            <Alert severity="success">Thành công!</Alert>
          )}
        </div>
      )}
    </>
  );
};

export default Notification;
