import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Защищённый маршрут.
 * Проверяет авторизацию пользователя и перенаправляет на страницу входа при её отсутствии.
 *
 * @component
 * @returns {JSX.Element}
 */
export default function ProtectedRoute() {
    const { isAuth } = useAuth();
    const location = useLocation();

    if (!isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}