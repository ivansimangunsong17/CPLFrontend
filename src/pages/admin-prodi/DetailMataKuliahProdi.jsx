import React, { useState, useMemo, useEffect, useCallback, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from 'react-icons/ai';
import { toast } from 'react-toastify';
import ConfirmModal from '../../components/Modal/ConfModal';
import FormBox from '../../components/Form/FormBox';
import LoadingScreen from '../../components/LoadingScreen';
import TableSkeleton from '../../components/TableSkeleton';
import { useCPMK } from '../../hooks/admin-prodi/useCPMK';
import { AuthContext } from '../../context/AuthContext';
import { getMataKuliah } from '../../services/admin-prodi/DataMataKuliahService';

const DetailMatakuliahProdi = () => {
    const { user } = useContext(AuthContext);
    const { mataKuliahId } = useParams();
    const { cpmkQuery, createMutation, updateMutation, deleteMutation } = useCPMK(mataKuliahId);

    const [mataKuliahInfo, setMataKuliahInfo] = useState({ kode_mata_kuliah: '', nama_mata_kuliah: '' });
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const data = useMemo(() => {
        // cpmkQuery.data sudah berupa array dari hook
        return Array.isArray(cpmkQuery.data) ? cpmkQuery.data : [];
    }, [cpmkQuery.data]);
    const isLoading = cpmkQuery.isLoading;
    const error = cpmkQuery.error;

    const filteredData = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return data.filter((item) =>
            (item.kode_cpmk || '').toLowerCase().includes(term) ||
            (item.nama_cpmk || '').toLowerCase().includes(term) ||
            (item.deskripsi || '').toLowerCase().includes(term)
        );
    }, [data, searchTerm]);

    const isAllSelected = useMemo(() => {
        const allIds = filteredData.map((item) => item.cpmk_id);
        return allIds.length > 0 && allIds.every((id) => selectedRows.includes(id));
    }, [filteredData, selectedRows]);

    useEffect(() => {
        console.log('mataKuliahId:', mataKuliahId);
        console.log('Raw CPMK data:', cpmkQuery.data);
        console.log('Filtered data:', data);
    }, [mataKuliahId, cpmkQuery.data, data]);

    useEffect(() => {
        if (mataKuliahId) {
            getMataKuliah()
                .then((mataKuliahs) => {
                    const matkul = mataKuliahs.find((mk) => mk.mata_kuliah_id === Number(mataKuliahId));
                    if (matkul) {
                        setMataKuliahInfo({
                            kode_mata_kuliah: matkul.kode_mata_kuliah,
                            nama_mata_kuliah: matkul.nama_mata_kuliah,
                        });
                    }
                })
                .catch(() => toast.error('Gagal mengambil informasi mata kuliah'));
        }
    }, [mataKuliahId]);

    const formFields = [
        { name: 'kode_cpmk', label: 'Kode CPMK', type: 'text', required: true },
        { name: 'nama_cpmk', label: 'Nama CPMK', type: 'text', required: true },
        { name: 'deskripsi', label: 'Deskripsi', type: 'textarea', required: true },
    ];

    const handleSubmit = useCallback(
        (formData) => {
            if (!user?.prodi_id) {
                toast.error('Informasi program studi tidak ditemukan');
                return;
            }
            const payload = {
                ...formData,
                mata_kuliah_id: Number(mataKuliahId),
                prodi_id: Number(user.prodi_id),
            };
            if (editData) {
                updateMutation.mutate({ ...payload, id: editData.cpmk_id });
            } else {
                createMutation.mutate(payload);
            }
            setIsFormOpen(false);
            setEditData(null);
        },
        [editData, mataKuliahId, user, createMutation, updateMutation]
    );

    const handleDelete = useCallback(() => {
        if (selectedRows.length === 0) {
            toast.error('Pilih CPMK yang ingin dihapus');
            return;
        }

        deleteMutation.mutate(selectedRows, {
            onSuccess: () => {
                toast.success(`${selectedRows.length} CPMK berhasil dihapus`);
                setIsModalOpen(false);
                setSelectedRows([]);
            },
            onError: (error) => {
                toast.error(error.response?.data?.message || 'Gagal menghapus CPMK');
                setIsModalOpen(false);
            }
        });
    }, [selectedRows, deleteMutation]);


    const toggleSelectRow = (id) => {
        setSelectedRows((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

    const toggleSelectAll = () => {
        setSelectedRows(isAllSelected ? [] : filteredData.map((item) => item.cpmk_id));
    };

    if (error) return <div className="text-red-500">Error: {error.message}</div>;

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {(createMutation.isPending || updateMutation.isPending || deleteMutation.isPending) && <LoadingScreen />}

            {/* Header */}
            <div className="mb-6 bg-white p-4 shadow rounded-lg flex justify-between">
                <div>
                    <p className="text-sm text-gray-500">Kode Mata Kuliah</p>
                    <p className="text-lg font-bold">{mataKuliahInfo.kode_mata_kuliah || '-'}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Nama Mata Kuliah</p>
                    <p className="text-lg font-bold">{mataKuliahInfo.nama_mata_kuliah || '-'}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Capaian Pembelajaran Mata Kuliah (CPMK)</h2>
                <div className="flex gap-3">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedRows.length > 0 ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-500'
                            }`}
                        disabled={selectedRows.length === 0}
                        onClick={() => setIsModalOpen(true)}
                    >
                        <AiFillDelete size={20} />
                        <span>Hapus</span>
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => setIsFormOpen(true)}
                    >
                        <AiOutlinePlus size={20} />
                        <span>Tambah CPMK</span>
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Cari CPMK..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-blue-100 text-black">
                        <tr>
                            <th className="p-4 w-12 text-center">
                                <input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} />
                            </th>
                            <th className="p-4 text-left">Kode</th>
                            <th className="p-4 text-left">Nama CPMK</th>
                            <th className="p-4 text-left">Deskripsi</th>
                            <th className="p-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <TableSkeleton rows={5} columns={4} />
                        ) : filteredData.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-gray-500">
                                    {searchTerm ? 'Tidak ada data yang sesuai pencarian' : 'Belum ada data CPMK'}
                                </td>
                            </tr>
                        ) : (
                            filteredData.map((item) => (
                                <tr key={item.cpmk_id} className="hover:bg-gray-50">
                                    <td className="p-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.cpmk_id)}
                                            onChange={() => toggleSelectRow(item.cpmk_id)}
                                        />
                                    </td>
                                    <td className="p-4">{item.kode_cpmk}</td>
                                    <td className="p-4">{item.nama_cpmk}</td>
                                    <td className="p-4">{item.deskripsi}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setEditData(item);
                                                    setIsFormOpen(true);
                                                }}
                                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                            >
                                                <AiFillEdit size={20} />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setSelectedRows([item.cpmk_id]);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-1 text-red-600 hover:bg-red-100 rounded"
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

            {/* Confirm Delete */}
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleDelete}
                title="Konfirmasi Hapus"
                description={`Anda yakin ingin menghapus ${selectedRows.length} CPMK yang dipilih?`}
                confirmText="Hapus"
                isLoading={deleteMutation.isPending}
            />

            {/* Form Add/Edit */}
            <FormBox
                isOpen={isFormOpen}
                onCancel={() => {
                    setIsFormOpen(false);
                    setEditData(null);
                }}
                title={editData ? 'Edit CPMK' : 'Tambah CPMK Baru'}
                subtitle={editData ? 'Perbarui informasi CPMK' : 'Lengkapi data CPMK baru'}
                fields={formFields}
                initialData={
                    editData
                        ? {
                            kode_cpmk: editData.kode_cpmk,
                            nama_cpmk: editData.nama_cpmk,
                            deskripsi: editData.deskripsi,
                        }
                        : {}
                }
                onSubmit={handleSubmit}
                submitText={editData ? 'Perbarui' : 'Tambah'}
                isLoading={editData ? updateMutation.isPending : createMutation.isPending}
            />
        </div>
    );
};

export default DetailMatakuliahProdi;
