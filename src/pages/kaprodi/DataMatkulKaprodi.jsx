import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import ConfirmModal from "../../components/Modal/ConfModal";

const DataMataKuliahKaprodi = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dataMataKuliah = [
    {
      kode: "IF101",
      nama: "Pemrograman Dasar",
      sks: 3,
      statusPemetaan: "Sudah",
    },
    {
      kode: "IF102",
      nama: "Struktur Data",
      sks: 3,
      statusPemetaan: "Belum",
    },
    {
      kode: "IF201",
      nama: "Basis Data",
      sks: 3,
      statusPemetaan: "Sudah",
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Sudah":
        return "text-green-600 bg-green-100 px-2 py-1 rounded-full text-sm";
      case "Belum":
        return "text-red-600 bg-red-100 px-2 py-1 rounded-full text-sm";
      default:
        return "text-gray-600 bg-gray-100 px-2 py-1 rounded-full text-sm";
    }
  };

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(dataMataKuliah.map((_, index) => index));
    }
    setAllSelected(!allSelected);
  };

  const toggleSelectRow = (index) => {
    const newSelection = selectedRows.includes(index)
      ? selectedRows.filter((i) => i !== index)
      : [...selectedRows, index];
    setSelectedRows(newSelection);
    setAllSelected(newSelection.length === dataMataKuliah.length);
  };

  const handleDelete = () => {
    console.log("Menghapus mata kuliah:", selectedRows);
    setSelectedRows([]);
    setAllSelected(false);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      {/* Header Buttons */}
      <div className="flex justify-end mb-4 gap-2">
        <button
          className={`flex items-center gap-2 px-4 py-2 rounded ${selectedRows.length > 0
            ? "bg-red-500 text-white"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          onClick={() => setIsModalOpen(true)}
          disabled={selectedRows.length === 0}
        >
          <AiFillDelete size={18} />
          Hapus
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <AiOutlinePlus size={18} />
          Tambah Mata Kuliah
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 accent-blue-500"
                />
              </th>
              <th className="p-3">Kode MK</th>
              <th className="p-3">Nama Mata Kuliah</th>
              <th className="p-3">SKS</th>
              <th className="p-3">Status Pemetaan</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {dataMataKuliah.map((mk, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(index)}
                    onChange={() => toggleSelectRow(index)}
                    className="w-4 h-4 accent-blue-500"
                  />
                </td>
                <td className="p-3">{mk.kode}</td>
                <td className="p-3">{mk.nama}</td>
                <td className="p-3">{mk.sks}</td>
                <td className="p-3">
                  <span className={getStatusClass(mk.statusPemetaan)}>
                    {mk.statusPemetaan}
                  </span>
                </td>
                <td className="p-3 text-blue-500 cursor-pointer flex items-center gap-1 hover:underline">
                  Ubah
                  <AiFillEdit size={16} />
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
        title="Konfirmasi Hapus"
        description={`Apakah Anda yakin ingin menghapus ${selectedRows.length} data mata kuliah?`}
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
};

export default DataMataKuliahKaprodi;
