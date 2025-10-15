import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

import MainPage from "./pages/MainPage.jsx";
import ExitPage from "./pages/ExitPage.jsx";
import TaskView from "./pages/TaskView.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function AppRoutes(){
    return (
        <Routes>
            {/* Публичные */}
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            {/* Защищенные */}
            <Route element={<ProtectedRoute/>}>
                    <Route index element={<MainPage/>}/>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/task/:id" element={<TaskView/>}/>
                    <Route path="/exit" element={<ExitPage/>}/>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}
