import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    // if user exists display child component(pic, etc..) or else navigate to sign-in page
    currentUser ? <Outlet /> : <Navigate to="/sign-in" />
  );
}
