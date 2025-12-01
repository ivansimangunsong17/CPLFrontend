import React, { useState, useMemo } from "react";
import { FaSearch } from "react-icons/fa";

const DetailDataMasterKaprodi = () => {
    // Dummy data hanya 2 kolom: kode dan deskripsi
    const [cpmk] = useState([
        { kode: "CPMK-01", deskripsi: "Mahasiswa mampu memahami konsep dasar struktur data" },
        { kode: "CPMK-02", deskripsi: "Mahasiswa mampu mengimplementasikan operasi pada linked list" },
        { kode: "CPMK-03", deskripsi: "Mahasiswa mampu menerapkan algoritma sorting dan searching" },
        { kode: "CPMK-04", deskripsi: "Mahasiswa mampu menggunakan struktur data stack dan queue" },
        { kode: "CPMK-05", deskripsi: "Mahasiswa mampu menerapkan algoritma sorting dan searching" },
        { kode: "CPMK-06", deskripsi: "Mahasiswa mampu menggunakan struktur data stack dan queue" },
    ]);

    const [search, setSearch] = useState("");

    const filtered = useMemo(() => {
        return cpmk.filter(
            (item) =>
                item.kode.toLowerCase().includes(search.toLowerCase()) ||
                item.deskripsi.toLowerCase().includes(search.toLowerCase())
        );
    }, [search, cpmk]);

    return (
        <div className="p-6 space-y-5">

            <h1 className="text-xl font-bold text-gray-800">Detail Data Master Kaprodi</h1>

            {/* Search bar */}
            <div className="relative w-full sm:w-[280px]">
                <input
                    type="text"
                    placeholder="Cari data..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 pl-9 
                     text-sm text-gray-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <span

                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaSearch size={14} />
                </span>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-blue-600 text-white font-semibold">
                            <th className="p-3 text-left">Kode CPMK</th>
                            <th className="p-3 text-left">Deskripsi CPMK</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={2} className="text-center p-4 text-gray-400">
                                    Data tidak ditemukan
                                </td>
                            </tr>
                        ) : (
                            filtered.map((item, i) => (
                                <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                    <td className="p-3 font-medium text-gray-900">{item.kode}</td>
                                    <td className="p-3 text-gray-700 font-medium">{item.deskripsi}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default DetailDataMasterKaprodi;
