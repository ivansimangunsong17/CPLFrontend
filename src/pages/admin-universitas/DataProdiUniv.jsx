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
import { FaSearch } from 'react-icons/fa';

const DataProdiUniv = () => {
  const { data: prodiList, isLoading, isError } = useProdiList();
  const deleteMutation = useDeleteProdi();
  const addMutation = useAddProdi();
  const updateMutation = useUpdateProdi();

  const [selectedIds, setSelectedIds] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFormProdi, setActiveFormProdi] = useState(null);
  const [search, setSearch] = useState("");

  // 👉 Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  // 🔎 Filtering data
  const filteredData = (prodiList || []).filter(
    (item) =>
      item.nama_prodi.toLowerCase().includes(search.toLowerCase()) ||
      item.kode_prodi.toLowerCase().includes(search.toLowerCase()) ||
      item.fakultas.nama_fakultas.toLowerCase().includes(search.toLowerCase())
  );

  // 👉 Data per halaman
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Program Studi</h1>

        {/* 🔎 Input Search */}
      
        <div className="relative mt-4 sm:mt-0 w-full sm:w-auto sm:max-w-xs">
          <input
            type="text"
            placeholder="Cari Program Studi..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset ke halaman 1 kalau searching
            }}
          />
          <button className="absolute right-0 top-0 h-full px-3 bg-blue-500 text-white rounded-r-lg flex items-center justify-center">
            <FaSearch />
          </button>
        </div>



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
              ) : currentData.length > 0 ? (
                currentData.map((item) => (
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
                    Tidak ada data ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 📌 Pagination */}
        {/* 📌 Pagination */}
        <div className="flex justify-center items-center space-x-2 p-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-gray-500 hover:text-blue-600 disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (page === 1 || page === totalPages) return true;
              if (page >= currentPage - 1 && page <= currentPage + 1) return true;
              return false;
            })
            .map((page, idx, arr) => {
              const prevPage = arr[idx - 1];
              return (
                <React.Fragment key={page}>
                  {/* Tambah "..." kalau ada gap */}
                  {prevPage && page - prevPage > 1 && (
                    <span className="px-2 text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded-lg transition ${currentPage === page
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                </React.Fragment>
              );
            })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-gray-500 hover:text-blue-600 disabled:opacity-40"
          >
            ›
          </button>
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
