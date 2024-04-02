import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

export default function PrivateRoute() {
  const { user } = useContext(UserContext);

  return user ? <Outlet /> : <Navigate to="/login" />;
}
