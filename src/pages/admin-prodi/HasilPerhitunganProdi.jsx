import React from "react";
import { 
  AiOutlineUser, 
  AiOutlineBook, 
  AiOutlineLineChart, 
  AiOutlineBarChart 
} from "react-icons/ai";
import { 
  MdMenuBook,
  MdWarning,
  MdOutlineCheckCircle,
  MdOutlineTrendingDown
} from "react-icons/md";
import Card from "../../components/Card";

const HasilPerhitunganProdi = () => {
  const mataKuliahPerluPerbaikan = [
    { 
      name: "Basis Data", 
      cpl: 72, 
      cpmk: 70, 
      status: "Perlu Perbaikan",
      kode: "MK001"
    },
    { 
      name: "Kecerdasan Buatan", 
      cpl: 65, 
      cpmk: 68, 
      status: "Perlu Perbaikan",
      kode: "MK002"
    },
    { 
      name: "Keamanan Informasi", 
      cpl: 74, 
      cpmk: 71, 
      status: "Perlu Perbaikan",
      kode: "MK003"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Hasil Perhitungan Program Studi</h1>
        <p className="text-gray-600">Analisis pencapaian CPL dan CPMK semester ini</p>
      </div>

      {/* Statistik Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        <Card 
          icon={AiOutlineUser} 
          title="Total Mahasiswa" 
          value="1,230" 
          color="blue" 
          trend="up"
        />
        <Card 
          icon={AiOutlineBook} 
          title="Total Mata Kuliah" 
          value="45" 
          color="green" 
          trend="neutral"
        />
        <Card 
          icon={AiOutlineLineChart} 
          title="CPL Tercapai" 
          value="87%" 
          color="purple" 
          trend="up"
        />
        <Card 
          icon={AiOutlineBarChart} 
          title="Rata-rata CPL" 
          value="75,20%" 
          color="indigo" 
          trend="down"
        />
        <Card 
          icon={AiOutlineBarChart} 
          title="Rata-rata CPMK" 
          value="75,40%" 
          color="teal" 
          trend="up"
        />
        <Card 
          icon={MdMenuBook} 
          title="Perlu Perbaikan" 
          value="3" 
          color="red" 
          trend="warning"
        />
      </div>

      {/* Tabel Mata Kuliah dengan Pencapaian Rendah */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <MdOutlineTrendingDown className="text-red-500" />
                Mata Kuliah dengan Pencapaian Rendah
              </h2>
              <p className="text-sm text-gray-600">Daftar matakuliah dengan pencapaian CPL/CPMK di bawah standar</p>
            </div>
            <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">
              Prioritas
            </span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Kode</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Mata Kuliah</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CPL</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">CPMK</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mataKuliahPerluPerbaikan.map((mk, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {mk.kode}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                    {mk.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        mk.cpl < 75 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {mk.cpl}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        mk.cpmk < 75 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {mk.cpmk}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      {mk.status === "Perlu Perbaikan" ? (
                        <>
                          <MdWarning className="text-yellow-500" />
                          <span className="text-yellow-800">Perlu Perbaikan</span>
                        </>
                      ) : (
                        <>
                          <MdOutlineCheckCircle className="text-green-500" />
                          <span className="text-green-800">Memenuhi</span>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
          <p className="text-xs text-gray-600">
            *Standar minimal pencapaian: 75% untuk CPL dan CPMK
          </p>
        </div>
      </div>
    </div>
  );
};

export default HasilPerhitunganProdi;