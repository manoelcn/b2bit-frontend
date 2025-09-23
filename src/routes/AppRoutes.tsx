import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;