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

  const [data, setData] = useState([
    {
      id: 1,
      nama: "Rizka Andayani, S.T., M.T.",
      nip: "0123058702",
      email: "rizka.andayani@univti.ac.id",
      password: "Rizk@TIB7",
      role: "Dosen"
    },
    {
      id: 2,
      nama: "Ahmad Fadli, S.Kom., M.Kom.",
      nip: "0123048501",
      email: "ahmad.fadli@univti.ac.id",
      password: "Fadl1Kom#85",
      role: "Dosen"
    },
    {
      id: 3,
      nama: "Budi Santoso, S.Kom., M.Cs.",
      nip: "0123068003",
      email: "budi.santoso@univti.ac.id",
      password: "Bud1Cs#80",
      role: "Dosen"
    },
    {
      id: 4,
      nama: "Hendra Gunawan, S.Kom., M.Kom.",
      nip: "0123079004",
      email: "hendra.gunawan@univti.ac.id",
      password: "H3ndra#9004",
      role: "Dosen"
    },
    {
      id: 5,
      nama: "Dedi Firmansyah, S.T., M.T.I.",
      nip: "0123089106",
      email: "dedi.firmansyah@univti.ac.id",
      password: "D3dIT1#9106",
      role: "Dosen"
    }
  ]);

  const formFields = [
    {
      name: "nama",
      label: "Nama Lengkap",
      type: "text",
      placeholder: "Masukkan nama lengkap dengan gelar",
      required: true,
    },
    {
      name: "nip",
      label: "NIP/NIDN",
      type: "text",
      placeholder: "Masukkan NIP/NIDN",
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
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Masukkan password",
      required: true,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: ["Kaprodi", "Dosen"],
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Teknik Informatika</h1>
        <p className="text-gray-600">Kaprodi: Dr. Fajar, S.Kom., M.T.</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Nama Lengkap</h2>
        <ul className="list-disc pl-5 mb-6">
          <li>Dr. Fajar, S.Kom., M.T.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">NIP / NIDN</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Daftar Dosen Teknik Informatika</h3>
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
            <span>Tambah Dosen</span>
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
                <th className="p-4 text-left">Nama Lengkap</th>
                <th className="p-4 text-left">NIP/NIDN</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Password</th>
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
                  <td className="p-4 text-gray-600">{item.nip}</td>
                  <td className="p-4 text-gray-600">{item.email}</td>
                  <td className="p-4 text-gray-600">{item.password}</td>
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
        message="Apakah Anda yakin ingin menghapus data dosen yang dipilih?"
      />

      {isFormOpen && (
        <BaseModal
          title={formMode === "create" ? "Tambah Dosen" : "Edit Dosen"}
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