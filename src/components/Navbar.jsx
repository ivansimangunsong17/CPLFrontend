import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const location = useLocation();

    // Mapping path ke label halaman
    const pageTitles = {
        "/dashboard/admin_universitas": "Dashboard",
        "/dashboard/admin_universitas/data_akun": "Data Akun",
        "/dashboard/admin_universitas/data_prodi": "Data Program Studi",
        "/dashboard/admin_universitas/hasil_perhitungan": "Hasil Perhitungan",

        "/dashboard/admin_prodi": "Dashboard",
        "/dashboard/admin_prodi/data_akun": "Data Akun",
        "/dashboard/admin_prodi/data_prodi": "Data Program Studi",
        "/dashboard/admin_prodi/data_mahasiswa": "Data Mahasiswa",
        "/dashboard/admin_prodi/data_matakuliah": "Data Mata Kuliah",
        "/dashboard/admin_prodi/pemetaan_cpl": "Pemetaan CPL",
        "/dashboard/admin_prodi/pemetaan_cpmk": "Pemetaan CPMK",
        "/dashboard/admin_prodi/hasil_perhitungan": "Hasil Perhitungan",
        "/dashboard/admin_prodi/data_cpl": "Data Capaian Pembelajaran Lulusan",
        "/dashboard/admin_prodi/atur_penilaian": "Atur Penilaian",
      

        "/dashboard/kaprodi": "Dashboard",
        "/dashboard/kaprodi/data_prodi": "Data Program Studi",
        "/dashboard/kaprodi/data_mahasiswa": "Data Mahasiswa",
        "/dashboard/kaprodi/data_matakuliah": "Data Mata Kuliah",
        "/dashboard/kaprodi/pemetaan_cpl": "Pemetaan CPL",
        "/dashboard/kaprodi/pemetaan_cpmk": "Pemetaan CPMK",
        "/dashboard/kaprodi/hasil_perhitungan": "Hasil Perhitungan",

        "/dashboard/dosen": "Dashboard",
        "/dashboard/dosen/input_nilai": "Input Nilai Mahasiswa",
        "/dashboard/dosen/hasil_perhitungan": "Hasil Perhitungan",
    };


    // Ambil label berdasarkan path, jika tidak ada gunakan "Halaman Tidak Diketahui"
    const currentTitle = pageTitles[location.pathname] || "Dashboard";

    return (
        <nav className="bg-white p-4 shadow-md fixed top-0 w-full z-10">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-black text-lg font-bold">{currentTitle}</h1>
            </div>
        </nav>
    );
};

export default Navbar;
