// Updated version of DetailPemetaanProdi with clean CRUD handling, unified loading screen, and concise success/error toasts

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
        pemetaanQuery,
        createMutation,
        updateMutation,
        deleteMutation,
    } = usePemetaanCPL(mataKuliahId);

    const isInitialLoading = mataKuliahQuery.isLoading || pemetaanQuery.isLoading;
    const isMutating = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;
    const pemetaanData = pemetaanQuery.data;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isLoadingScreen, setIsLoadingScreen] = useState(false);

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
        // Validasi input untuk create
        if (!editData && (!formData.cpl_id || !formData.bobot)) {
            return toast.error("Semua field wajib diisi");
        }
        // Validasi input untuk edit
        if (editData && !formData.bobot) {
            return toast.error("Bobot wajib diisi");
        }

        const bobot = parseFloat(formData.bobot);
        if (bobot < 0 || bobot > 100) {
            return toast.error("Bobot harus antara 0-100");
        }

        try {
            const mata_kuliah_id = parseInt(mataKuliahId);
            const isEdit = Boolean(editData);

            // Tampilkan loading screen
            setIsLoadingScreen(true);

            // Tunggu mutasi selesai
            if (isEdit) {
                await updateMutation.mutateAsync({
                    mata_kuliah_id: mata_kuliah_id,
                    cpls: [{
                        cpl_id: parseInt(editData.cpl_id),
                        bobot: parseFloat(formData.bobot).toFixed(2)
                    }]
                });
            } else {
                await createMutation.mutateAsync({
                    mata_kuliah_id: mata_kuliah_id,
                    cpl_id: parseInt(formData.cpl_id),
                    bobot: bobot.toString()
                });
            }

            // Pastikan data diperbarui sebelum menutup form
            await pemetaanQuery.refetch();

            // Tutup form dan loading screen, lalu tampilkan pesan sukses
            setIsFormOpen(false);
            setEditData(null);
            setIsLoadingScreen(false);
            toast.success("Pemetaan berhasil ditambahkan");
        } catch (err) {
            console.error(err);
            setIsLoadingScreen(false);
            toast.error(err?.response?.data?.message || "Terjadi kesalahan saat menyimpan data");
        }
    };

    const handleConfirmDelete = async () => {
        try {
            // Tampilkan loading screen
            setIsLoadingScreen(true);

            // Tunggu mutasi selesai
            await deleteMutation.mutateAsync({
                action: 'delete',
                mata_kuliah_id: parseInt(mataKuliahId),
                cpl_id: null,
            });

            // Pastikan data diperbarui sebelum menutup modal
            await pemetaanQuery.refetch();

            // Tutup modal dan loading screen, lalu tampilkan pesan sukses
            setIsConfirmOpen(false);
            setIsLoadingScreen(false);
            toast.success("Semua pemetaan berhasil dihapus");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Gagal menghapus data");
        }
    };

    const handleDeleteItem = async (cplId) => {
        try {
            // Tampilkan loading screen
            setIsLoadingScreen(true);

            // Tunggu mutasi selesai
            await deleteMutation.mutateAsync({
                action: 'delete',
                mata_kuliah_id: parseInt(mataKuliahId),
                cpl_id: cplId,
            });

            // Pastikan data diperbarui
            await pemetaanQuery.refetch();

            // Tutup loading screen
            setIsLoadingScreen(false);
            toast.success("Pemetaan berhasil dihapus");
        } catch (err) {
            console.error(err);
            toast.error(err?.response?.data?.message || "Gagal menghapus data");
        }
    };

    if (isInitialLoading) {
        return (
            <div className="p-6 max-w-7xl mx-auto space-y-6">
                <CardSkeleton />
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <table className="w-full">
                        <tbody>
                            <TableSkeleton columns={4} rows={3} />
                        </tbody>
                    </table>
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
            {isLoadingScreen && (
                <LoadingScreen
                    message={
                        createMutation.isPending
                            ? "Menyimpan pemetaan..."
                            : updateMutation.isPending
                                ? "Mengupdate pemetaan..."
                                : "Menghapus pemetaan..."
                    }
                />
            )}

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

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <div className="flex justify-between items-center px-4 py-3 border-b">
                    <h3 className="font-semibold text-gray-700">Daftar Pemetaan CPL</h3>
                    <div className="flex gap-3">
                        <button
                            onClick={handleAddCPL}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                            disabled={isMutating}
                        >
                            <AiOutlinePlus size={14} /> Tambah
                        </button>
                        {pemetaanData?.length > 0 && (
                            <button
                                onClick={() => setIsConfirmOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                                disabled={isMutating}
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
                            <th className="p-4 text-center">Bobot CPMK</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {pemetaanData?.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    Tidak ada pemetaan CPL.
                                </td>
                            </tr>
                        ) : (
                            pemetaanData?.map((item) => (
                                <tr key={item.cpl_id} className="hover:bg-blue-50">
                                    <td className="p-4">
                                        <p className="font-semibold">{item.kode_cpl}</p>
                                        <p className="text-sm  text-black text-justify list-disc italic">{item.deskripsi}</p>
                                        <span className="text-xs text-white bg-green-500 p-0.5 m-0.5 rounded-lg ">Jumblah Bobot CPL {item.pivot?.bobot || 0}%</span>
                                        <button
                                            // onClick={() => handleAddCPMK(item.cpmk_id)}
                                            className="flex items-center px-1 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
                                            disabled={isMutating}
                                        >
                                            Tambah CPMK
                                        </button>
                                    </td>
                                    <tr key={item.cpl_id}>
                                        <td className="p-4">
                                            <p className="font-semibold">{item.kode_cpl}</p>
                                            <p className="list-disc text-sm text-gray-600 italic">{item.deskripsi || "Belum ada CPMK"}</p>
                                        </td>
                                    </tr>

                                    <td className="p-4 text-center font-semibold">
                                        {/* {item.pivot?.bobot || 0}% */}
                                    </td>
                                    <td className="p-4 text-center space-x-2">
                                        <button
                                            onClick={() => handleDeleteItem(item.cpl_id)}
                                            className="text-red-600 hover:text-red-800"
                                            disabled={isMutating}
                                        >
                                            <AiFillDelete size={20} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditData(item);
                                                setIsFormOpen(true);
                                            }}
                                            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200"
                                            disabled={isMutating}
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
                    isLoading={isMutating}
                    pemetaanData={pemetaanData}
                />
            )}

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                message="Apakah Anda yakin ingin menghapus semua pemetaan CPL?"
            />
        </div>
    );
};

export default DetailPemetaanProdi;