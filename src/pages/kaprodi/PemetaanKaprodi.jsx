import React, { useState, useMemo } from "react"; import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


const PemetaanKaprodi = () => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const dummyMK = [
        { kodeMK: "MK-1101", namaMK: "Struktur Data" },
        { kodeMK: "MK-1102", namaMK: "Basis Data" },
        { kodeMK: "MK-1201", namaMK: "Sistem Operasi" },
        { kodeMK: "MK-1301", namaMK: "Pemrograman Web" },
        { kodeMK: "MK-1105", namaMK: "Algoritma" },
        { kodeMK: "MK-1106", namaMK: "Rekayasa Perangkat Lunak" },
        { kodeMK: "MK-1207", namaMK: "Kalkulus" },
        { kodeMK: "MK-1308", namaMK: "Kecerdasan Buatan" },
    ];

    const filteredMK = useMemo(() => {
        return dummyMK.filter(
            (mk) =>
                mk.kodeMK.toLowerCase().includes(search.toLowerCase()) ||
                mk.namaMK.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);


    return (
        <div>
            <div className="text-lg font-semibold flex justify-between p-4 text-gray-800 ">
                <h1>Daftar Mata Kuliah</h1>
                <div className="relative w-full sm:w-[280px]">
                    <input
                        type="text"
                        placeholder="Cari data..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10
                                     text-sm text-gray-700 placeholder:text-gray-400
                                     focus:border-blue-400 focus:ring-2 focus:ring-blue-100 
                                     outline-none transition"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="absolute left-3 top-[50%] -translate-y-[50%] text-gray-400">
                        <FiSearch size={18} />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-blue-600 text-white font-semibold">
                            <th className="p-3 text-left pl-10">Kode MK</th>
                            <th className="p-3 text-left">Nama Mata Kuliah</th>
                            <th className="p-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMK.map((mk, i) => (
                            <tr
                                key={i}
                                className="border-b border-gray-100 hover:bg-gray-50 transition"
                            >
                                <td className="p-4 pl-10 font-medium text-gray-900">
                                    {mk.kodeMK}
                                </td>
                                <td className="p-3 text-gray-700 font-medium">{mk.namaMK}</td>
                                <td className="p-3 text-left">
                                    <button
                                        onClick={() => navigate(`/dashboard/kaprodi/pemetaan/${mk.kodeMK}`)}
                                        className="text-blue-600 font-medium hover:text-blue-800 transition">
                                        Aksi 👁
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredMK.length === 0 && (
                    <div className="text-center py-4 text-gray-400">
                        Data Mata Kuliah tidak ditemukan
                    </div>
                )}
            </div>
        </div >
    )
}

export default PemetaanKaprodi