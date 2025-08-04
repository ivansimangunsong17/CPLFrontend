import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import FormBox from "../../components/Form/FormBox"; // Pastikan path sesuai

const AturPenilaianProdi = () => {
    const [assessments, setAssessments] = useState([
        { jenis: "Tugas", subs: ["Tugas 1", "Tugas 2", "Tugas 3"] },
        { jenis: "Kuis", subs: ["Kuis 1", "Kuis 2", "Kuis 3"] },
        { jenis: "Hasil Projek", subs: [] },
        { jenis: "Aktivitas Partisipasi", subs: [] },
        { jenis: "Ujian Tengah Semester", subs: [] },
        { jenis: "Ujian Akhir Semester", subs: [] },
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubFormOpen, setIsSubFormOpen] = useState(false);
    const [selectedAssessmentIndex, setSelectedAssessmentIndex] = useState(null);

    // Fields untuk FormBox utama
    const fieldsJenisPenilaian = [
        {
            name: "jenis",
            label: "Jenis Penilaian",
            type: "text",
            required: true,
            placeholder: "Masukkan nama penilaian",
        },
    ];

    // Fields untuk Sub-Penilaian
    const fieldsSubPenilaian = [
        {
            name: "sub",
            label: "Nama Sub Penilaian",
            type: "text",
            required: true,
            placeholder: "Contoh: Tugas 1, Kuis 2",
        },
    ];

    // Tambah Jenis Penilaian
    const handleAddAssessment = (data) => {
        // Cek duplikat
        const isDuplicate = assessments.some(a => a.jenis.toLowerCase() === data.jenis.toLowerCase());
        if (isDuplicate) {
            alert("Jenis penilaian sudah ada!");
            return;
        }
        setAssessments([...assessments, { jenis: data.jenis, subs: [] }]);
        setIsFormOpen(false);
    };

    // Tambah Sub Penilaian
    const handleAddSubAssessment = (data) => {
        const updated = [...assessments];
        updated[selectedAssessmentIndex].subs.push(data.sub);
        setAssessments(updated);
        setIsSubFormOpen(false);
        setSelectedAssessmentIndex(null);
    };

    // Hapus Sub
    const removeSub = (i, subIndex) => {
        const updated = [...assessments];
        updated[i].subs.splice(subIndex, 1);
        setAssessments(updated);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Jenis Penilaian</h2>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FaPlus size={14} /> Tambah Penilaian
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <table className="w-full border-collapse text-gray-700">
                    <thead>
                        <tr className="bg-blue-600 text-white text-sm uppercase">
                            <th className="p-4 text-left border">Penilaian</th>
                            <th className="p-4 text-left border">Sub - Penilaian</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assessments.map((a, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition">
                                <td className="p-4 border">
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{a.jenis}</span>
                                        <button
                                            onClick={() => {
                                                setSelectedAssessmentIndex(i);
                                                setIsSubFormOpen(true);
                                            }}
                                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                                        >
                                            <FaPlus size={14} />
                                        </button>
                                    </div>
                                </td>
                                <td className="p-4 border">
                                    {a.subs.length > 0 ? (
                                        <div className="space-y-2">
                                            {a.subs.map((sub, subIndex) => (
                                                <div
                                                    key={subIndex}
                                                    className="flex justify-between items-center bg-gray-100 rounded px-3 py-2"
                                                >
                                                    <span>{sub}</span>
                                                    <button
                                                        onClick={() => removeSub(i, subIndex)}
                                                        className="text-red-500 hover:text-red-700 transition"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-gray-400 italic">Belum ada sub-penilaian</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Tambah Jenis Penilaian */}
            <FormBox
                title="Tambah Jenis Penilaian"
                subtitle="Lengkapi informasi jenis penilaian"
                fields={fieldsJenisPenilaian}
                initialData={{ jenis: "" }}
                onSubmit={handleAddAssessment}
                onCancel={() => setIsFormOpen(false)}
                isOpen={isFormOpen}
            />

            {/* Modal Tambah Sub Penilaian */}
            <FormBox
                title="Tambah Sub Penilaian"
                subtitle={`Untuk ${selectedAssessmentIndex !== null ? assessments[selectedAssessmentIndex].jenis : ""}`}
                fields={fieldsSubPenilaian}
                initialData={{ sub: "" }}
                onSubmit={handleAddSubAssessment}
                onCancel={() => setIsSubFormOpen(false)}
                isOpen={isSubFormOpen}
            />
        </div>
    );
};

export default AturPenilaianProdi;
