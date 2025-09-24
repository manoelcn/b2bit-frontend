import React from "react";
import { Navigate } from "react-router-dom";
import { getTokens } from "../../services/api";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const tokens = getTokens();

    if (!tokens.access) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;