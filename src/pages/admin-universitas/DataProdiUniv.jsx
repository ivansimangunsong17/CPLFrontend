import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import ConfirmModal from "../../components/Modal/ConfModal";
import BasedModal from "../../components/Modal/BasedModal";
import FormData from "../../components/Form/FormData";

const DataProdiUniv = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [data, setData] = useState(
    Array(10).fill().map((_, i) => ({
      nama: `Program Studi ${i + 1}`,
      email: `PRODI${i + 1}`,
      admin: `Admin Prodi ${(i % 3) + 1}`
    }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const adminOptions = [
    "Admin Prodi 1",
    "Admin Prodi 2",
    "Admin Prodi 3",
    "Admin Universitas",
    "Super Admin"
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
    { name: "nama", label: "Nama Prodi", type: "text", required: true },
    { name: "email", label: "Kode Prodi", type: "text", required: true },
    {
      name: "admin",
      label: "Nama Admin",
      type: "select",
      options: adminOptions,
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
                <th className="p-4 text-left">Nama Prodi</th>
                <th className="p-4 text-left">Kode Prodi</th>
                <th className="p-4 text-left">Admin</th>
                <th className="p-4 text-left">Aksi</th>
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
                  <td className="p-4 font-medium text-gray-800">{item.nama}</td>
                  <td className="p-4 text-gray-600">
                    <span className="px-2 py-1 bg-gray-100 rounded-md text-sm">
                      {item.email}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {item.admin}
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
      />

      {/* Modal Form (Tambah / Edit) */}
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