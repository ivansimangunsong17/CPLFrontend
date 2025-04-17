import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";
import ConfirmModal from "../../components/Modal/ConfModal";
import BaseModal from "../../components/Modal/BasedModal";
import FormData from "../../components/Form/FormData";

const DataMatakuliahProdi = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dosenOptions = [
    "Prof. Dr. Ahmad Fauzi, M.Kom.",
    "Dr. Siti Aminah, M.T.",
    "Dr. Budi Santoso, S.T., M.Sc.",
    "Dewi Kusuma, S.T., M.Eng."
  ];

  const [data, setData] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      kode: `MK${index < 9 ? '0' + (index + 1) : index + 1}`,
      nama: `Mata Kuliah ${index + 1}`,
      sks: (index % 4) + 2,
      semester: (index % 8) + 1,
      dosen: dosenOptions[index % dosenOptions.length],
      status: index % 2 === 0 ? "Aktif" : "Nonaktif"
    }))
  );

  const formFields = [
    {
      name: "kode",
      label: "Kode MK",
      type: "text",
      placeholder: "Masukkan kode mata kuliah",
      required: true,
    },
    {
      name: "nama",
      label: "Nama Mata Kuliah",
      type: "text",
      placeholder: "Masukkan nama mata kuliah",
      required: true,
    },
    {
      name: "sks",
      label: "SKS",
      type: "number",
      placeholder: "Masukkan jumlah SKS",
      required: true,
    },
    {
      name: "dosen",
      label: "Dosen Pengampu",
      type: "select",
      options: dosenOptions,
      required: true,
    },
  ];
  

  const toggleSelectAll = () => {
    setAllSelected(!allSelected);
    setSelectedRows(!allSelected ? data.map((item) => item.id) : []);
  };

  const toggleSelectRow = (id) => {
    const newSelected = selectedRows.includes(id)
      ? selectedRows.filter((row) => row !== id)
      : [...selectedRows, id];
    setSelectedRows(newSelected);
    setAllSelected(newSelected.length === data.length);
  };

  const handleDelete = () => {
    setData(data.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
    setAllSelected(false);
    setIsModalOpen(false);
  };

  const handleAddMatakuliah = (formData) => {
    if (editData) {
      setData(data.map(item => item.id === editData.id ? { ...item, ...formData } : item));
    } else {
      const newMatakuliah = {
        id: Math.max(...data.map(item => item.id)) + 1,
        ...formData
      };
      setData([...data, newMatakuliah]);
    }
    setIsFormOpen(false);
    setEditData(null);
  };

  const openEditModal = (item) => {
    setEditData(item);
    setIsFormOpen(true);
  };

  const filteredData = data.filter(item =>
    item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.kode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Mata Kuliah Program Studi</h1>
        <div className="flex gap-3">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedRows.length > 0
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            disabled={selectedRows.length === 0}
            onClick={() => setIsModalOpen(true)}
          >
            <AiFillDelete size={18} />
            <span>Hapus</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
            <FiDownloadCloud size={18} />
            <span>Export</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => setIsFormOpen(true)}
          >
            <AiOutlinePlus size={18} />
            <span>Tambah</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Cari mata kuliah atau kode..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">Kode MK</th>
                <th className="p-4 text-left">Nama Mata Kuliah</th>
                <th className="p-4 text-left">SKS</th>
                <th className="p-4 text-left">Dosen Pengampu</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleSelectRow(item.id)}
                      className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">{item.kode}</td>
                  <td className="p-4">{item.nama}</td>
                  <td className="p-4">{item.sks}</td>
                  <td className="p-4">{item.dosen}</td>
                  <td className="p-4">
                    <button
                      onClick={() => openEditModal(item)}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                    >
                      <AiFillEdit size={16} />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Konfirmasi Hapus"
        description={`Anda akan menghapus ${selectedRows.length} mata kuliah. Lanjutkan?`}
        confirmText="Hapus"
        cancelText="Batal"
      />

      {/* Form Modal */}
      {isFormOpen && (
        <BaseModal
          title={editData ? "Edit Mata Kuliah" : "Tambah Mata Kuliah Baru"}
          onClose={() => {
            setIsFormOpen(false);
            setEditData(null);
          }}
        >
          <FormData
            fields={formFields.map(field => ({
              ...field,
              defaultValue: editData ? editData[field.name] : ""
            }))}
            onSubmit={handleAddMatakuliah}
            onCancel={() => {
              setIsFormOpen(false);
              setEditData(null);
            }}
          />
        </BaseModal>
      )}
    </div>
  );
};

export default DataMatakuliahProdi;