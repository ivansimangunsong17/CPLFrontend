// src/components/Sidebar.jsx
import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LogoCPLLogin from "../assets/LogoCPLLogin.png";
import LogoUnila from "../assets/LogoUnila.png";
import { IoHomeOutline } from "react-icons/io5";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { FaRegFileAlt, FaUsers, FaUserGraduate } from "react-icons/fa";
import { BsClipboardData } from "react-icons/bs";
import { MdSchool, MdOutlineSubject } from "react-icons/md";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, roles, logout } = useContext(AuthContext);
    const [openDropdown, setOpenDropdown] = useState({});
    const role = roles?.[0]?.toLowerCase().replace(/\s+/g, "_") || "guest";

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const toggleDropdown = (menu) => {
        setOpenDropdown((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    // Function to check if a menu item should be active
    const isMenuActive = (path) => {
        // Special cases for "Hasil Perhitungan" - should be active on detail pages too
        if (path === "/dashboard/admin_universitas/hasil_perhitungan") {
            return location.pathname === path ||
                location.pathname.startsWith("/dashboard/admin_universitas/detail_prodi");
        }

        if (path === "/dashboard/admin_prodi/hasil_perhitungan") {
            return location.pathname === path ||
                location.pathname.startsWith("/dashboard/admin_prodi/detail_prodi");
        }

        // Special case for "Data Mata Kuliah" - should be active on mata kuliah detail pages
        if (path === "/dashboard/admin_prodi/data_matakuliah") {
            return location.pathname === path ||
                location.pathname.startsWith("/dashboard/admin_prodi/detail_matakuliah");
        }

        if (path === "/dashboard/kaprodi/hasil_perhitungan") {
            return location.pathname === path ||
                location.pathname.startsWith("/dashboard/kaprodi/detail_prodi");
        }

        if (path === "/dashboard/dosen/hasil_perhitungan") {
            return location.pathname === path ||
                location.pathname.startsWith("/dashboard/dosen/detail_");
        }

        // For other paths, use exact match
        return location.pathname === path;
    };

    const menuItems = {
        admin_universitas: [
            { label: "Dashboard", path: "/dashboard/admin_universitas", icon: <IoHomeOutline /> },
            {
                label: "Data Master",
                icon: <FaRegFileAlt />,
                children: [
                    { label: "Data Akun", path: "/dashboard/admin_universitas/data_akun", icon: <FaUsers /> },
                    { label: "Data Program Studi", path: "/dashboard/admin_universitas/data_prodi", icon: <MdOutlineSubject /> },
                ],
            },
            { label: "Hasil Perhitungan", path: "/dashboard/admin_universitas/hasil_perhitungan", icon: <BsClipboardData /> },
        ],
        admin_prodi: [
            { label: "Dashboard", path: "/dashboard/admin_prodi", icon: <IoHomeOutline /> },
            {
                label: "Data Master",
                icon: <FaRegFileAlt />,
                children: [
                    { label: "Data Akun", path: "/dashboard/admin_prodi/data_akun", icon: <FaUsers /> },
                    { label: "Data Mahasiswa", path: "/dashboard/admin_prodi/data_mahasiswa", icon: <FaUserGraduate /> },
                    { label: "Data Mata Kuliah", path: "/dashboard/admin_prodi/data_matakuliah", icon: <MdOutlineSubject /> },
                    { label: "Data CPL", path: "/dashboard/admin_prodi/data_cpl", icon: <MdSchool /> },
                ],
            },
            { label: "Pemetaan", path: "/dashboard/admin_prodi/pemetaan_cpl", icon: <MdOutlineSubject /> },
            { label: "Hasil Perhitungan", path: "/dashboard/admin_prodi/hasil_perhitungan", icon: <BsClipboardData /> },
        ],
        kaprodi: [
            { label: "Dashboard", path: "/dashboard/kaprodi", icon: <IoHomeOutline /> },
            {
                label: "Data Master",
                icon: <FaRegFileAlt />,
                children: [
                    { label: "Data Mahasiswa", path: "/dashboard/kaprodi/data_mahasiswa", icon: <FaUserGraduate /> },
                    { label: "Data Mata Kuliah", path: "/dashboard/kaprodi/data_matakuliah", icon: <MdOutlineSubject /> },
                    { label: "Data Program Studi", path: "/dashboard/kaprodi/data_prodi", icon: <MdSchool /> },
                ],
            },
            {
                label: "Pemetaan",
                icon: <MdOutlineSubject />,
                children: [
                    { label: "Pemetaan CPL", path: "/dashboard/kaprodi/pemetaan_cpl", icon: <MdOutlineSubject /> },
                    { label: "Pemetaan CPMK", path: "/dashboard/kaprodi/pemetaan_cpmk", icon: <MdOutlineSubject /> },
                ],
            },
            { label: "Hasil Perhitungan", path: "/dashboard/kaprodi/hasil_perhitungan", icon: <BsClipboardData /> },
        ],
        dosen: [
            { label: "Dashboard", path: "/dashboard/dosen", icon: <IoHomeOutline /> },
            { label: "Input Nilai", path: "/dashboard/dosen/input_nilai", icon: <BsClipboardData /> },
            { label: "Hasil Perhitungan", path: "/dashboard/dosen/hasil_perhitungan", icon: <BsClipboardData /> },
        ],
    };

    // Auto-open dropdown that contains the active menu
    useEffect(() => {
        const currentMenuItems = menuItems[role] || [];
        currentMenuItems.forEach((item) => {
            if (item.children) {
                const hasActiveChild = item.children.some((child) => isMenuActive(child.path));
                if (hasActiveChild && !openDropdown[item.label]) {
                    setOpenDropdown((prev) => ({
                        ...prev,
                        [item.label]: true,
                    }));
                }
            }
        });
    }, [location.pathname, role]);

    return (
        <aside className="w-[260px] h-screen bg-white shadow-xl flex flex-col fixed">
            {/* Header Logo */}
            <div className="p-5 flex items-center gap-3 border-b border-gray-200">
                <img src={LogoCPLLogin} alt="Logo CPL" className="w-8 h-8" />
                <h1 className="text-sm font-bold text-gray-800 leading-5">
                    Sistem Perhitungan CPL
                </h1>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-gray-200">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 border bg-gray-100 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>

            {/* Menu Navigasi */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
                <nav>
                    <ul className="space-y-2">
                        {menuItems[role]?.length ? (
                            menuItems[role].map((item) => (
                                <li key={item.label}>
                                    {item.children ? (
                                        <div>
                                            <button
                                                onClick={() => toggleDropdown(item.label)}
                                                className="flex justify-between items-center w-full text-sm text-gray-700 hover:text-blue-500 px-2 py-2 rounded-lg"
                                            >
                                                <span className="flex items-center space-x-2">
                                                    {item.icon}
                                                    <span>{item.label}</span>
                                                </span>
                                                <FiChevronDown
                                                    className={`transform transition-transform duration-200 ${openDropdown[item.label] ? "rotate-180" : ""}`}
                                                />
                                            </button>
                                            {openDropdown[item.label] && (
                                                <ul className="ml-6 mt-1 space-y-1">
                                                    {item.children.map((child) => (
                                                        <li key={child.label}>
                                                            <NavLink
                                                                to={child.path}
                                                                className={() => {
                                                                    const isActive = isMenuActive(child.path);
                                                                    return `flex items-center gap-2 p-2 rounded-md text-sm transition ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:text-blue-500"}`;
                                                                }}
                                                            >
                                                                {child.icon}
                                                                {child.label}
                                                            </NavLink>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ) : (
                                        <NavLink
                                            to={item.path}
                                            className={() => {
                                                const isActive = isMenuActive(item.path);
                                                return `flex items-center gap-2 p-2 rounded-md text-sm transition ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:text-blue-500"}`;
                                            }}
                                        >
                                            {item.icon}
                                            {item.label}
                                        </NavLink>
                                    )}
                                </li>
                            ))
                        ) : (
                            <li>
                                <p className="text-red-500 text-sm">Role tidak dikenali</p>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            {/* Footer (User Info) */}
            <div className="p-4 bg-gray-100 border-t border-gray-200">
                <div className="flex items-center justify-between gap-3">
                    <img src={LogoUnila} alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                        <p className="font-semibold text-sm capitalize">
                            {user?.name || role.replace("_", " ")}
                        </p>
                        <p className="text-xs text-gray-500">
                            {user?.email || `${role}@unila.ac.id`}
                        </p>
                    </div>
                    <button onClick={handleLogout} className="text-gray-600 hover:text-blue-600 transition">
                        <FiLogOut />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
