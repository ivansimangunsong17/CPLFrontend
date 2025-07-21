import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillPlusSquare, AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { useMataKuliah } from "../../hooks/admin-prodi/useMataKuliah";
import { useDataCPL } from "../../hooks/admin-prodi/useDataCPL";
import { usePemetaanCPL } from "../../hooks/admin-prodi/usePemetaanCPL";
import FormBox from "../../components/Form/FormBox";
import LoadingScreen from "../../components/LoadingScreen";
import TableSkeleton from "../../components/TableSkeleton";

const DetailPemetaanProdi = () => {
    const { mataKuliahId } = useParams();
    const navigate = useNavigate();
    const { mataKuliahQuery } = useMataKuliah();
    const { dataCPLQuery } = useDataCPL();

    // Hook untuk pemetaan CPL
    const {
        pemetaanData: apiPemetaanData,
        isLoading: isPemetaanLoading,
        storePemetaan,
        deletePemetaan,
        isStoring,
        isDeleting,
        refetch: refetchPemetaan
    } = usePemetaanCPL(mataKuliahId);

    // Mencari mata kuliah berdasarkan ID
    const mataKuliah = useMemo(() => {
        const data = mataKuliahQuery.data || [];
        return data.find(mk =>
            mk.id == mataKuliahId ||
            mk.mata_kuliah_id == mataKuliahId
        );
    }, [mataKuliahQuery.data, mataKuliahId]);

    // Data CPL
    const cplData = useMemo(() => dataCPLQuery.data || [], [dataCPLQuery.data]);

    // State untuk pemetaan dan modal - menggunakan data dari API
    const [pemetaanData, setPemetaanData] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    // Sync data dari API ke state lokal
    useEffect(() => {
        if (apiPemetaanData) {
            setPemetaanData(apiPemetaanData);
        }
    }, [apiPemetaanData]);

    // Memoized form fields dengan dropdown CPL dari API
    const formFields = useMemo(() => [
        {
            name: "cpl_id",
            label: "CPL",
            type: "select",
            placeholder: "Pilih CPL",
            required: true,
            className: "max-w-none text-wrap", // Memungkinkan lebar penuh
            options: cplData.map(cpl => ({
                value: cpl.id,
                label: `${cpl.kode_cpl} - ${cpl.nama_cpl}`
            }))
        },
        {
            name: "bobot",
            label: "Bobot (%)",
            type: "number",
            placeholder: "Masukkan bobot dalam persen (0-100)",
            required: true,
            min: 0,
            max: 100
        }
    ], [cplData]);

    // Loading states yang terpisah
    const isInitialLoading = mataKuliahQuery.isLoading || dataCPLQuery.isLoading;
    const isPemetaanDataLoading = isPemetaanLoading;

    const handleBack = () => {
        navigate("/dashboard/admin_prodi/pemetaan_cpl");
    };

    const handleAddCPL = useCallback(() => {
        setEditData(null);
        setIsFormOpen(true);
    }, []);

    const handleEditCPMK = useCallback((cplId) => {
        // Logic untuk edit CPMK
        console.log("Edit CPMK for CPL:", cplId);
    }, []);

    // Fungsi untuk menghapus CPL dari pemetaan
    const handleDeleteCPL = useCallback((cplId) => {
        try {
            // Filter out CPL yang akan dihapus
            const updatedPemetaanData = pemetaanData.filter(item =>
                item.cpl_id !== cplId && item.id !== cplId
            );

            // Jika masih ada data, kirim update ke API
            if (updatedPemetaanData.length > 0) {
                const cplsToSend = updatedPemetaanData.map(item => ({
                    cpl_id: item.cpl_id,
                    bobot: item.bobot
                }));

                storePemetaan(parseInt(mataKuliahId), cplsToSend);
            } else {
                // Jika tidak ada data tersisa, hapus semua pemetaan
                // Anda bisa menambahkan endpoint khusus untuk ini jika diperlukan
                setPemetaanData([]);
                toast.success('Pemetaan CPL berhasil dihapus');
            }
        } catch (error) {
            toast.error('Gagal menghapus pemetaan CPL');
            console.error('Error:', error);
        }
    }, [pemetaanData, mataKuliahId, storePemetaan]);

    // Fungsi untuk menambah CPMK
    const handleAddCPMK = useCallback((cplId) => {
        // Logic untuk menambah CPMK
        console.log("Add CPMK for CPL:", cplId);
        // Implementasi logika tambah CPMK di sini
    }, []);

    const handleSubmitPemetaan = useCallback((formData) => {
        try {
            // Validasi input
            if (!formData.cpl_id || !formData.bobot) {
                toast.error('Semua field wajib diisi');
                return;
            }

            // Validasi bobot
            const bobotNum = parseFloat(formData.bobot);
            if (bobotNum < 0 || bobotNum > 100) {
                toast.error('Bobot harus antara 0-100%');
                return;
            }

            // Cek apakah CPL sudah ada dalam data lokal
            const existingCPL = pemetaanData.find(item =>
                item.cpl_id === parseInt(formData.cpl_id) || item.cpl_id === formData.cpl_id
            );
            if (existingCPL && !editData) {
                toast.error('CPL sudah ditambahkan ke pemetaan');
                return;
            }

            // Siapkan data untuk dikirim ke API
            const newCPLData = {
                cpl_id: parseInt(formData.cpl_id),
                bobot: bobotNum
            };

            // Jika edit, update data yang sudah ada
            if (editData) {
                // Update existing local data
                const updatedPemetaanData = pemetaanData.map(item => {
                    if (item.id === editData.id) {
                        return {
                            ...item,
                            cpl_id: newCPLData.cpl_id,
                            bobot: newCPLData.bobot
                        };
                    }
                    return item;
                });

                // Kirim ke API dengan data yang sudah diupdate
                const cplsToSend = updatedPemetaanData.map(item => ({
                    cpl_id: item.cpl_id,
                    bobot: item.bobot
                }));

                storePemetaan(parseInt(mataKuliahId), cplsToSend);
            } else {
                // Tambah data baru
                const currentCPLs = pemetaanData.map(item => ({
                    cpl_id: item.cpl_id,
                    bobot: item.bobot
                }));

                // Tambahkan CPL baru
                const updatedCPLs = [...currentCPLs, newCPLData];

                // Kirim ke API
                storePemetaan(parseInt(mataKuliahId), updatedCPLs);
            }

            setIsFormOpen(false);
            setEditData(null);
        } catch (error) {
            toast.error('Gagal menyimpan pemetaan CPL');
            console.error('Error:', error);
        }
    }, [pemetaanData, mataKuliahId, editData, storePemetaan]);

    const handleCancelForm = useCallback(() => {
        setIsFormOpen(false);
        setEditData(null);
    }, []);




    if (!mataKuliah) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-red-600 mb-2">
                        Mata Kuliah Tidak Ditemukan
                    </h3>
                    <button
                        onClick={handleBack}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Kembali ke Daftar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header dengan tombol back */}
            <div className="mb-6">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
                >
                    <AiOutlineArrowLeft size={20} />
                    <span>Kembali ke Daftar Mata Kuliah</span>
                </button>

            </div>

            {/* Informasi Kelas */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Informasi Kelas</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Kode Mata Kuliah</p>
                        <p className="font-semibold text-lg">
                            {mataKuliah.kode_mata_kuliah || mataKuliah.kode || 'IF2022301'}
                        </p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">Nama Mata Kuliah</p>
                        <p className="font-semibold text-lg">
                            {mataKuliah.nama_mata_kuliah || mataKuliah.nama || 'STRUKTUR DATA'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabel Pemetaan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">


                <table className="w-full">
                    <thead className="bg-blue-100">
                        <tr>
                            <th className="p-4 text-left">
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleAddCPL}
                                        className={`flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition ${isStoring ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        disabled={isStoring}
                                    >
                                        <AiOutlinePlus size={12} />
                                        <span>{isStoring ? 'Menyimpan...' : 'Tambah'}</span>
                                    </button>
                                    <span>CPL</span>
                                </div>
                            </th>
                            <th className="p-4 text-left">CPMK</th>
                            <th className="p-4 text-center">Bobot CPMK</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isPemetaanDataLoading ? (
                            <TableSkeleton columns={4} rows={3} />
                        ) : pemetaanData.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <p>Tidak ada pemetaan CPL. Silahkan tambahkan terlebih dahulu</p>
                                        <button
                                            onClick={handleAddCPL}
                                            className={`mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition ${isStoring ? 'opacity-50 cursor-not-allowed' : ''
                                                }`}
                                            disabled={isStoring}
                                        >
                                            {isStoring ? 'Menyimpan...' : 'Tambah Pemetaan CPL'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            pemetaanData.map((pemetaan, index) => {
                                // Cari data CPL dari API untuk ditampilkan
                                const cplInfo = cplData.find(cpl =>
                                    cpl.id === pemetaan.cpl_id ||
                                    cpl.id === parseInt(pemetaan.cpl_id)
                                );

                                return (
                                    <tr key={pemetaan.id || index} className="hover:bg-gray-50 transition">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleDeleteCPL(pemetaan.cpl_id || pemetaan.id)}
                                                    className={`flex items-center gap-1 text-red-600 hover:text-red-800 transition ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                    disabled={isDeleting}
                                                >
                                                    <AiFillDelete size={20} />
                                                </button>
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {cplInfo?.kode_cpl || pemetaan.cpl_data?.kode_cpl || 'N/A'}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        {cplInfo?.nama_cpl || pemetaan.cpl_data?.nama_cpl || 'Nama CPL tidak tersedia'}
                                                    </p>
                                                    <button
                                                        onClick={() => handleAddCPMK(pemetaan.cpl_id || pemetaan.id)}
                                                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                                                    >
                                                        <AiFillPlusSquare size={25} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-700">
                                            <span className="text-gray-500">Tidak ada</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span className="font-medium text-gray-800">{pemetaan.bobot}%</span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <button
                                                onClick={() => handleEditCPMK(pemetaan.cpl_id)}
                                                className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
                                            >
                                                <FiEdit2 size={14} />
                                                <span>Edit</span>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Form Modal */}
            <FormBox
                isOpen={isFormOpen}
                onCancel={handleCancelForm}
                title={editData ? "Edit Pemetaan CPL" : "Tambah Data CPL"}
                subtitle={editData ? "Perbarui data pemetaan CPL" : "Pilih CPL dan tentukan bobot untuk mata kuliah ini"}
                fields={formFields}
                initialData={editData || {}}
                onSubmit={handleSubmitPemetaan}
                submitText={editData ? "Perbarui" : "Simpan"}
                isLoading={isStoring}
            />
        </div>
    );
};

export default DetailPemetaanProdi;
