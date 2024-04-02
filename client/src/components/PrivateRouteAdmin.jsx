import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";

export default function PrivateRouteAdmin() {
  const { user } = useContext(UserContext);

  return user ? (
    user.isAdmin ? (
      <Outlet />
    ) : (
      <Navigate to="/profile" />
    )
  ) : (
    <Navigate to="/login" />
  );
}
