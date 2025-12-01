import React, { useState, useMemo } from 'react';
import { FiArrowLeft, FiSearch, FiEye, FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Tambahkan FiChevronLeft dan FiChevronRight
import { useNavigate, useParams } from 'react-router-dom'; // Tambahkan useParams

const DetailDistribusiKelasKaprodi = () => {
    const navigate = useNavigate();
    const { mataKuliahId, kelasId } = useParams(); // Ambil ID dari URL

    // --- DATA DUMMY CPL (Yang sudah ada) ---
    const dataCPL = [
        {
            id: "CPL-01",
            kode_cpl: "CPL-01",
            total_rata_rata: 75.5,
            cpmk_list: [
                {
                    kode: "CPMK-01",
                    bobot_cpmk: 10,
                    rata_rata_cpmk: 78.0,
                    penilaian: [
                        { bentuk: "Tugas 1", bobot: 4, nilai: 80 },
                        { bentuk: "Tugas 2", bobot: 3, nilai: 75 },
                        { bentuk: "Kuis 1", bobot: 3, nilai: 78 },
                    ]
                },
                {
                    kode: "CPMK-02",
                    bobot_cpmk: 15,
                    rata_rata_cpmk: 74.5,
                    penilaian: [
                        { bentuk: "Tugas 3", bobot: 5, nilai: 72 },
                        { bentuk: "Kuis 2", bobot: 5, nilai: 76 },
                        { bentuk: "UTS", bobot: 5, nilai: 75 },
                    ]
                }
            ]
        },
        {
            id: "CPL-02",
            kode_cpl: "CPL-02",
            total_rata_rata: 76.2,
            cpmk_list: [
                {
                    kode: "CPMK-03",
                    bobot_cpmk: 20,
                    rata_rata_cpmk: 76.2,
                    penilaian: [
                        { bentuk: "Tugas 4", bobot: 5, nilai: 78 },
                        { bentuk: "Tugas 5", bobot: 5, nilai: 75 },
                        { bentuk: "Proyek Kecil", bobot: 10, nilai: 76 },
                    ]
                }
            ]
        },
        // ... (Data CPL lainnya bisa tetap ada atau disingkat untuk demo)
    ];

    // --- DATA DUMMY MAHASISWA (BARU) ---
    const dataMahasiswa = [
        { id: 1, npm: "214544646446", nama: "Budi Siregar", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 2, npm: "214544646447", nama: "Cantika Rahma", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 3, npm: "214544646448", nama: "Daniel Putra", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 4, npm: "214544646449", nama: "Fani Putri", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 5, npm: "214544646450", nama: "Ganjar Prabowo", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 6, npm: "214544646451", nama: "Hugo Buto", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 7, npm: "214544646452", nama: "Irwansyah", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 8, npm: "214544646453", nama: "Jesica", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 9, npm: "214544646454", nama: "Kartono Subagjo", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 10, npm: "214544646455", nama: "Rama Wahyu Ajie Pratama", prodi: "Teknik Informatika", angkatan: 2021 },
        { id: 11, npm: "214544646456", nama: "Siti Aminah", prodi: "Teknik Informatika", angkatan: 2021 }, // Tambahan data untuk tes pagination
        { id: 12, npm: "214544646457", nama: "Toni Wijaya", prodi: "Teknik Informatika", angkatan: 2021 }, // Tambahan data untuk tes pagination
    ];

    // --- State Pagination ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Set jumlah item per halaman
    const [searchTerm, setSearchTerm] = useState(""); // State pencarian

    // Filter Data Mahasiswa
    const filteredMahasiswa = useMemo(() => {
        return dataMahasiswa.filter((mhs) =>
            mhs.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            mhs.npm.includes(searchTerm)
        );
    }, [dataMahasiswa, searchTerm]);

    // Logika Pagination
    const totalPages = Math.ceil(filteredMahasiswa.length / itemsPerPage);
    const paginatedMahasiswa = filteredMahasiswa.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset ke halaman 1 saat melakukan pencarian
    };

    // Handler Navigasi ke Detail Mahasiswa
    const handleViewDetailMahasiswa = (mahasiswaId) => {
        // Pastikan mataKuliahId dan kelasId ada (dari URL atau fallback dummy jika perlu)
        const currentMKId = mataKuliahId || "dummyMK";
        const currentKelasId = kelasId || "dummyKelas";

        navigate(`/dashboard/kaprodi/detail_distribusi_matakuliah/${currentMKId}/${currentKelasId}/${mahasiswaId}`);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-800">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex items-center gap-4 mb-2">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full bg-white text-gray-600 hover:bg-gray-100 hover:text-blue-600 transition-colors shadow-sm border border-gray-200"
                    >
                        <FiArrowLeft size={20} />
                    </button>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Detail CPL Yang Dibebankan Pada Kelas
                    </h1>
                </div>

                {/* Loop untuk setiap CPL (Tabel Atas) */}
                {dataCPL.map((cpl) => (
                    <div key={cpl.id} className="space-y-4">
                        {/* Judul CPL */}
                        <h2 className="text-xl font-bold text-gray-900">{cpl.kode_cpl}</h2>

                        {/* Tabel CPL */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-blue-600 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider border-r border-blue-500">
                                                CPMK
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider border-r border-blue-500">
                                                Bobot CPMK
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider border-r border-blue-500">
                                                Bentuk Penilaian
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider border-r border-blue-500">
                                                Bobot Penilaian
                                            </th>
                                            <th className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider">
                                                Nilai (0-100)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {cpl.cpmk_list.map((cpmk, cpmkIndex) => (
                                            <React.Fragment key={cpmk.kode}>
                                                {cpmk.penilaian.map((nilai, nilaiIndex) => (
                                                    <tr key={`${cpmk.kode}-${nilaiIndex}`} className="hover:bg-gray-50">
                                                        {/* Render Kolom CPMK & Bobot hanya di baris pertama */}
                                                        {nilaiIndex === 0 && (
                                                            <>
                                                                <td
                                                                    rowSpan={cpmk.penilaian.length}
                                                                    className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900 border-r border-gray-200 align-middle"
                                                                >
                                                                    {cpmk.kode}
                                                                </td>
                                                                <td
                                                                    rowSpan={cpmk.penilaian.length}
                                                                    className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 border-r border-gray-200 align-middle"
                                                                >
                                                                    {cpmk.bobot_cpmk}
                                                                </td>
                                                            </>
                                                        )}
                                                        {/* Kolom Penilaian (Selalu Render) */}
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 border-r border-gray-200">
                                                            {nilai.bentuk}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700 border-r border-gray-200">
                                                            {nilai.bobot}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium text-gray-900">
                                                            {nilai.nilai}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </tbody>
                                    {/* Footer Tabel untuk Rata-rata */}
                                    <tfoot className="bg-gray-50">
                                        {/* Baris Judul Total */}
                                        <tr>
                                            <td colSpan={5} className="px-6 py-3 text-center text-sm font-bold text-gray-900 border-t border-gray-200">
                                                Total Nilai Rata-Rata
                                            </td>
                                        </tr>
                                        {/* Baris Nilai CPL */}
                                        <tr>
                                            <td colSpan={5} className="px-6 py-3 text-center text-sm font-bold text-gray-900 border-t border-gray-200 bg-white">
                                                {cpl.kode_cpl} : <span className="text-lg">{cpl.total_rata_rata}</span>
                                            </td>
                                        </tr>
                                        {/* Baris Rincian CPMK */}
                                        <tr>
                                            <td colSpan={5} className="p-0 border-t border-gray-200 bg-white">
                                                <div className="flex divide-x divide-gray-200">
                                                    {cpl.cpmk_list.map((cpmk) => (
                                                        <div key={cpmk.kode} className="flex-1 py-3 px-2 text-center text-sm font-medium text-gray-800">
                                                            {cpmk.kode} : <strong>{cpmk.rata_rata_cpmk}</strong>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}

                {/* --- TABEL DAFTAR PESERTA KELAS (BAGIAN BARU) --- */}
                <div className="mt-12">
                    {/* Judul dan Search */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                        <h2 className="text-2xl font-bold text-gray-900">Daftar Peserta kelas</h2>
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                placeholder="Cari Mahasiswa.."
                                className="w-full pl-10 pr-12 py-2.5 bg-gray-100 border-none rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <FiSearch className="absolute left-3.5 top-3 text-gray-400" size={16} />
                            <button className="absolute right-1.5 top-1.5 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                <FiSearch size={14} />
                            </button>
                        </div>
                    </div>

                    {/* Tabel Mahasiswa */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-blue-600">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                            NPM
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                            Nama Lengkap
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                                            Program Studi
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                                            Angkatan
                                        </th>
                                        <th scope="col" className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedMahasiswa.length > 0 ? (
                                        paginatedMahasiswa.map((mhs, index) => (
                                            <tr key={mhs.id} className="hover:bg-blue-50/50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                                    {mhs.npm}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {mhs.nama}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                    {mhs.prodi}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">
                                                    {mhs.angkatan}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                                    <button
                                                        onClick={() => handleViewDetailMahasiswa(mhs.id)}
                                                        className="inline-flex items-center gap-1 px-3 py-1 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full text-xs font-medium transition-colors"
                                                    >
                                                        Lihat <FiEye size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                                Tidak ada data mahasiswa yang ditemukan.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-center gap-2 py-6 bg-white border-t border-gray-200">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100 border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiChevronLeft size={16} />
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`w-8 h-8 flex items-center justify-center rounded text-sm font-medium shadow-sm ${currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {page < 10 ? `0${page}` : page}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="w-8 h-8 flex items-center justify-center rounded bg-white hover:bg-gray-100 border border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <FiChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
                {/* --- AKHIR TABEL MAHASISWA --- */}

            </div>
        </div>
    );
}

export default DetailDistribusiKelasKaprodi;