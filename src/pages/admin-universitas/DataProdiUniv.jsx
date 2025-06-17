import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineArrowDown } from "react-icons/ai";
import ConfirmModal from "../../components/Modal/ConfModal";
import BasedModal from "../../components/Modal/BasedModal";
import FormData from "../../components/Form/FormData";

const DataProdiUniv = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [data, setData] = useState([
    { kode: "TI", nama: "Teknik Informatika", fakultas: "Fakultas Teknik" },
    { kode: "SI", nama: "Sistem Informasi", fakultas: "Fakultas Teknologi Informasi" },
    { kode: "TE", nama: "Teknik Elektro", fakultas: "Fakultas Teknik" },
    { kode: "TM", nama: "Teknik Mesin", fakultas: "Fakultas Teknik" },
    { kode: "TS", nama: "Teknik Sipil", fakultas: "Fakultas Teknik" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const fakultasOptions = [
    "Fakultas Teknologi Informasi",
    "Fakultas Teknik",
    "Fakultas Pertanian",
    "Fakultas Ilmu Sosial dan Politik",
    "Fakultas Ekonomi dan Bisnis"
  ];

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
    setAllSelected(!allSelected);
  };

  const toggleSelectRow = (index) => {
    const newSelected = selectedRows.includes(index)
      ? selectedRows.filter((row) => row !== index)
      : [...selectedRows, index];
    setSelectedRows(newSelected);
    setAllSelected(newSelected.length === data.length);
  };

  const handleDelete = () => {
    setData(data.filter((_, index) => !selectedRows.includes(index)));
    setSelectedRows([]);
    setAllSelected(false);
    setIsModalOpen(false);
  };

  const fields = [
    {
      name: "kode",
      label: "Kode Prodi",
      type: "text",
      placeholder: "Masukkan kode prodi (contoh: TI)",
      required: true,
      maxLength: 5
    },
    {
      name: "nama",
      label: "Nama Prodi",
      type: "text",
      placeholder: "Masukkan nama program studi",
      required: true
    },
    {
      name: "fakultas",
      label: "Fakultas",
      type: "select",
      options: fakultasOptions,
      required: true
    },
  ];

  const handleFormSubmit = (formData) => {
    if (editingIndex !== null) {
      const updated = [...data];
      updated[editingIndex] = formData;
      setData(updated);
    } else {
      setData([...data, formData]);
    }
    setIsFormModalOpen(false);
    setEditingIndex(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Program Studi</h1>
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
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={() => {
              setIsFormModalOpen(true);
              setEditingIndex(null);
            }}
          >
            <AiOutlinePlus size={18} />
            <span>Tambah Prodi</span>
          </button>
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
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Kode Prodi <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Nama Program Studi <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Fakultas <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Ubah Data <AiOutlineArrowDown />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => toggleSelectRow(index)}
                      className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                      {item.kode}
                    </span>
                  </td>
                  <td className="p-4 ">{item.nama}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {item.fakultas}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => {
                        setEditingIndex(index);
                        setIsFormModalOpen(true);
                      }}
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

      {/* Modal Delete */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        message="Apakah Anda yakin ingin menghapus program studi yang dipilih?"
      />

      {/* Modal Form (Tambah/Edit) */}
      {isFormModalOpen && (
        <BasedModal
          title={editingIndex !== null ? "Edit Program Studi" : "Tambah Program Studi"}
          onClose={() => {
            setIsFormModalOpen(false);
            setEditingIndex(null);
          }}
        >
          <FormData
            fields={fields.map((f) => ({
              ...f,
              defaultValue: editingIndex !== null ? data[editingIndex][f.name] : "",
            }))}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setIsFormModalOpen(false);
              setEditingIndex(null);
            }}
          />
        </BasedModal>
      )}
    </div>
  );
};

export default DataProdiUniv;