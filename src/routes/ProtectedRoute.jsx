import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
    const { isAuth } = useAuth();
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}