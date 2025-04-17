import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ Impor dengan benar

const DashboardLanding = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // ✅ Gunakan dengan benar

    // Mencegah navigasi sebelum user dimuat
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser && !user) {
            // Jika ada user tersimpan, set user dari localStorage
            navigate("/login");
        }
    }, [user, navigate]);

    // Tentukan path tujuan berdasarkan role
    const rolePath = useMemo(() => {
        if (!user) return "/login";
        const paths = {
            admin_universitas: "/dashboard/admin_universitas",
            admin_prodi: "/dashboard/admin_prodi",
            kaprodi: "/dashboard/kaprodi",
            dosen: "/dashboard/dosen",
        };
        return paths[user.role] || "/login";
    }, [user]);

    // Navigasi hanya jika user sudah dimuat
    useEffect(() => {
        if (user) {
            navigate(rolePath);
        }
    }, [user, rolePath, navigate]);

    return <p>Loading...</p>;
};

export default DashboardLanding;
