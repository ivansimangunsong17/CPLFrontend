import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    // Mapping path ke label halaman
    const pageTitles = {
        /* ================= ADMIN UNIVERSITAS ================= */
        "/dashboard/admin_universitas": "Dashboard",
        "/dashboard/admin_universitas/data_akun": "Data Akun",
        "/dashboard/admin_universitas/data_prodi": "Data Program Studi",
        "/dashboard/admin_universitas/hasil_perhitungan": "Hasil Perhitungan",

        /* ================= ADMIN PRODI ================= */
        "/dashboard/admin_prodi": "Dashboard",
        "/dashboard/admin_prodi/data_akun": "Data Akun",
        "/dashboard/admin_prodi/data_cpl": "Data Capaian Pembelajaran Lulusan",
        "/dashboard/admin_prodi/data_mahasiswa": "Data Mahasiswa",
        "/dashboard/admin_prodi/data_matakuliah": "Data Mata Kuliah",
        "/dashboard/admin_prodi/detail_matakuliah": "Detail Mata Kuliah",
        "/dashboard/admin_prodi/pemetaan_cpl": "Pemetaan CPL",
        "/dashboard/admin_prodi/detail_pemetaan": "Detail Pemetaan",
        "/dashboard/admin_prodi/detail_kelas": "Detail Kelas",
        "/dashboard/admin_prodi/hasil_perhitungan": "Hasil Perhitungan",
        "/dashboard/admin_prodi/atur_penilaian": "Atur Penilaian",
        "/dashboard/admin_prodi/detail_penilaian": "Detail Penilaian",
        "/dashboard/admin_prodi/detail_hasil_perhitungan": "Detail Hasil Perhitungan",
        "/dashboard/admin_prodi/detail_distribusi_matakuliah": "Detail Distribusi Mata Kuliah",
        "/dashboard/admin_prodi/detail_monitoring_mahasiswa": "Detail Monitoring Mahasiswa",

        /* ================= KAPRODI ================= */
        "/dashboard/kaprodi": "Dashboard",
        "/dashboard/kaprodi/detail_distribusi_matakuliah": "Detail Distribusi Mata Kuliah",
        "/dashboard/kaprodi/detail_monitoring_mahasiswa": "Detail Monitoring Mahasiswa",
        "/dashboard/kaprodi/data_master": "Data Master",
        "/dashboard/kaprodi/pemetaan": "Pemetaan CPL",
        "/dashboard/kaprodi/hasil_perhitungan": "Hasil Perhitungan",

        /* ================= DOSEN ================= */
        "/dashboard/dosen": "Dashboard",
        "/dashboard/dosen/detail_distribusi_kelas": "Detail Distribusi Kelas",
        "/dashboard/dosen/atur_penilaian": "Atur Penilaian",
        "/dashboard/dosen/detail_penilaian": "Detail Penilaian",
        "/dashboard/dosen/penilaian": "Input Nilai Mahasiswa",
        "/dashboard/dosen/hasil_perhitungan": "Hasil Perhitungan",
    };



    // Ambil label berdasarkan path, jika tidak ada gunakan "Dashboard"
    const sortedKeys = Object.keys(pageTitles).sort((a, b) => b.length - a.length);
    const matchingKey = sortedKeys.find(key => location.pathname.startsWith(key));
    const currentTitle = matchingKey ? pageTitles[matchingKey] : "Dashboard";

    return (
        <nav className="bg-white p-4 shadow-md fixed top-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-black text-lg font-bold">{currentTitle}</h1>
            </div>
        </nav>
    );
};

export default Navbar;
