import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";
import ConfirmModal from "../../components/Modal/ConfModal";
import BaseModal from "../../components/Modal/BasedModal";
import FormData from "../../components/Form/FormData";

const DataFakultasUniv = () => {
    const [selectedRows, setSelectedRows] = useState([]);
    const [allSelected, setAllSelected] = useState(false);
    const [data, setData] = useState([
        { nama: "Fakultas Teknik", kode: "FT" },
        { nama: "Fakultas Ekonomi", kode: "FE" },
    ]);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [formMode, setFormMode] = useState("create");
    const [formInitialValue, setFormInitialValue] = useState({});
    const [editIndex, setEditIndex] = useState(null);

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
        setIsDeleteModalOpen(false);
    };

    const handleAdd = () => {
        setFormMode("create");
        setFormInitialValue({});
        setIsFormModalOpen(true);
    };

    const handleEdit = (index) => {
        setFormMode("edit");
        setFormInitialValue(data[index]);
        setEditIndex(index);
        setIsFormModalOpen(true);
    };

    const handleFormSubmit = (formData) => {
        if (formMode === "create") {
            setData((prev) => [...prev, formData]);
        } else {
            setData((prev) =>
                prev.map((item, idx) => (idx === editIndex ? formData : item))
            );
        }
        setIsFormModalOpen(false);
    };

    const formFields = [
        {
            name: "nama",
            label: "Nama Fakultas",
            type: "text",
            required: true,
            placeholder: "Masukkan nama fakultas",
        },
        {
            name: "kode",
            label: "Kode Fakultas",
            type: "text",
            required: true,
            placeholder: "Masukkan kode fakultas",
        },
    ];

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Manajemen Fakultas</h1>
                <div className="flex gap-3">
                    <button
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedRows.length > 0
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                        disabled={selectedRows.length === 0}
                        onClick={() => setIsDeleteModalOpen(true)}
                    >
                        <AiFillDelete size={18} />
                        <span>Hapus</span>
                    </button>
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={handleAdd}
                    >
                        <AiOutlinePlus size={18} />
                        <span>Tambah Fakultas</span>
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
                                        className="w-4 h-4 rounded  accent-blue-500 focus:ring-blue-300"
                                    />
                                </th>
                                <th className="p-4 text-left">Nama Fakultas</th>
                                <th className="p-4 text-left">Kode Fakultas</th>
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
                                            className="w-4 h-4 rounded  accent-blue-500 focus:ring-blue-300"
                                        />
                                    </td>
                                    <td className="p-4 font-medium text-gray-800">{item.nama}</td>
                                    <td className="p-4 text-gray-600">
                                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                                            {item.kode}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                                        >
                                            <AiFillEdit size={16} />
                                            <span>Edit</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {data.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500">
                                        Tidak ada data fakultas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modals */}
            <ConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleDelete}
            />

            {isFormModalOpen && (
                <BaseModal
                    title={formMode === "edit" ? "Edit Fakultas" : "Tambah Fakultas"}
                    onClose={() => setIsFormModalOpen(false)}
                >
                    <FormData
                        fields={formFields.map(field => ({
                            ...field,
                            defaultValue: formInitialValue[field.name] || ""
                        }))}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setIsFormModalOpen(false)}
                    />
                </BaseModal>
            )}
        </div>
    );
};

export default DataFakultasUniv;