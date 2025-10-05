import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useKelas } from "../../hooks/admin-prodi/useKelas";
import TableSkeleton from "../../components/TableSkeleton";

const DetailHasilPerhitungan = () => {
    const { mataKuliahId } = useParams(); // ambil dari url
    const { kelasQuery } = useKelas();
    const navigate = useNavigate();

    // ✅ Loading state
    if (kelasQuery.isLoading) {
        return <TableSkeleton rows={4} columns={2} />;
    }

    // ✅ Error state
    if (kelasQuery.isError) {
        return (
            <p className="p-6 text-red-500">
                Gagal memuat detail kelas: {kelasQuery.error.message}
            </p>
        );
    }

    // ✅ Normalisasi data
    const dataKelas = Array.isArray(kelasQuery.data)
        ? kelasQuery.data
        : kelasQuery.data?.data
            ? [kelasQuery.data.data]
            : [];

    // ✅ Cari kelas sesuai id
    const kelas = dataKelas.find((k) => String(k.kelas_id) === mataKuliahId);

    if (!kelas) {
        return (
            <div className="p-6 text-center text-gray-500">
                Data kelas tidak ditemukan
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">
                    Detail Hasil Perhitungan
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
                >
                    Kembali
                </button>
            </div>

            {/* Detail Info Kelas */}
            <div className="bg-white rounded-xl shadow-md border p-6 space-y-4">
                <div>
                    <p className="text-sm text-gray-500">Kode Mata Kuliah</p>
                    <p className="text-lg font-semibold">
                        {kelas.mata_kuliah?.kode_mata_kuliah || "-"}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Nama Mata Kuliah</p>
                    <p className="text-lg font-semibold">
                        {kelas.mata_kuliah?.nama_mata_kuliah || "-"}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Nama Kelas</p>
                    <p className="text-lg font-semibold">{kelas.nama_kelas}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Periode</p>
                    <p className="text-lg font-semibold">
                        Semester {kelas.semester} - {kelas.tahun_ajaran}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Dosen Pengampu</p>
                    <ul className="list-disc pl-6">
                        {kelas.dosens && kelas.dosens.length > 0 ? (
                            kelas.dosens.map((dosen) => (
                                <li key={dosen.id}>
                                    {dosen.name}{" "}
                                    <span className="text-sm text-gray-500">
                                        ({dosen.pivot?.jabatan})
                                    </span>
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-500">Tidak ada dosen</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DetailHasilPerhitungan;
