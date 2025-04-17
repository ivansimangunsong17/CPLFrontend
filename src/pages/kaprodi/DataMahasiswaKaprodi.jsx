import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import { FiDownloadCloud } from "react-icons/fi";
import ConfirmModal from "../../components/Modal/ConfModal";

const DataMahasiswaKaprodi = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusOptions = ["Tercapai", "Tidak Tercapai"];

  const getStatus = (status) => {
    switch (status) {
      case "Tercapai":
        return "text-green-600 bg-green-100 px-3 py-1 rounded-full text-sm font-medium";
      case "Tidak Tercapai":
        return "text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-medium";
      default:
        return "text-gray-600 bg-gray-100 px-3 py-1 rounded-full text-sm font-medium";
    }
  };

  // Dummy data mahasiswa
  const data = Array.from({ length: 10 }, (_, index) => ({
    nama: `Mahasiswa ${index + 1}`,
    npm: `20150610${index + 1}`,
    status: statusOptions[index % 2],
  }));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
    setAllSelected(!allSelected);
  };

  const toggleSelectRow = (index) => {
    let newSelectedRows = [...selectedRows];
    if (newSelectedRows.includes(index)) {
      newSelectedRows = newSelectedRows.filter((row) => row !== index);
    } else {
      newSelectedRows.push(index);
    }
    setSelectedRows(newSelectedRows);
    setAllSelected(newSelectedRows.length === data.length);
  };

  const handleDelete = () => {
    console.log("Data yang dihapus:", selectedRows);
    setSelectedRows([]);
    setAllSelected(false);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Manajemen Data Mahasiswa</h1>

      {/* Header Buttons */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded ${selectedRows.length > 0
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          onClick={() => setIsModalOpen(true)}
          disabled={selectedRows.length === 0}
        >
          <AiFillDelete size={18} />
          Hapus
        </button>
        <button className="flex items-center gap-2 px-3 py-2 bg-white text-gray-600 border rounded-md hover:bg-gray-50">
          <FiDownloadCloud size={18} />
          Export
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <AiOutlinePlus size={18} />
          Tambah Akun
        </button>
      </div>

      {/* Tabel Mahasiswa */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-3 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-blue-600"
                />
              </th>
              <th className="p-3">Nama</th>
              <th className="p-3">NPM</th>
              <th className="p-3">Status CPL</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-3 text-center">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => toggleSelectRow(index)}
                    className="w-4 h-4 accent-blue-600"
                  />
                </td>
                <td className="p-3">{item.nama}</td>
                <td className="p-3">{item.npm}</td>
                <td className="p-3">
                  <span className={getStatus(item.status)}>{item.status}</span>
                </td>
                <td className="p-3 text-center text-blue-600 hover:underline cursor-pointer flex items-center justify-center gap-1">
                  <AiFillEdit size={16} />
                  Ubah
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Konfirmasi Hapus */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        title="Konfirmasi Penghapusan"
        description={`Apakah Anda yakin ingin menghapus ${selectedRows.length} data mahasiswa terpilih?`}
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
};

export default DataMahasiswaKaprodi;
