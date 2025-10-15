import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import Layout from "./pages/Layout.jsx";
import Board from "./pages/Board.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TaskCreate from "./pages/TaskCreate.jsx";
import TaskView from "./pages/TaskView.jsx";
import TaskEdit from "./pages/TaskEdit.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function AppRoutes(){
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            <Route element={<ProtectedRoute/>}>
                <Route element={<Layout/>}>
                    <Route index element={<Board/>}/>
                    <Route path="/" element={<Board/>}/>
                    <Route path="/task/new" element={<TaskCreate/>}/>
                    <Route path="/task/:id" element={<TaskView/>}/>
                    <Route path="/task/:id/edit" element={<TaskEdit/>}/>
                </Route>
            </Route>

            <Route path="/logout" element={<Navigate to="/login" replace/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
}
