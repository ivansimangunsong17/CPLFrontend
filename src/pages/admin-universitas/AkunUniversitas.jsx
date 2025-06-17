import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineArrowDown } from "react-icons/ai";
import ConfirmModal from "../../components/Modal/ConfModal";
import BaseModal from "../../components/Modal/BasedModal";
import FormData from "../../components/Form/FormData";

const AkunUniversitas = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllUniv, setSelectAllUniv] = useState(false);
  const [selectAllProdi, setSelectAllProdi] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [editData, setEditData] = useState(null);

  // Data sesuai dengan gambar (tanpa status active/inactive)
  const [data, setData] = useState({
    adminUniv: [
      {
        id: 1,
        nama: "Rizka Andayani, S.T., M.T.",
        email: "rizka.andayani@univti.ac.id",
        password: "Rizk@T187",
        role: "Admin Univ",
      },
      {
        id: 2,
        nama: "Ahmad Fadli, S.Kom., M.Kom.",
        email: "ahmad.fadli@univti.ac.id",
        password: "Fadl1Kom#85",
        role: "Admin Univ",
      },
      {
        id: 3,
        nama: "Budi Santoso, S.Kom., M.Cs.",
        email: "budi.santoso@univti.ac.id",
        password: "Bud1Cs#80",
        role: "Admin Univ",
      }
    ],
    adminProdi: [
      {
        id: 4,
        nama: "Rizka Andayani, S.T., M.T.",
        email: "rizka.andayani@univti.ac.id",
        password: "Rizk@T187",
        role: "Admin TI",
      },
      {
        id: 5,
        nama: "Ahmad Fadli, S.Kom., M.Kom.",
        email: "ahmad.fadli@univti.ac.id",
        password: "Fadl1Kom#85",
        role: "Admin TE",
      },
      {
        id: 6,
        nama: "Budi Santoso, S.Kom., M.Cs.",
        email: "budi.santoso@univti.ac.id",
        password: "Bud1Cs#80",
        role: "Admin TM",
      },
      {
        id: 7,
        nama: "Hendra Gunawan, S.Kom., M.Kom.",
        email: "hendra.gunawan@univti.ac.id",
        password: "H3ndra#9004",
        role: "Admin TS",
      },
      {
        id: 8,
        nama: "Dedi Firmansyah, S.T., M.T.I.",
        email: "dedi.firmansyah@univti.ac.id",
        password: "D3diT1#9106",
        role: "Admin Ilkom",
      }
    ]
  });

  const formFields = [
    {
      name: "nama",
      label: "Nama Lengkap",
      type: "text",
      placeholder: "Masukkan nama lengkap",
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
      options: ["Admin Univ", "Admin Prodi TI", "Admin Prodi TE", "Admin Prodi Mesin", "Admin Prodi Sipil", "Admin Prodi Ilkom"],
      required: true,
    },
  ];

  const toggleSelectRow = (id) => {
    const newSelected = selectedRows.includes(id)
      ? selectedRows.filter((row) => row !== id)
      : [...selectedRows, id];
    setSelectedRows(newSelected);

    // Update select all status
    const allUnivSelected = data.adminUniv.every(item => newSelected.includes(item.id));
    const allProdiSelected = data.adminProdi.every(item => newSelected.includes(item.id));
    setSelectAllUniv(allUnivSelected);
    setSelectAllProdi(allProdiSelected);
  };

  const toggleSelectAllUniv = () => {
    if (selectAllUniv) {
      // Unselect all admin univ
      setSelectedRows(selectedRows.filter(id =>
        !data.adminUniv.some(item => item.id === id)
      ));
    } else {
      // Select all admin univ
      const univIds = data.adminUniv.map(item => item.id);
      setSelectedRows([...new Set([...selectedRows, ...univIds])]);
    }
    setSelectAllUniv(!selectAllUniv);
  };

  const toggleSelectAllProdi = () => {
    if (selectAllProdi) {
      // Unselect all admin prodi
      setSelectedRows(selectedRows.filter(id =>
        !data.adminProdi.some(item => item.id === id)
      ));
    } else {
      // Select all admin prodi
      const prodiIds = data.adminProdi.map(item => item.id);
      setSelectedRows([...new Set([...selectedRows, ...prodiIds])]);
    }
    setSelectAllProdi(!selectAllProdi);
  };

  const handleDelete = () => {
    setData({
      adminUniv: data.adminUniv.filter((item) => !selectedRows.includes(item.id)),
      adminProdi: data.adminProdi.filter((item) => !selectedRows.includes(item.id))
    });
    setSelectedRows([]);
    setSelectAllUniv(false);
    setSelectAllProdi(false);
    setIsConfirmOpen(false);
  };

  const handleAddAkun = (formData) => {
    const newId = Math.max(
      ...data.adminUniv.map(item => item.id),
      ...data.adminProdi.map(item => item.id)
    ) + 1;

    const newAkun = {
      id: newId,
      ...formData,
    };

    if (formData.role.includes("Admin Univ")) {
      setData({
        ...data,
        adminUniv: [...data.adminUniv, newAkun]
      });
    } else {
      setData({
        ...data,
        adminProdi: [...data.adminProdi, newAkun]
      });
    }

    setIsFormOpen(false);
    setEditData(null);
  };

  const handleEditAkun = (formData) => {
    if (!editData) return;

    const updatedData = {
      adminUniv: data.adminUniv.map(item =>
        item.id === editData.id ? { ...item, ...formData } : item
      ),
      adminProdi: data.adminProdi.map(item =>
        item.id === editData.id ? { ...item, ...formData } : item
      )
    };

    setData(updatedData);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manajemen Akun Universitas</h1>
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

      {/* Admin Universitas Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Admin Universitas</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectAllUniv}
                    onChange={toggleSelectAllUniv}
                    className="w-4 h-4 accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Nama Lengkap <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Email <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Password <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Role <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Aksi <AiOutlineArrowDown />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.adminUniv.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleSelectRow(item.id)}
                      className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {item.nama}
                  </td>
                  <td className="p-4 text-gray-600">{item.email}</td>
                  <td className="p-4 text-gray-600">{item.password}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                    >
                      Ubah
                      <AiFillEdit size={16} />

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Program Studi Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Admin Program Studi</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200 text-black">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectAllProdi}
                    onChange={toggleSelectAllProdi}
                    className="w-4 h-4 accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Nama Lengkap <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Email <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Password <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Role <AiOutlineArrowDown />
                  </div>
                </th>
                <th className="p-4 text-left">
                  <div className="flex items-center gap-1">
                    Aksi <AiOutlineArrowDown />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.adminProdi.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleSelectRow(item.id)}
                      className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                    />
                  </td>
                  <td className="p-4 font-medium text-gray-800">
                    {item.nama}
                  </td>
                  <td className="p-4 text-gray-600">{item.email}</td>
                  <td className="p-4 text-gray-600">{item.password}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => openEditModal(item)}
                      className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                    >
                      Ubah
                      <AiFillEdit size={16} />

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
        message="Apakah Anda yakin ingin menghapus akun yang dipilih?"
      />

      {isFormOpen && (
        <BaseModal
          title={formMode === "create" ? "Tambah Akun" : "Edit Akun"}
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
            onSubmit={formMode === "create" ? handleAddAkun : handleEditAkun}
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

export default AkunUniversitas;