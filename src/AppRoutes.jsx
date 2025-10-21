import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import MainPage from "./pages/MainPage.jsx";
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
                <Route path="/exit" element={<MainPage />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}