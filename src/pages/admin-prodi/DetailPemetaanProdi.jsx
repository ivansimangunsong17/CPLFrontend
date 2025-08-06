import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    AiFillDelete,
    AiOutlineArrowLeft,
    AiOutlinePlus,
} from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

// Hooks
import { useMataKuliah } from "../../hooks/admin-prodi/useMataKuliah";
import { useDataCPL } from "../../hooks/admin-prodi/useDataCPL";
import { usePemetaanCPL } from "../../hooks/admin-prodi/usePemetaanCPL";

// Components
import FormPemetaanCPL from "../../components/Form/FormPemetaanCPL";
import ConfirmModal from "../../components/Modal/ConfModal";
import TableSkeleton from "../../components/TableSkeleton";
import CardSkeleton from "../../components/CardSkeleton";
import LoadingScreen from "../../components/LoadingScreen";

const DetailPemetaanProdi = () => {
    const { mataKuliahId } = useParams();
    const navigate = useNavigate();

    const { mataKuliahQuery } = useMataKuliah();
    const { dataCPLQuery } = useDataCPL();
    const {
        pemetaanData,
        isLoading: isPemetaanLoading,
        storePemetaan,
        updatePemetaan,
        deletePemetaan,
        isStoring,
        isUpdating,
        isDeleting,
    } = usePemetaanCPL(mataKuliahId);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleBack = () => navigate("/dashboard/admin_prodi/pemetaan_cpl");

    const mataKuliah = useMemo(() => {
        const data = mataKuliahQuery.data || [];
        return data.find(
            (mk) => mk.id == mataKuliahId || mk.mata_kuliah_id == mataKuliahId
        );
    }, [mataKuliahQuery.data, mataKuliahId]);

    const cplData = useMemo(() => {
        const allCPL = dataCPLQuery.data || [];
        const mappedIds = new Set(pemetaanData?.map((item) => item.cpl_id) || []);
        if (editData) mappedIds.delete(editData.cpl_id);
        return allCPL.filter((cpl) => !mappedIds.has(cpl.id));
    }, [dataCPLQuery.data, pemetaanData, editData]);

    const handleAddCPL = () => {
        setEditData(null);
        setIsFormOpen(true);
    };

    const handleSubmitPemetaan = async (formData) => {
        if (!formData.cpl_id || !formData.bobot) {
            toast.error("Semua field wajib diisi");
            return;
        }

        const bobot = parseFloat(formData.bobot);
        if (bobot < 0 || bobot > 100) {
            toast.error("Bobot harus antara 0-100");
            return;
        }

        try {
            if (editData) {
                await updatePemetaan({
                    pemetaan_id: editData.pemetaan_id,
                    bobot,
                });
            } else {
                await storePemetaan({
                    mata_kuliah_id: parseInt(mataKuliahId),
                    cpl_id: parseInt(formData.cpl_id),
                    bobot,
                });
            }

            await refetch(); // ✅ Pastikan data terbaru muncul
            setIsFormOpen(false);
        } catch (error) {
            toast.error("Gagal menyimpan pemetaan");
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await deletePemetaan({
                mata_kuliah_id: parseInt(mataKuliahId),
                cpl_id: null, // Hapus semua
            });
            await refetch(); // ✅ Refresh data setelah hapus
            setIsConfirmOpen(false);
        } catch {
            toast.error("Gagal menghapus pemetaan");
        }
    };

    const handleDeleteItem = (cplId) => {
        deletePemetaan({ mata_kuliah_id: parseInt(mataKuliahId), cpl_id: cplId });
    };

    if (mataKuliahQuery.isLoading) {
        return (
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <CardSkeleton />
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <TableSkeleton columns={4} rows={3} />
                </div>
            </div>
        );
    }

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
            {(isStoring || isUpdating || isDeleting) && (
                <LoadingScreen
                    message={
                        isStoring
                            ? "Menyimpan pemetaan..."
                            : isUpdating
                                ? "Mengupdate pemetaan..."
                                : "Menghapus pemetaan..."
                    }
                />
            )}

            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
                >
                    <AiOutlineArrowLeft size={20} />
                    <span>Kembali</span>
                </button>
                <h2 className="text-xl font-semibold text-gray-800">
                    Pemetaan CPL - {mataKuliah.nama_mata_kuliah}
                </h2>
            </div>

            {/* Card Info */}
            <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg text-center bg-gray-50">
                        <p className="text-sm text-gray-500">Kode Mata Kuliah</p>
                        <p className="font-semibold">{mataKuliah.kode_mata_kuliah}</p>
                    </div>
                    <div className="p-3 border rounded-lg text-center bg-gray-50">
                        <p className="text-sm text-gray-500">Nama Mata Kuliah</p>
                        <p className="font-semibold">{mataKuliah.nama_mata_kuliah}</p>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h3 className="font-semibold text-gray-700">Daftar Pemetaan CPL</h3>
                    <div className="flex gap-3">
                        <button
                            onClick={handleAddCPL}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                            disabled={isStoring || isUpdating}
                        >
                            <AiOutlinePlus size={14} /> Tambah
                        </button>
                        {pemetaanData?.length > 0 && (
                            <button
                                onClick={() => setIsConfirmOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                                disabled={isDeleting}
                            >
                                <AiFillDelete size={14} /> Hapus Semua
                            </button>
                        )}
                    </div>
                </div>
                <table className="w-full">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="p-4 text-left">CPL</th>
                            <th className="p-4 text-left">CPMK</th>
                            <th className="p-4 text-center">Bobot</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {isPemetaanLoading ? (
                            <TableSkeleton columns={4} rows={3} />
                        ) : pemetaanData?.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    Tidak ada pemetaan CPL.
                                </td>
                            </tr>
                        ) : (
                            pemetaanData.map((item) => (
                                <tr key={item.cpl_id} className="hover:bg-blue-50">
                                    <td className="p-4">
                                        <p className="font-semibold">{item.kode_cpl}</p>
                                        <p className="text-sm text-gray-600">{item.nama_cpl}</p>
                                    </td>
                                    <td className="p-4 text-gray-700">Belum ada CPMK</td>
                                    <td className="p-4 text-center font-semibold">
                                        {item.pivot?.bobot || 0}%
                                    </td>
                                    <td className="p-4 text-center space-x-2">
                                        <button
                                            onClick={() => handleDeleteItem(item.cpl_id)}
                                            className="text-red-600 hover:text-red-800"
                                            disabled={isDeleting}
                                        >
                                            <AiFillDelete size={20} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditData(item);
                                                setIsFormOpen(true);
                                            }}
                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
                                            disabled={isUpdating || isDeleting}
                                        >
                                            <FiEdit2 size={14} /> Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <FormPemetaanCPL
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleSubmitPemetaan}
                    cplOptions={cplData}
                    initialData={editData}
                    isLoading={isStoring || isUpdating}
                />
            )}

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDeleteAll}
                message="Apakah Anda yakin ingin menghapus semua pemetaan CPL?"
            />
        </div>
    );
};

export default DetailPemetaanProdi;
