import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import MainPage from "./pages/MainPage.jsx";
import ExitPage from "./pages/ExitPage.jsx";
import NotFound from "./pages/NotFound.jsx";


export default function AppRoutes() {
    return (
        <Routes>
            {/* Публичные */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Защищённые */}
            <Route element={<ProtectedRoute />}>
                <Route index element={<MainPage />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/task/new" element={<MainPage />} />
                <Route path="/task/:id" element={<MainPage />} />
                <Route path="/exit" element={<ExitPage />} />
            </Route>

            <Route path="/logout" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}