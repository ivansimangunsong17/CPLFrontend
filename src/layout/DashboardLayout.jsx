import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import DebugInfo from "../components/DebugInfo";
import DebugLogger from "../components/DebugLogger";

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="flex h-screen">
            <Sidebar role={user?.role} />

            <div className="flex-1 ml-[260px]">
                <Navbar />
                <div className="p-4 overflow-y-auto pt-16">
                    <Outlet />
                </div>
                <DebugInfo />
                <DebugLogger />
            </div>
        </div>
    );
};

export default DashboardLayout;
