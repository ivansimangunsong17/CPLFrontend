import React, { useState, useEffect } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import ConfirmModal from "../../components/Modal/ConfModal";
import BaseModal from "../../components/Modal/BasedModal";

const FormData = ({ fields, onSubmit, onCancel, initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});

  useEffect(() => {
    setFormData(initialValues || {});
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(field => (
        <div key={field.name} className="mb-4">
          <label className="block text-gray-700 mb-2">{field.label}</label>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
            />
          ) : (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full px-3 py-2 border rounded-lg"
            />
          )}
        </div>
      ))}
      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Batal
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Simpan
        </button>
      </div>
    </form>
  );
};

const DataProdi = () => {
  // State for data and selections
  const [cplData, setCplData] = useState(
    Array(4).fill().map((_, index) => ({
      id: `cpl-${index + 1}`,
      kode: `CPL-${index + 1}`,
      deskripsi: index % 2 === 0
        ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        : "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    }))
  );

  const [cpmkData, setCpmkData] = useState(
    Array(4).fill().map((_, index) => ({
      id: `cpmk-${index + 1}`,
      kode: `CPMK-${index + 1}`,
      deskripsi: index % 2 === 0
        ? "Ut enim ad minim veniam, quis nostrud exercitation."
        : "Duis aute irure dolor in reprehenderit in voluptate velit."
    }))
  );

  const [selectedCPL, setSelectedCPL] = useState([]);
  const [selectedCPMK, setSelectedCPMK] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState("create");
  const [currentItem, setCurrentItem] = useState(null);
  const [currentType, setCurrentType] = useState("CPL");
  const [searchTerm, setSearchTerm] = useState("");

  // Form fields configuration
  const formFields = [
    {
      name: "kode",
      label: "Kode",
      type: "text",
      placeholder: "Masukkan kode (contoh: CPL-1)",
      required: true
    },
    {
      name: "deskripsi",
      label: "Deskripsi",
      type: "textarea",
      placeholder: "Masukkan deskripsi capaian pembelajaran",
      required: true
    }
  ];

  // Filter data based on search term
  const filteredCPL = cplData.filter(item =>
    item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCPMK = cpmkData.filter(item =>
    item.kode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Selection handlers
  const toggleSelectRow = (id, type) => {
    if (type === "CPL") {
      setSelectedCPL(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    } else {
      setSelectedCPMK(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    }
  };

  const toggleSelectAll = (type) => {
    if (type === "CPL") {
      setSelectedCPL(selectedCPL.length === filteredCPL.length ? [] : filteredCPL.map(item => item.id));
    } else {
      setSelectedCPMK(selectedCPMK.length === filteredCPMK.length ? [] : filteredCPMK.map(item => item.id));
    }
  };

  // CRUD operations
  const handleAdd = (type) => {
    setCurrentType(type);
    setFormMode("create");
    setCurrentItem(null);
    setIsFormOpen(true);
  };

  const handleEdit = (item, type) => {
    console.log("Editing item:", item); // Debug log
    setCurrentType(type);
    setFormMode("edit");
    setCurrentItem({ ...item }); // Create a new copy of the item
    setIsFormOpen(true);
  };

  const handleDelete = () => {
    if (currentType === "CPL") {
      setCplData(cplData.filter(item => !selectedCPL.includes(item.id)));
      setSelectedCPL([]);
    } else {
      setCpmkData(cpmkData.filter(item => !selectedCPMK.includes(item.id)));
      setSelectedCPMK([]);
    }
    setIsDeleteModalOpen(false);
  };

  const handleSubmit = (formData) => {
    if (formMode === "create") {
      const newItem = {
        id: `${currentType.toLowerCase()}-${Date.now()}`,
        ...formData
      };

      if (currentType === "CPL") {
        setCplData([...cplData, newItem]);
      } else {
        setCpmkData([...cpmkData, newItem]);
      }
    } else {
      if (currentType === "CPL") {
        setCplData(cplData.map(item =>
          item.id === currentItem.id ? { ...item, ...formData } : item
        ));
      } else {
        setCpmkData(cpmkData.map(item =>
          item.id === currentItem.id ? { ...item, ...formData } : item
        ));
      }
    }
    setIsFormOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Program Studi Teknik Informatika</h1>
        <p className="text-gray-600">Kaprodi: Dr. Fajar Ramadhan, S.Kom., M.T.</p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Cari CPL/CPMK..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* CPL Section */}
      <div className="mb-8 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Capaian Pembelajaran Lulusan (CPL)
          </h2>
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedCPL.length > 0
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              disabled={selectedCPL.length === 0}
              onClick={() => {
                setCurrentType("CPL");
                setIsDeleteModalOpen(true);
              }}
            >
              <AiFillDelete size={18} />
              <span>Hapus</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => handleAdd("CPL")}
            >
              <AiOutlinePlus size={18} />
              <span>Tambah CPL</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedCPL.length === filteredCPL.length && filteredCPL.length > 0}
                    onChange={() => toggleSelectAll("CPL")}
                    className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">Kode</th>
                <th className="p-4 text-left">Deskripsi</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCPL.length > 0 ? (
                filteredCPL.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedCPL.includes(item.id)}
                        onChange={() => toggleSelectRow(item.id, "CPL")}
                        className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.kode}</td>
                    <td className="p-4 text-gray-600">{item.deskripsi}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(item, "CPL")}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                      >
                        <AiFillEdit size={16} />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Tidak ada data CPL
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CPMK Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Capaian Pembelajaran Matakuliah (CPMK)
          </h2>
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedCPMK.length > 0
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              disabled={selectedCPMK.length === 0}
              onClick={() => {
                setCurrentType("CPMK");
                setIsDeleteModalOpen(true);
              }}
            >
              <AiFillDelete size={18} />
              <span>Hapus</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => handleAdd("CPMK")}
            >
              <AiOutlinePlus size={18} />
              <span>Tambah CPMK</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={selectedCPMK.length === filteredCPMK.length && filteredCPMK.length > 0}
                    onChange={() => toggleSelectAll("CPMK")}
                    className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">Kode</th>
                <th className="p-4 text-left">Deskripsi</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCPMK.length > 0 ? (
                filteredCPMK.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedCPMK.includes(item.id)}
                        onChange={() => toggleSelectRow(item.id, "CPMK")}
                        className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.kode}</td>
                    <td className="p-4 text-gray-600">{item.deskripsi}</td>
                    <td className="p-4">
                      <button
                        onClick={() => handleEdit(item, "CPMK")}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                      >
                        <AiFillEdit size={16} />
                        <span>Edit</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    Tidak ada data CPMK
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={`Konfirmasi Hapus ${currentType}`}
        description={`Anda yakin ingin menghapus ${currentType === "CPL" ? selectedCPL.length : selectedCPMK.length} data terpilih?`}
        confirmText="Hapus"
        cancelText="Batal"
      />

      {/* Form Modal */}
      {isFormOpen && (
        <BaseModal
          title={`${formMode === "create" ? "Tambah" : "Edit"} ${currentType}`}
          onClose={() => setIsFormOpen(false)}
        >
          <FormData
            fields={formFields}
            onSubmit={handleSubmit}
            onCancel={() => setIsFormOpen(false)}
            initialValues={currentItem || {}}
          />
        </BaseModal>
      )}
    </div>
  );
};

export default DataProdi;