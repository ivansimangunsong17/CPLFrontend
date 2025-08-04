// src/routes/PrivateRoutes.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../components/LoadingScreen";

const PrivateRoutes = ({ allowedRoles }) => {
    const { user, roles, loading } = useAuth();
    const location = useLocation();

    if (loading) return <LoadingScreen />;

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const userRole = roles?.[0]?.toLowerCase().replace(/\s+/g, "_");

    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default PrivateRoutes;


