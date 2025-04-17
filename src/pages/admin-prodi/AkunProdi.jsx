import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import ConfirmModal from "../../components/Modal/ConfModal";
import BaseModal from "../../components/Modal/BasedModal";
import FormData from "../../components/Form/FormData";

const AkunProdi = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editData, setEditData] = useState(null);

  const [data, setData] = useState(
    Array(10).fill(null).map((_, index) => ({
      id: index + 1,
      nama: `Admin Prodi ${index + 1}`,
      email: `admin.prodi${index + 1}@example.com`,
      hakAkses: index % 2 === 0 ? "Kaprodi" : "Dosen",
      status: index % 3 === 0 ? "Aktif" : "Nonaktif",
    }))
  );

  const formFields = [
    {
      name: "nama",
      label: "Nama",
      type: "text",
      placeholder: "Masukkan nama admin prodi",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Masukkan email",
      required: true,
    },
    {
      name: "hakAkses",
      label: "Hak Akses",
      type: "select",
      options: ["Kaprodi", "Dosen"],
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: ["Aktif", "Nonaktif"],
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
    setIsConfirmOpen(false);
  };

  const handleAddAkun = (formData) => {
    if (formMode === "create") {
      const newAkun = {
        id: Math.max(...data.map(item => item.id)) + 1,
        ...formData,
      };
      setData([...data, newAkun]);
    } else if (formMode === "edit" && editData) {
      const updatedData = data.map((item) =>
        item.id === editData.id ? { ...item, ...formData } : item
      );
      setData(updatedData);
    }
    setIsFormOpen(false);
    setEditData(null);
  };

  const openEditModal = (item) => {
    setEditData(item);
    setFormMode("edit");
    setIsFormOpen(true);
  };

  const openCreateModal = () => {
    setEditData(null);
    setFormMode("create");
    setIsFormOpen(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Akun Program Studi</h1>
        <div className="flex gap-3">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedRows.length > 0
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            disabled={selectedRows.length === 0}
            onClick={() => setIsConfirmOpen(true)}
          >
            <AiFillDelete size={18} />
            <span>Hapus</span>
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            onClick={openCreateModal}
          >
            <AiOutlinePlus size={18} />
            <span>Tambah Akun</span>
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
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Hak Akses</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((item) => (
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
                  <td className="p-4 text-gray-600">{item.email}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.hakAkses === "Kaprodi"
                        ? "bg-purple-100 text-purple-800"
                        : item.hakAkses === "Dosen"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                      {item.hakAkses}
                    </span>
                  </td>


                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${item.status === "Aktif"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                      }`}>
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

      {/* Modals */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={handleDelete}
      />

      {isFormOpen && (
        <BaseModal
          title={formMode === "create" ? "Tambah Akun Prodi" : "Edit Akun Prodi"}
          onClose={() => {
            setIsFormOpen(false);
            setEditData(null);
          }}
        >
          <FormData
            fields={formFields.map(field => ({
              ...field,
              defaultValue: editData ? editData[field.name] : "",
            }))}
            onSubmit={handleAddAkun}
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

export default AkunProdi;
