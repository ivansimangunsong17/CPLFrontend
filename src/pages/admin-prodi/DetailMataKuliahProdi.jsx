import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    AiOutlineArrowLeft,
    AiOutlinePlus,
    AiOutlineSearch,
    AiFillDelete,
    AiFillEdit,
    AiOutlineEye,
} from "react-icons/ai";
import { FiDownloadCloud, FiUploadCloud } from "react-icons/fi";
import { toast } from "react-toastify";
import { useMataKuliah } from "../../hooks/admin-prodi/useMataKuliah";
import { useCPMK } from "../../hooks/admin-prodi/useCPMK";
import { useAuth } from "../../context/AuthContext";
import LoadingScreen from "../../components/LoadingScreen";
import FormBox from "../../components/Form/FormBox";
import ConfirmModal from "../../components/Modal/ConfModal";
import TableSkeleton from "../../components/TableSkeleton";

const DetailMataKuliahProdi = () => {
    const { mataKuliahId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { mataKuliahQuery } = useMataKuliah();
    const { cpmkQuery, createMutation, updateMutation, deleteMutation } = useCPMK(user?.prodi_id);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchKelas, setSearchKelas] = useState("");
    const [searchMahasiswa, setSearchMahasiswa] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    
    // State untuk manajemen kelas
    const [isKelasFormOpen, setIsKelasFormOpen] = useState(false);
    const [editKelasData, setEditKelasData] = useState(null);
    const [selectedKelasRows, setSelectedKelasRows] = useState([]);
    const [allKelasSelected, setAllKelasSelected] = useState(false);
    const [showKelasDeleteModal, setShowKelasDeleteModal] = useState(false);
    const [kelasToDelete, setKelasToDelete] = useState(null);
    
    // State untuk view detail kelas dan mahasiswa
    const [selectedKelas, setSelectedKelas] = useState(null);
    const [showMahasiswaView, setShowMahasiswaView] = useState(false);

    // Debug logging
    console.log('User object:', user);
    console.log('User prodi_id:', user?.prodi_id);
    console.log('User prodi_id type:', typeof user?.prodi_id);
    console.log('CPMK Query Status:', {
        isLoading: cpmkQuery.isLoading,
        isError: cpmkQuery.isError,
        isEnabled: !!user?.prodi_id,
        data: cpmkQuery.data,
        error: cpmkQuery.error
    });

    const mataKuliahData = mataKuliahQuery.data?.find(
        (item) => item.id.toString() === mataKuliahId
    );

    // Data CPMK dari API dengan fallback untuk testing
    const cpmkData = cpmkQuery.data || [];

    // Fallback data untuk testing jika API belum ready
    const fallbackCPMKData = [
        {
            id: 1,
            kode: "CPMK-01",
            deskripsi: "Memahami konsep dasar struktur data",
            bobot: 25,
            cpmk_id: 1,
            kode_cpmk: "CPMK-01",
            nama_cpmk: "CPMK 01",
            prodi_id: user?.prodi_id
        },
        {
            id: 2,
            kode: "CPMK-02",
            deskripsi: "Mampu mengimplementasikan struktur data dalam pemrograman",
            bobot: 35,
            cpmk_id: 2,
            kode_cpmk: "CPMK-02",
            nama_cpmk: "CPMK 02",
            prodi_id: user?.prodi_id
        },
        {
            id: 3,
            kode: "CPMK-03",
            deskripsi: "Mampu menganalisis efisiensi struktur data",
            bobot: 40,
            cpmk_id: 3,
            kode_cpmk: "CPMK-03",
            nama_cpmk: "CPMK 03",
            prodi_id: user?.prodi_id
        },
    ];

    // Use fallback data if API fails and no data available
    const displayCPMKData = cpmkQuery.isError && cpmkData.length === 0 ? fallbackCPMKData : cpmkData;

    // Data kelas dengan informasi yang lebih lengkap
    const kelasData = [
        { 
            id: 1, 
            kodeMK: mataKuliahData?.kode || "IF265365", 
            namaMataKuliah: mataKuliahData?.nama || "Struktur Data", 
            namaKelas: `${mataKuliahData?.nama || "Struktur Data"} A`, 
            dosen: "Rizka Andayani, S.T., M.T.", 
            periode: "2024 Genap",
            kapasitas: 30,
            terisi: 25 
        },
        { 
            id: 2, 
            kodeMK: mataKuliahData?.kode || "IF265365", 
            namaMataKuliah: mataKuliahData?.nama || "Struktur Data", 
            namaKelas: `${mataKuliahData?.nama || "Struktur Data"} B`, 
            dosen: "Dr. Ahmad Hasan, M.Kom.", 
            periode: "2024 Genap",
            kapasitas: 30,
            terisi: 28 
        },
        { 
            id: 3, 
            kodeMK: mataKuliahData?.kode || "IF265365", 
            namaMataKuliah: mataKuliahData?.nama || "Struktur Data", 
            namaKelas: `${mataKuliahData?.nama || "Struktur Data"} C`, 
            dosen: "Siti Rahayu, S.Kom., M.T.", 
            periode: "2024 Genap",
            kapasitas: 30,
            terisi: 22 
        },
    ];

    // Data mahasiswa untuk setiap kelas
    const mahasiswaData = {
        1: [ // Kelas A
            { id: 1, nim: "2015051001", nama: "Ahmad Rizky Pratama", email: "ahmad.rizky@student.unila.ac.id" },
            { id: 2, nim: "2015051002", nama: "Siti Nurhaliza", email: "siti.nurhaliza@student.unila.ac.id" },
            { id: 3, nim: "2015051003", nama: "Budi Santoso", email: "budi.santoso@student.unila.ac.id" },
            { id: 4, nim: "2015051004", nama: "Dewi Sartika", email: "dewi.sartika@student.unila.ac.id" },
            { id: 5, nim: "2015051005", nama: "Eko Prasetyo", email: "eko.prasetyo@student.unila.ac.id" },
        ],
        2: [ // Kelas B
            { id: 6, nim: "2015051006", nama: "Fitra Ramadhan", email: "fitra.ramadhan@student.unila.ac.id" },
            { id: 7, nim: "2015051007", nama: "Gita Savitri", email: "gita.savitri@student.unila.ac.id" },
            { id: 8, nim: "2015051008", nama: "Hendra Gunawan", email: "hendra.gunawan@student.unila.ac.id" },
            { id: 9, nim: "2015051009", nama: "Indira Putri", email: "indira.putri@student.unila.ac.id" },
            { id: 10, nim: "2015051010", nama: "Joko Widodo", email: "joko.widodo@student.unila.ac.id" },
        ],
        3: [ // Kelas C
            { id: 11, nim: "2015051011", nama: "Kartika Sari", email: "kartika.sari@student.unila.ac.id" },
            { id: 12, nim: "2015051012", nama: "Lukman Hakim", email: "lukman.hakim@student.unila.ac.id" },
            { id: 13, nim: "2015051013", nama: "Maya Sari", email: "maya.sari@student.unila.ac.id" },
            { id: 14, nim: "2015051014", nama: "Nanda Pratama", email: "nanda.pratama@student.unila.ac.id" },
            { id: 15, nim: "2015051015", nama: "Oki Setiawan", email: "oki.setiawan@student.unila.ac.id" },
        ]
    };

    const filteredCPMK = displayCPMKData.filter((item) =>
        item.kode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.deskripsi?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredKelas = kelasData.filter((item) =>
        item.namaKelas.toLowerCase().includes(searchKelas.toLowerCase()) ||
        item.dosen.toLowerCase().includes(searchKelas.toLowerCase()) ||
        item.periode.toLowerCase().includes(searchKelas.toLowerCase())
    );

    const filteredMahasiswa = selectedKelas 
        ? (mahasiswaData[selectedKelas.id] || []).filter((item) =>
            item.nim.toLowerCase().includes(searchMahasiswa.toLowerCase()) ||
            item.nama.toLowerCase().includes(searchMahasiswa.toLowerCase()) ||
            item.email.toLowerCase().includes(searchMahasiswa.toLowerCase())
        )
        : [];

    // Form fields for CPMK
    const cpmkFormFields = [
        {
            name: "kode_cpmk",
            label: "Kode CPMK",
            type: "text",
            placeholder: "Masukkan kode CPMK (contoh: CPMK-01)",
            required: true,
        },
        {
            name: "nama_cpmk",
            label: "Nama CPMK",
            type: "text",
            placeholder: "Masukkan nama CPMK",
            required: true,
        },
        {
            name: "deskripsi",
            label: "Deskripsi CPMK",
            type: "textarea",
            placeholder: "Masukkan deskripsi capaian pembelajaran mata kuliah",
            required: true,
        },
        {
            name: "bobot",
            label: "Bobot (%)",
            type: "number",
            placeholder: "Masukkan bobot dalam persen (1-100)",
            required: true,
            min: 1,
            max: 100,
        },
    ];

    // Form fields for Kelas
    const kelasFormFields = [
        {
            name: "namaKelas",
            label: "Nama Kelas",
            type: "text",
            placeholder: "Masukkan nama kelas (contoh: Struktur Data A)",
            required: true,
        },
        {
            name: "dosen",
            label: "Dosen Pengampu",
            type: "text",
            placeholder: "Masukkan nama dosen pengampu",
            required: true,
        },
        {
            name: "periode",
            label: "Periode",
            type: "text",
            placeholder: "Masukkan periode (contoh: 2024 Genap)",
            required: true,
        },
        {
            name: "kapasitas",
            label: "Kapasitas Kelas",
            type: "number",
            placeholder: "Masukkan kapasitas maksimal kelas",
            required: true,
            min: 1,
            max: 100,
        },
    ];

    // CPMK Handler Functions
    const handleAddCPMK = async (formData) => {
        try {
            // Validasi input
            if (!formData.kode_cpmk || !formData.nama_cpmk || !formData.deskripsi) {
                toast.error('Semua field wajib diisi');
                return;
            }

            // Validasi format kode CPMK
            if (!/^CPMK-\d+$/.test(formData.kode_cpmk)) {
                toast.error('Format kode CPMK harus: CPMK-[angka] (contoh: CPMK-01)');
                return;
            }

            // Validasi bobot
            if (!formData.bobot || formData.bobot < 1 || formData.bobot > 100) {
                toast.error('Bobot harus antara 1-100 persen');
                return;
            }

            // Validasi panjang deskripsi
            if (formData.deskripsi.length < 10) {
                toast.error('Deskripsi minimal 10 karakter');
                return;
            }

            console.log('handleAddCPMK called with formData:', formData);
            console.log('User prodi_id:', user?.prodi_id);

            const dataToSubmit = {
                ...formData,
                prodi_id: user?.prodi_id,
                bobot: parseInt(formData.bobot) // Pastikan bobot adalah integer
            };

            console.log('Final dataToSubmit:', dataToSubmit);

            if (editData) {
                console.log('Updating CPMK with editData:', editData);
                await updateMutation.mutateAsync({
                    cpmk_id: editData.id,
                    ...dataToSubmit
                });
            } else {
                console.log('Creating new CPMK');
                await createMutation.mutateAsync(dataToSubmit);
            }

            setIsFormOpen(false);
            setEditData(null);
        } catch (error) {
            console.error('Error submitting CPMK in handleAddCPMK:', error);
        }
    };

    // Kelas Handler Functions
    const handleAddKelas = async (formData) => {
        try {
            // Validasi input
            if (!formData.namaKelas || !formData.dosen || !formData.periode || !formData.kapasitas) {
                toast.error('Semua field wajib diisi');
                return;
            }

            // Validasi kapasitas
            if (formData.kapasitas < 1 || formData.kapasitas > 100) {
                toast.error('Kapasitas kelas harus antara 1-100');
                return;
            }

            // Validasi nama kelas minimal 5 karakter
            if (formData.namaKelas.length < 5) {
                toast.error('Nama kelas minimal 5 karakter');
                return;
            }

            console.log('Adding/Updating Kelas:', formData);
            
            // Simulate API call success
            if (editKelasData) {
                toast.success('Kelas berhasil diperbarui');
            } else {
                toast.success('Kelas berhasil ditambahkan');
            }

            setIsKelasFormOpen(false);
            setEditKelasData(null);
        } catch (error) {
            console.error('Error submitting Kelas:', error);
            toast.error('Gagal menyimpan kelas');
        }
    };

    const handleEditCPMK = (item) => {
        setEditData(item);
        setIsFormOpen(true);
    };

    const handleAddNewCPMK = () => {
        setEditData(null);
        setIsFormOpen(true);
    };

    // Kelas handlers
    const handleEditKelas = (item) => {
        setEditKelasData(item);
        setIsKelasFormOpen(true);
    };

    const handleAddNewKelas = () => {
        setEditKelasData(null);
        setIsKelasFormOpen(true);
    };

    const handleViewKelasDetail = (kelas) => {
        setSelectedKelas(kelas);
        setShowMahasiswaView(true);
    };

    const handleBackToKelas = () => {
        setSelectedKelas(null);
        setShowMahasiswaView(false);
        setSearchMahasiswa("");
    };

    // Handle delete confirmation
    const handleDeleteClick = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (itemToDelete) {
            try {
                await deleteMutation.mutateAsync(itemToDelete.id);
                setShowDeleteModal(false);
                setItemToDelete(null);
            } catch (error) {
                console.error('Error deleting CPMK:', error);
            }
        }
    };

    const handleDeleteCancel = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    // Multiple selection handlers
    const toggleSelectAll = () => {
        if (allSelected) {
            setSelectedRows([]);
        } else {
            const allIds = filteredCPMK.map((item) => item.id);
            setSelectedRows(allIds);
        }
        setAllSelected(!allSelected);
    };

    const toggleSelectRow = (cpmkId) => {
        if (selectedRows.includes(cpmkId)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== cpmkId));
        } else {
            setSelectedRows([...selectedRows, cpmkId]);
        }
    };

    // Handle multiple delete
    const handleMultipleDelete = () => {
        if (selectedRows.length === 1) {
            const item = displayCPMKData.find(cpmk => cpmk.id === selectedRows[0]);
            setItemToDelete(item);
        } else {
            setItemToDelete({ kode: `${selectedRows.length} CPMK`, id: selectedRows });
        }
        setShowDeleteModal(true);
    };

    const handleDeleteSingle = (item) => {
        setSelectedRows([item.id]);
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmMultiple = async () => {
        if (!itemToDelete) {
            toast.error('Tidak ada data yang dipilih untuk dihapus');
            return;
        }

        try {
            if (Array.isArray(itemToDelete?.id)) {
                // Multiple delete
                if (itemToDelete.id.length === 0) {
                    toast.error('Tidak ada CPMK yang dipilih');
                    return;
                }
                for (const id of itemToDelete.id) {
                    await deleteMutation.mutateAsync(id);
                }
            } else {
                // Single delete
                await deleteMutation.mutateAsync(itemToDelete.id);
            }
            setShowDeleteModal(false);
            setItemToDelete(null);
            setSelectedRows([]);
            setAllSelected(false);
        } catch (error) {
            console.error('Error deleting CPMK:', error);
        }
    };

    // Loading state hanya untuk mata kuliah, biarkan CPMK loading 
    if (!mataKuliahData) return <div className="p-6">Mata kuliah tidak ditemukan</div>;

    // Handle CPMK error
    if (cpmkQuery.isError) {
        console.error('Error loading CPMK:', cpmkQuery.error);
    }

    // Check if any mutation is running
    const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending || mataKuliahQuery.isLoading;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Loading overlay for mutations */}
            {isMutating && <LoadingScreen />}

            {/* Header with Back Button and Breadcrumb */}
            <div className="mb-6">
                <button
                    onClick={() => navigate('/dashboard/admin_prodi/data_matakuliah')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors font-medium"
                >
                    <AiOutlineArrowLeft size={20} />
                    <span>Kembali ke Data Mata Kuliah</span>
                </button>

                {/* Breadcrumb */}
                <nav className="flex text-sm text-gray-500 mb-4">
                    <span
                        onClick={() => navigate('/dashboard/admin_prodi/data_matakuliah')}
                        className="hover:text-blue-600 cursor-pointer"
                    >
                        Data Mata Kuliah
                    </span>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800 font-medium">Detail Mata Kuliah</span>
                </nav>
            </div>

            {/* Title Section */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <h1 className="text-2xl font-bold text-gray-800">Detail Mata Kuliah</h1>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                {mataKuliahData.kode}
                            </span>
                        </div>
                        <p className="text-lg text-gray-600">{mataKuliahData.nama}</p>
                    </div>
                </div>
            </div>            {/* CPMK Section */}
            <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
                {/* Header with actions - same style as data mahasiswa */}
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-800">Capaian Pembelajaran Mata Kuliah (CPMK)</h3>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                                <FiUploadCloud size={18} />
                                <span>Export</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                                <FiDownloadCloud size={18} />
                                <span>Import</span>
                            </button>
                            <button
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedRows.length > 0 && !deleteMutation.isPending
                                    ? "bg-red-500 text-white hover:bg-red-600"
                                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                    }`}
                                disabled={selectedRows.length === 0 || deleteMutation.isPending}
                                onClick={handleMultipleDelete}
                            >
                                <AiFillDelete size={18} />
                                <span>{deleteMutation.isPending ? "Menghapus..." : "Hapus"}</span>
                            </button>
                            <button
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${createMutation.isPending || updateMutation.isPending
                                    ? "bg-blue-300 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 text-white"
                                    }`}
                                onClick={handleAddNewCPMK}
                                disabled={createMutation.isPending || updateMutation.isPending}
                            >
                                <AiOutlinePlus size={18} />
                                <span>Tambah</span>
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Cari CPMK atau deskripsi..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* CPMK Table */}
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-blue-100 text-black">
                            <tr>
                                <th className="p-4 w-12">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                                        checked={allSelected}
                                        onChange={toggleSelectAll}
                                    />
                                </th>
                                <th className="p-4 text-left">Kode</th>
                                <th className="p-4 text-left">Deskripsi</th>
                                <th className="p-4 text-left">Bobot (%)</th>
                                <th className="p-4 text-left">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {cpmkQuery.isLoading ? (
                                <TableSkeleton rows={3} columns={5} />
                            ) : cpmkQuery.isError ? (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-red-500">
                                        Error: {cpmkQuery.error?.message || 'Gagal memuat data CPMK'}
                                    </td>
                                </tr>
                            ) : filteredCPMK.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-6 text-center text-gray-500">
                                        {cpmkQuery.isError ? (
                                            <div className="text-red-500">
                                                <p>Error memuat data CPMK</p>
                                                <p className="text-sm mt-1">Menggunakan data demo sebagai contoh</p>
                                            </div>
                                        ) : displayCPMKData.length === 0 ? (
                                            <div>
                                                <p>Belum ada data CPMK untuk prodi ini.</p>
                                                <p className="text-sm mt-1">Klik "Tambah CPMK" untuk menambah data baru.</p>
                                            </div>
                                        ) : (
                                            "Tidak ada data CPMK yang sesuai dengan pencarian."
                                        )}
                                    </td>
                                </tr>
                            ) : (
                                filteredCPMK.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => toggleSelectRow(item.id)}
                                            />
                                        </td>
                                        <td className="p-4 font-medium text-gray-800">{item.kode}</td>
                                        <td className="p-4 text-gray-600">{item.deskripsi}</td>
                                        <td className="p-4 text-gray-600">{item.bobot || 0}%</td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleEditCPMK(item)}
                                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                                                >
                                                    <AiFillEdit size={20} />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteSingle(item)}
                                                    className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                                                >
                                                    <AiFillDelete size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Daftar Kelas Section */}
            {!showMahasiswaView ? (
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">Daftar Kelas Mata Kuliah</h3>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                                    <FiUploadCloud size={18} />
                                    <span>Export</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                                    <FiDownloadCloud size={18} />
                                    <span>Import</span>
                                </button>
                                <button
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedKelasRows.length > 0
                                        ? "bg-red-500 text-white hover:bg-red-600"
                                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                                        }`}
                                    disabled={selectedKelasRows.length === 0}
                                    onClick={() => setShowKelasDeleteModal(true)}
                                >
                                    <AiFillDelete size={18} />
                                    <span>Hapus</span>
                                </button>
                                <button
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                    onClick={handleAddNewKelas}
                                >
                                    <AiOutlinePlus size={18} />
                                    <span>Tambah Kelas</span>
                                </button>
                            </div>
                        </div>

                        {/* Kelas Search */}
                        <div className="relative max-w-md">
                            <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari kelas, dosen, atau periode..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchKelas}
                                onChange={(e) => setSearchKelas(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Kelas Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-100 text-black">
                                <tr>
                                    <th className="p-4 w-12">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                                            checked={allKelasSelected}
                                            onChange={() => {
                                                if (allKelasSelected) {
                                                    setSelectedKelasRows([]);
                                                } else {
                                                    setSelectedKelasRows(filteredKelas.map(k => k.id));
                                                }
                                                setAllKelasSelected(!allKelasSelected);
                                            }}
                                        />
                                    </th>
                                    <th className="p-4 text-left">Kode MK</th>
                                    <th className="p-4 text-left">Nama Kelas</th>
                                    <th className="p-4 text-left">Dosen</th>
                                    <th className="p-4 text-left">Periode</th>
                                    <th className="p-4 text-left">Kapasitas</th>
                                    <th className="p-4 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredKelas.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="p-6 text-center text-gray-500">
                                            {searchKelas ? "Tidak ada kelas yang sesuai dengan pencarian." : "Belum ada kelas untuk mata kuliah ini."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredKelas.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="p-4">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                                                    checked={selectedKelasRows.includes(item.id)}
                                                    onChange={() => {
                                                        if (selectedKelasRows.includes(item.id)) {
                                                            setSelectedKelasRows(selectedKelasRows.filter(id => id !== item.id));
                                                        } else {
                                                            setSelectedKelasRows([...selectedKelasRows, item.id]);
                                                        }
                                                    }}
                                                />
                                            </td>
                                            <td className="p-4 font-medium text-gray-800">{item.kodeMK}</td>
                                            <td className="p-4 text-gray-600">{item.namaKelas}</td>
                                            <td className="p-4 text-gray-600">{item.dosen}</td>
                                            <td className="p-4 text-gray-600">{item.periode}</td>
                                            <td className="p-4 text-gray-600">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm">{item.terisi}/{item.kapasitas}</span>
                                                    <div className="w-16 bg-gray-200 rounded-full h-2">
                                                        <div 
                                                            className="bg-blue-600 h-2 rounded-full" 
                                                            style={{ width: `${(item.terisi / item.kapasitas) * 100}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button 
                                                        onClick={() => handleViewKelasDetail(item)}
                                                        className="flex items-center gap-1 text-green-600 hover:text-green-800 transition"
                                                        title="Lihat Detail Mahasiswa"
                                                    >
                                                        <AiOutlineEye size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleEditKelas(item)}
                                                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                                                        title="Edit Kelas"
                                                    >
                                                        <AiFillEdit size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => {
                                                            setKelasToDelete(item);
                                                            setShowKelasDeleteModal(true);
                                                        }}
                                                        className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                                                        title="Hapus Kelas"
                                                    >
                                                        <AiFillDelete size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                /* Mahasiswa View */
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={handleBackToKelas}
                                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium"
                                >
                                    <AiOutlineArrowLeft size={20} />
                                    <span>Kembali ke Daftar Kelas</span>
                                </button>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    Daftar Mahasiswa - {selectedKelas?.namaKelas}
                                </h3>
                            </div>
                            <div className="flex gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-yellow-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                                    <FiUploadCloud size={18} />
                                    <span>Export</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                                    <FiDownloadCloud size={18} />
                                    <span>Import</span>
                                </button>
                            </div>
                        </div>

                        {/* Informasi Kelas */}
                        <div className="bg-blue-50 rounded-lg p-4 mb-4">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <span className="font-medium text-gray-700">Dosen:</span>
                                    <p className="text-gray-600">{selectedKelas?.dosen}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Periode:</span>
                                    <p className="text-gray-600">{selectedKelas?.periode}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Kapasitas:</span>
                                    <p className="text-gray-600">{selectedKelas?.terisi}/{selectedKelas?.kapasitas}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-700">Status:</span>
                                    <p className={`font-medium ${selectedKelas?.terisi === selectedKelas?.kapasitas ? 'text-red-600' : 'text-green-600'}`}>
                                        {selectedKelas?.terisi === selectedKelas?.kapasitas ? 'Penuh' : 'Tersedia'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mahasiswa Search */}
                        <div className="relative max-w-md">
                            <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari berdasarkan NIM, nama, atau email..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchMahasiswa}
                                onChange={(e) => setSearchMahasiswa(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Mahasiswa Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-blue-100 text-black">
                                <tr>
                                    <th className="p-4 text-left">No</th>
                                    <th className="p-4 text-left">NIM</th>
                                    <th className="p-4 text-left">Nama Lengkap</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredMahasiswa.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-6 text-center text-gray-500">
                                            {searchMahasiswa ? "Tidak ada mahasiswa yang sesuai dengan pencarian." : "Belum ada mahasiswa terdaftar di kelas ini."}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMahasiswa.map((mahasiswa, index) => (
                                        <tr key={mahasiswa.id} className="hover:bg-gray-50 transition">
                                            <td className="p-4 text-gray-600">{index + 1}</td>
                                            <td className="p-4 font-medium text-gray-800">{mahasiswa.nim}</td>
                                            <td className="p-4 text-gray-600">{mahasiswa.nama}</td>
                                            <td className="p-4 text-gray-600">{mahasiswa.email}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="flex items-center gap-1 text-green-600 hover:text-green-800 transition">
                                                        <AiOutlineEye size={16} />
                                                    </button>
                                                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition">
                                                        <AiFillEdit size={16} />
                                                    </button>
                                                    <button className="flex items-center gap-1 text-red-600 hover:text-red-800 transition">
                                                        <AiFillDelete size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* CPMK Form Modal */}
            <FormBox
                title={editData ? "Edit CPMK" : "Tambah CPMK Baru"}
                subtitle={editData ? "Perbarui informasi CPMK" : "Lengkapi data untuk CPMK baru"}
                fields={cpmkFormFields}
                initialData={editData ? {
                    kode_cpmk: editData.kode || "",
                    nama_cpmk: editData.nama || "",
                    deskripsi: editData.deskripsi || "",
                    bobot: editData.bobot || ""
                } : {}}
                onSubmit={handleAddCPMK}
                onCancel={() => {
                    setIsFormOpen(false);
                    setEditData(null);
                }}
                isLoading={createMutation.isPending || updateMutation.isPending}
                isOpen={isFormOpen}
            />

            {/* Kelas Form Modal */}
            <FormBox
                title={editKelasData ? "Edit Kelas" : "Tambah Kelas Baru"}
                subtitle={editKelasData ? "Perbarui informasi kelas" : "Lengkapi data untuk kelas baru"}
                fields={kelasFormFields}
                initialData={editKelasData ? {
                    namaKelas: editKelasData.namaKelas || "",
                    dosen: editKelasData.dosen || "",
                    periode: editKelasData.periode || "",
                    kapasitas: editKelasData.kapasitas || ""
                } : {}}
                onSubmit={handleAddKelas}
                onCancel={() => {
                    setIsKelasFormOpen(false);
                    setEditKelasData(null);
                }}
                isLoading={false}
                isOpen={isKelasFormOpen}
            />

            {/* CPMK Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showDeleteModal}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirmMultiple}
                title="Konfirmasi Hapus CPMK"
                message={`Apakah Anda yakin ingin menghapus CPMK "${itemToDelete?.kode}" ini? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Hapus"
                cancelText="Batal"
                isLoading={deleteMutation.isPending}
            />

            {/* Kelas Delete Confirmation Modal */}
            <ConfirmModal
                isOpen={showKelasDeleteModal}
                onClose={() => {
                    setShowKelasDeleteModal(false);
                    setKelasToDelete(null);
                }}
                onConfirm={() => {
                    // Handle kelas deletion
                    if (kelasToDelete) {
                        console.log('Deleting kelas:', kelasToDelete);
                        toast.success('Kelas berhasil dihapus');
                    } else if (selectedKelasRows.length > 0) {
                        console.log('Deleting multiple kelas:', selectedKelasRows);
                        toast.success(`${selectedKelasRows.length} kelas berhasil dihapus`);
                    }
                    setShowKelasDeleteModal(false);
                    setKelasToDelete(null);
                    setSelectedKelasRows([]);
                    setAllKelasSelected(false);
                }}
                title="Konfirmasi Hapus Kelas"
                message={
                    kelasToDelete 
                        ? `Apakah Anda yakin ingin menghapus kelas "${kelasToDelete.namaKelas}"? Tindakan ini tidak dapat dibatalkan.`
                        : `Apakah Anda yakin ingin menghapus ${selectedKelasRows.length} kelas yang dipilih? Tindakan ini tidak dapat dibatalkan.`
                }
                confirmText="Hapus"
                cancelText="Batal"
                isLoading={false}
            />
        </div>
    );
};

export default DetailMataKuliahProdi;
