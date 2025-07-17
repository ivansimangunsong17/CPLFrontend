import React, { useState } from 'react';
import {
  AiFillDelete,
  AiOutlinePlus,
  AiFillEdit,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "../../components/LoadingScreen";
import {
  useProdiList,
  useDeleteProdi,
  useAddProdi,
  useUpdateProdi,
} from "../../hooks/admin-universitas/useDataProdi";
import ConfirmModal from '../../components/Modal/ConfModal';
import FormBox from '../../components/Form/FormBox';
import TableSkeleton from '../../components/TableSkeleton';

const DataProdiUniv = () => {
  const { data: prodiList, isLoading, isError } = useProdiList();
  const deleteMutation = useDeleteProdi();
  const addMutation = useAddProdi();
  const updateMutation = useUpdateProdi();

  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFormProdi, setActiveFormProdi] = useState(null);

  const FakultasList = Array.from(
    new Map(
      (prodiList || []).map((item) => [
        item.fakultas.fakultas_id,
        {
          value: item.fakultas.fakultas_id,
          label: item.fakultas.nama_fakultas,
        },
      ])
    ).values()
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((val) => val !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === prodiList?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(prodiList?.map((item) => item.prodi_id) || []);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    setIsDeleting(true);

    const results = await Promise.all(
      selectedIds.map((id) =>
        new Promise((resolve) => {
          deleteMutation.mutate(id, {
            onSuccess: () => resolve({ id, success: true }),
            onError: () => resolve({ id, success: false }),
          });
        })
      )
    );

    const failed = results.filter(r => !r.success);
    if (failed.length > 0) {
      toast.error(`${failed.length} Data gagal dihapus`);
    } else {
      toast.success("Data berhasil dihapus");
    }

    setSelectedIds([]);
    setIsDeleting(false);
  };

  const isAllSelected = prodiList?.length > 0 && selectedIds.length === prodiList.length;

  const handleFormSubmit = async (formData) => {
    if (formData.prodi_id) {
      updateMutation.mutate(formData, {
        onSuccess: () => {
          setActiveFormProdi(null);
          toast.success("Program Studi berhasil diperbarui");
        },
        onError: () => {
          toast.error("Gagal memperbarui Program Studi");
        },
      });
    } else {
      addMutation.mutate(formData, {
        onSuccess: () => {
          setActiveFormProdi(null);
          toast.success("Program Studi berhasil ditambahkan");
        },
        onError: () => {
          toast.error("Gagal menambahkan Program Studi");
        },
      });
    }
  };

  const formFields = [
    { name: 'kode_prodi', label: 'Kode Prodi', type: 'text', required: true },
    { name: 'nama_prodi', label: 'Nama Program Studi', type: 'text', required: true },
    {
      name: 'fakultas_id',
      label: 'Fakultas',
      type: 'select',
      required: true,
      options: FakultasList,
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      {(() => {
        if (addMutation.isPending) return <LoadingScreen message="Menambahkan Program Studi..." />;
        if (updateMutation.isPending) return <LoadingScreen message="Memperbarui Program Studi..." />;
        if (deleteMutation.isPending) return <LoadingScreen message="Menghapus Program Studi..." />;
        return null;
      })()}
      {/* Error Handling */}
      {isError && (
        <div className="text-red-600 mb-4 text-center">
          Terjadi kesalahan saat mengambil data program studi.
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Program Studi</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={selectedIds.length === 0 || isDeleting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedIds.length > 0 && !isDeleting
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            <AiFillDelete size={18} />
            <span>{isDeleting ? "Menghapus..." : "Hapus"}</span>
          </button>
          <button
            onClick={() => setActiveFormProdi({})}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <AiOutlinePlus size={18} />
            <span>Tambah Prodi</span>
          </button>
        </div>
      </div>

      {/* Tabel */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-200 text-black">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-500"
                    onChange={toggleSelectAll}
                    checked={isAllSelected}
                  />
                </th>
                {["Kode Prodi", "Nama Program Studi", "Fakultas", "Aksi"].map((label, idx) => (
                  <th key={idx} className="p-4 text-left">
                    <div className="flex items-center gap-1">
                      {label} <AiOutlineArrowDown size={14} />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                <TableSkeleton rows={3} />
              ) : prodiList?.length > 0 ? (
                prodiList.map((item) => (
                  <tr key={item.prodi_id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-500"
                        checked={selectedIds.includes(item.prodi_id)}
                        onChange={() => toggleSelect(item.prodi_id)}
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.kode_prodi}</td>
                    <td className="p-4">{item.nama_prodi}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {item.fakultas?.nama_fakultas || "-"}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-3 items-center">
                        <button
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          onClick={() => setActiveFormProdi(item)}
                        >
                          <AiFillEdit size={20} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                          onClick={() => {
                            setSelectedIds([item.prodi_id]);
                            setIsModalOpen(true);
                          }}
                        >
                          <AiFillDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400 italic">
                    Tidak ada data tersedia.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>

        {/* Modal Konfirmasi Hapus */}
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={async () => {
            await handleDelete();
            setIsModalOpen(false);
          }}
          message={"Apakah Anda yakin ingin menghapus data Program Studi?"}
        />

        {/* Form Tambah/Edit */}
        <FormBox
          title={activeFormProdi?.prodi_id ? 'Edit Program Studi' : 'Tambah Program Studi'}
          isOpen={!!activeFormProdi}
          fields={formFields}
          initialData={activeFormProdi || { kode_prodi: '', nama_prodi: '', fakultas_id: '' }}
          onSubmit={handleFormSubmit}
          onCancel={() => setActiveFormProdi(null)}
          isLoading={addMutation.isPending || updateMutation?.isPending}
        />
      </div>
    </div>
  );
};

export default DataProdiUniv;