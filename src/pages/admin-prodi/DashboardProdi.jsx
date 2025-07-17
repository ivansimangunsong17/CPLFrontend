import React from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  FiUsers,
  FiUserCheck,
  FiBook,
  FiCheckCircle,
  FiAlertTriangle
} from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const DashboardProdi = () => {
  const { prodiId } = useParams();
  const { user } = useAuth();

  // Simulasi data prodi berdasarkan prodi_id (nanti bisa diganti dengan API call)
  const prodiInfo = {
    1: { name: "Teknik Informatika", fakultas: "Fakultas Teknik" },
    2: { name: "Sistem Informasi", fakultas: "Fakultas Teknik" },
    3: { name: "Teknik Elektro", fakultas: "Fakultas Teknik" },
    // Tambahkan prodi lainnya sesuai kebutuhan
  };

  const currentProdi = prodiInfo[prodiId || user?.prodi_id] || { name: "Program Studi", fakultas: "Fakultas" };

  // Data statistik
  const cardData = [
    {
      title: "Mahasiswa",
      value: "1.240",
      icon: FiUsers,
      color: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      title: "Dosen",
      value: "28",
      icon: FiUserCheck,
      color: "bg-green-100",
      iconColor: "text-green-600"
    },
    {
      title: "Matakuliah",
      value: "45",
      icon: FiBook,
      color: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      title: "CPL Rata-rata",
      value: "87%",
      icon: FiCheckCircle,
      color: "bg-amber-100",
      iconColor: "text-amber-600"
    }
  ];

  // Data ketercapaian per CPL
  const cplAchievement = [
    { cpl: "CPL 1", percentage: 92, status: "tercapai" },
    { cpl: "CPL 2", percentage: 78, status: "perlu perbaikan" },
    { cpl: "CPL 3", percentage: 85, status: "tercapai" },
    { cpl: "CPL 4", percentage: 88, status: "tercapai" },
    { cpl: "CPL 5", percentage: 65, status: "perlu perbaikan" },
  ];

  // Warna berdasarkan status
  const getColor = (status) => {
    return status === "tercapai" ? "#10B981" : "#EF4444";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header dengan informasi prodi */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Prodi</h1>
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">{currentProdi.name}</span> • {currentProdi.fakultas}
            {prodiId && (
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                ID: {prodiId}
              </span>
            )}
          </div>
        </div>

        {/* Kartu Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {cardData.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className={`p-3 rounded-lg ${card.color} ${card.iconColor} mr-3`}>
                <card.icon className="text-lg" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-semibold">{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Grafik Ketercapaian CPL */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">Ketercapaian per CPL</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cplAchievement}>
                <XAxis
                  dataKey="cpl"
                  tick={{ fill: '#4B5563' }}
                  axisLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fill: '#4B5563' }}
                  axisLine={false}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip
                  formatter={(value) => [`${value}%`, "Pencapaian"]}
                  contentStyle={{
                    borderRadius: '6px',
                    border: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="percentage">
                  {cplAchievement.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getColor(entry.status)}
                      radius={[4, 4, 0, 0]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Daftar CPL Perlu Perbaikan */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="p-2 rounded-lg bg-red-100 text-red-600 mr-3">
              <FiAlertTriangle className="text-lg" />
            </div>
            <h2 className="text-lg font-semibold">CPL Perlu Perbaikan</h2>
          </div>

          <ul className="space-y-3">
            {cplAchievement
              .filter(cpl => cpl.status === "perlu perbaikan")
              .map((cpl, index) => (
                <li key={index} className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                  <span className="font-medium">{cpl.cpl}:</span>
                  <span className="ml-1 text-gray-700">{cpl.percentage}% (Target: 75%)</span>
                  <span className="ml-2 text-red-500 text-sm">Gap: {75 - cpl.percentage}%</span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardProdi;