import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { Navigate } from "react-router-dom";
import React, { ReactElement } from "react";
import Authorization from "../Authorization";
interface ProtectedProps {
  element: ReactElement;
}
const Protected: React.FC<ProtectedProps> = ({ element }) => {
  const user = useSelector((state: RootState) => state.user.user);
  if (!user) return <Navigate to="/" />;
  return <Authorization element={element} />;
};

export default Protected;
