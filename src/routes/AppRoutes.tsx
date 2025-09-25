import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Profile from "../pages/Profile/Profile";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import PublicRoute from "../components/PublicRoute/PublicRoute";
import { AlertCircleIcon } from "lucide-react"

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                <Route path="*" element={<div className="mt-4 rounded-md bg-red-50 p-3 border border-red-200">
                    <div className="flex items-center gap-2">
                        <AlertCircleIcon className="h-4 w-4 text-red-600" />
                        <span className="text-sm font-medium text-red-800">Página não encontrada.</span>
                    </div>
                </div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;