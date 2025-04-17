import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import LogoCpl from "../assets/LogoCpl.png";
import LogoUnila from "../assets/LogoUnila.png";
import { IoHomeOutline } from "react-icons/io5";
import { FiChevronDown, FiLogOut } from "react-icons/fi";
import { FaRegFileAlt, FaUsers, FaUserGraduate } from "react-icons/fa";
import { BsClipboardData } from "react-icons/bs";
import { MdSchool, MdOutlineSubject } from "react-icons/md";

const Sidebar = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [openDropdown, setOpenDropdown] = useState({});
    const role = user?.role || "guest";

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const toggleDropdown = (menu) => {
        setOpenDropdown((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    const menuItems = {
        admin_universitas: [
            { label: "Dashboard", path: "/dashboard/admin_universitas", icon: <IoHomeOutline /> },
            {
                label: "Data Master",
                icon: <FaRegFileAlt />,
                children: [
                    { label: "Data Akun", path: "/dashboard/admin_universitas/data_akun", icon: <FaUsers /> },
                    { label: "Data Fakultas", path: "/dashboard/admin_universitas/data_fakultas", icon: <MdSchool /> },
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
                    { label: "Data Program Studi", path: "/dashboard/admin_prodi/data_prodi", icon: <MdSchool /> },
                ],
            },
            {
                label: "Pemetaan",
                icon: <MdOutlineSubject />,
                children: [
                    { label: "Pemetaan CPL", path: "/dashboard/admin_prodi/pemetaan_cpl", icon: <MdOutlineSubject /> },
                    { label: "Pemetaan CPMK", path: "/dashboard/admin_prodi/pemetaan_cpmk", icon: <MdOutlineSubject /> },
                ],
            },
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

    return (
        <aside className="w-[260px] h-screen bg-white shadow-xl flex flex-col fixed">
            <div className="p-5 flex items-center gap-3 border-b border-gray-200">
                <img src={LogoCpl} alt="Logo CPL" className="w-8 h-8" />
                <h1 className="text-sm font-bold text-gray-800 leading-5">
                    Sistem Perhitungan CPL
                </h1>
            </div>
            <div className="px-5 py-3 border-b border-gray-200">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-2 border bg-gray-100 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-3">
                <nav>
                    <ul className="space-y-2">
                        {menuItems[role]?.map((item) => (
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
                                                            className={({ isActive }) =>
                                                                `flex items-center gap-2 p-2 rounded-md text-sm transition ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:text-blue-500"}`
                                                            }
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
                                        end
                                        className={({ isActive }) =>
                                            `flex items-center gap-2 p-2 rounded-md text-sm transition ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:text-blue-500"}`
                                        }
                                    >
                                        {item.icon}
                                        {item.label}
                                    </NavLink>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="p-4 bg-gray-100 border-t border-gray-200">
                <div className="flex items-center justify-between gap-3">
                    <img src={LogoUnila} alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <div className="flex-1">
                        <p className="font-semibold text-sm capitalize">
                            {role.replace("_", " ")}
                        </p>
                        <p className="text-xs text-gray-500">{role}@unila.ac.id</p>
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
