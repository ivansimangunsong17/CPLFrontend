import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";
import ConfirmModal from "../../components/Modal/ConfModal";
import BaseModal from "../../components/Modal/BasedModal";
import FormData from "../../components/Form/FormData";

const DataMahasiswaProdi = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const statusOptions = ["Tercapai", "Tidak Tercapai", "Selesai", "Belum Dinilai"];

  const [data, setData] = useState(
    Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      nama: `Mahasiswa ${index + 1}`,
      npm: `20150610${index < 9 ? "0" + (index + 1) : index + 1}`,
      angkatan: 2020 + (index % 4),
      status: statusOptions[index % statusOptions.length],
    }))
  );

  const formFields = [
    {
      name: "nama",
      label: "Nama Mahasiswa",
      type: "text",
      placeholder: "Masukkan nama mahasiswa",
      required: true,
    },
    {
      name: "npm",
      label: "NPM",
      type: "text",
      placeholder: "Masukkan NPM",
      required: true,
    },
    {
      name: "angkatan",
      label: "Angkatan",
      type: "number",
      placeholder: "Masukkan angkatan",
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: statusOptions,
      required: true,
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Tercapai":
        return "bg-green-100 text-green-800";
      case "Tidak Tercapai":
        return "bg-red-100 text-red-800";
      case "Selesai":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  const handleAddMahasiswa = (formData) => {
    if (editData) {
      setData(data.map((item) => (item.id === editData.id ? { ...item, ...formData } : item)));
    } else {
      const newMahasiswa = {
        id: Math.max(...data.map((item) => item.id)) + 1,
        ...formData,
      };
      setData([...data, newMahasiswa]);
    }
    setIsFormOpen(false);
    setEditData(null);
  };

  const openEditModal = (item) => {
    setEditData(item);
    setIsFormOpen(true);
  };

  const filteredData = data.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.npm.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Data Mahasiswa Program Studi</h1>
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
            placeholder="Cari mahasiswa atau NPM..."
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
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">NPM</th>
                <th className="p-4 text-left">Angkatan</th>
                <th className="p-4 text-left">Status</th>
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
                  <td className="p-4 font-medium text-gray-800">{item.nama}</td>
                  <td className="p-4 text-gray-600">{item.npm}</td>
                  <td className="p-4">{item.angkatan}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
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
        description={`Anda akan menghapus ${selectedRows.length} mahasiswa. Lanjutkan?`}
        confirmText="Hapus"
        cancelText="Batal"
      />

      {/* Form Modal */}
      {isFormOpen && (
        <BaseModal
          title={editData ? "Edit Data Mahasiswa" : "Tambah Mahasiswa Baru"}
          onClose={() => {
            setIsFormOpen(false);
            setEditData(null);
          }}
        >
          <FormData
            fields={formFields.map((field) => ({
              ...field,
              defaultValue: editData ? editData[field.name] : "",
            }))}
            onSubmit={handleAddMahasiswa}
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

export default DataMahasiswaProdi;
