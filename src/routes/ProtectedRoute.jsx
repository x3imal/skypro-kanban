import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function ProtectedRoute() {
    const { isAuth } = useAuth();
    const location = useLocation();
    return isAuth ? <Outlet/> : <Navigate to="/login" replace state={{ from: location }} />;
}
