import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
    const { user } = useAuth();

    if (user === null) {
        return <p>Loading...</p>;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
