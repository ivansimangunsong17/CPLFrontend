import React, { useState, useMemo, useContext } from "react"; // Tambahkan useContext
import { AiOutlineEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useKelas } from "../../hooks/dosen/useKelas";
import TableSkeleton from "../../components/TableSkeleton";
import { AuthContext } from "../../context/AuthContext"; // <-- TAMBAHKAN BARIS INI



const PenilaianDosen = () => {

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const dosenId = user?.id;
  const { kelasQuery } = useKelas({ dosen_id: dosenId });



  // ✅ Error state
  if (kelasQuery.isError) {
    return (
      <p className="p-6 text-red-500">
        Gagal memuat data kelas: {kelasQuery.error.message}
      </p>
    );
  }

  // ✅ Normalisasi data
  const dataKelas = Array.isArray(kelasQuery.data)
    ? kelasQuery.data
    : kelasQuery.data?.data
      ? kelasQuery.data.data
      : [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">
          Daftar Mata Kuliah untuk Penilaian
        </h1>
      </div>

      {/* Tabel Mata Kuliah */}
      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            Daftar Mata Kuliah
          </h2>
          <div className="flex items-center bg-white border rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Cari Mata Kuliah.."
              className="px-3 py-2 text-sm focus:outline-none"
            />
            <button className="bg-blue-500 px-3 py-2 text-white text-sm">
              Cari
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="px-6 py-3 text-left">Kode MK</th>
                <th className="px-6 py-3 text-left">Nama Mata Kuliah</th>
                <th className="px-6 py-3 text-left">Nama Kelas</th>
                <th className="px-6 py-3 text-left">Periode</th>
                <th className="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {/* ✅ Skeleton state */}
              {kelasQuery.isLoading ? (
                <TableSkeleton rows={5} columns={5} />
              ) : dataKelas.length > 0 ? (
                dataKelas.map((kelas) => (
                  <tr key={kelas.kelas_id} className="border-b border-gray-300 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {kelas.kode_mata_kuliah || "-"}
                    </td>
                    <td className="px-6 py-4">
                      {kelas.nama_mata_kuliah || "-"}
                    </td>
                    <td className="px-6 py-4">{kelas.nama_kelas}</td>
                    <td className="px-6 py-4">
                      Semester {kelas.semester} - {kelas.tahun_ajaran}
                    </td>
                    <td
                      className="px-6 py-4 text-blue-600 flex items-center gap-1 cursor-pointer hover:text-blue-800"
                      onClick={() =>
                        navigate(`/dashboard/dosen/detail_penilaian/${kelas.nama_kelas}`)
                      }
                    >
                      Lihat <AiOutlineEye size={16} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-6">
                    Belum ada data kelas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
};

export default PenilaianDosen;
