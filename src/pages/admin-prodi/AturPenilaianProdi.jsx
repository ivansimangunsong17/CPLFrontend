import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaRegEdit } from "react-icons/fa";
import FormBox from "../../components/Form/FormBox";
import { useKelas } from "../../hooks/admin-prodi/useKelas";
import TableSkeleton from "../../components/TableSkeleton";

const AturPenilaianProdi = () => {
    const navigate = useNavigate();
    const { kelasQuery } = useKelas();


    const [assessments, setAssessments] = useState([
        { jenis: "Tugas", subs: ["Tugas 1", "Tugas 2"] },
        { jenis: "Kuis", subs: ["Kuis 1"] },
        { jenis: "Hasil Projek", subs: [] },
        { jenis: "Ujian Tengah Semester", subs: [] },
        { jenis: "Ujian Akhir Semester", subs: [] },
    ]);

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubFormOpen, setIsSubFormOpen] = useState(false);
    const [selectedAssessmentIndex, setSelectedAssessmentIndex] = useState(null);

    // Form field
    const fieldsJenisPenilaian = [
        { name: "jenis", label: "Jenis Penilaian", type: "text", required: true },
    ];

    const fieldsSubPenilaian = [
        { name: "sub", label: "Nama Sub Penilaian", type: "text", required: true },
    ];

    // Tambah jenis penilaian
    const handleAddAssessment = (data) => {
        setAssessments([...assessments, { jenis: data.jenis, subs: [] }]);
        setIsFormOpen(false);
    };

    // Tambah sub penilaian
    const handleAddSubAssessment = (data) => {
        const updated = [...assessments];
        updated[selectedAssessmentIndex].subs.push(data.sub);
        setAssessments(updated);
        setIsSubFormOpen(false);
        setSelectedAssessmentIndex(null);
    };

    // Hapus sub penilaian
    const removeSub = (i, subIndex) => {
        const updated = [...assessments];
        updated[i].subs.splice(subIndex, 1);
        setAssessments(updated);
    };

    // Data mata kuliah dari API
    const data = useMemo(() => kelasQuery.data || [], [kelasQuery.data]);
    const isLoading = kelasQuery.isLoading;

    const handleClick = (KelasId) => {
        navigate(`/dashboard/admin_prodi/detail_penilaian/${KelasId}`);
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-700">Jenis Penilaian</h2>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg  hover:bg-blue-700 transition"
                >
                    <FaPlus size={14} /> Tambah Penilaian
                </button>
            </div>

            {/* Table Penilaian */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <table className="w-full text-gray-700">
        <thead>
            <tr className="bg-blue-600 text-white text-sm uppercase">
                {/* PERBAIKAN: Padding diubah agar lebih lega */}
                <th className="px-6 py-3 text-left">Penilaian</th>
                <th className="px-6 py-3 text-left">Sub - Penilaian</th>
                <th className="px-6 py-3 text-center">Aksi</th>
            </tr>
        </thead>
        {/* PERBAIKAN: Menggunakan `divide-y` untuk garis horizontal yang rapi */}
        <tbody className="divide-y divide-gray-200">
            {assessments.map((a, i) => {
                const rowSpan = Math.max(1, a.subs.length);
                return (
                    <React.Fragment key={i}>
                        <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium align-top" rowSpan={rowSpan}>
                                <div className="flex justify-between items-center">
                                    {a.jenis}
                                    <button
                                        onClick={() => {
                                            setSelectedAssessmentIndex(i);
                                            setIsSubFormOpen(true);
                                        }}
                                        className="bg-blue-500 text-white p-1.5 rounded-full hover:bg-blue-600 transition"
                                    >
                                        <FaPlus size={12} />
                                    </button>
                                </div>
                            </td>
                            {/* PERBAIKAN: `border` dihapus, padding diubah */}
                            <td className="px-6 py-4">{a.subs[0] || "-"}</td>
                            <td className="px-6 py-4 text-center">
                                {a.subs[0] && (
                                    <button
                                        onClick={() => removeSub(i, 0)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                )}
                            </td>
                        </tr>
                        {a.subs.slice(1).map((sub, subIndex) => (
                            <tr key={subIndex} className="hover:bg-gray-50">
                                <td className="px-6 py-4">{sub}</td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => removeSub(i, subIndex + 1)}
                                        className="text-red-500 hover:text-red-700 transition"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </React.Fragment>
                );
            })}
        </tbody>
    </table>
</div>

            {/* Table Mata Kuliah */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mt-10">
                <table className="w-full text-gray-700">
                    <thead>
                        <tr className="bg-blue-600 text-white text-sm uppercase">
                            {/* PERUBAHAN: Padding diubah menjadi px-6 py-3 */}
                            <th className="px-6 py-3 text-left">Kode Mata Kuliah</th>
                            <th className="px-6 py-3 text-left">Nama Mata Kuliah</th>
                            <th className="px-6 py-3 text-left">Kelas</th>
                            {/* PERUBAHAN: Aksi dibuat rata kanan */}
                            <th className="px-6 py-3 text-right">Aksi</th>
                        </tr>
                    </thead>
                    {/* PERUBAHAN: Tambahkan `divide-y` untuk garis horizontal yang rapi */}
                    <tbody className="divide-y divide-gray-200">
                        {isLoading ? (
                            <TableSkeleton rows={5} columns={4} />
                        ) : data.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    Belum ada data kelas
                                </td>
                            </tr>
                        ) : (
                            data.map((k, i) => (
                                <tr key={k.kelas_id || i} className="hover:bg-gray-50 transition-colors duration-200">
                                    {/* PERUBAHAN: `border` dihapus, `p-4` diubah, dan ditambahkan hierarki visual */}
                                    <td className="px-6 py-4 font-medium text-gray-800">{k.mata_kuliah?.kode_mata_kuliah || k.kode_kelas}</td>
                                    <td className="px-6 py-4 text-gray-500">{k.mata_kuliah?.nama_mata_kuliah}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-900">{k.nama_kelas}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleClick(k.kelas_id)}
                                            className="flex items-center gap-2 ml-auto text-blue-600 hover:text-blue-800 font-medium transition"
                                        >
                                            Atur <FaRegEdit size={14} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
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
                subtitle={`Untuk ${selectedAssessmentIndex !== null ? assessments[selectedAssessmentIndex].jenis : ""
                    }`}
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
