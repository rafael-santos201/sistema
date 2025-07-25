import { Navigate } from "react-router-dom";

export function PrivateRouteAdm({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token || role !== "adm") {
    return <Navigate to="/login" />;
  }

  return children;
}
