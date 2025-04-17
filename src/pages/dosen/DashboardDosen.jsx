import React from 'react';
import {
  FiBook,
  FiUsers,
  FiAward,
  FiBarChart2,
  FiClock,
  FiMessageSquare,
  FiSettings
} from 'react-icons/fi';
import {
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PolarAngleAxis,
  Legend
} from 'recharts';

const DashboardDosen = () => {
  // Data dummy interaktif
  const teachingData = [
    { course: 'Kecerdasan Buatan', progress: 85, students: 45 },
    { course: 'Basis Data', progress: 72, students: 38 },
    { course: 'Jaringan Komputer', progress: 90, students: 52 }
  ];

  const performanceData = [
    { name: 'Pengajaran', score: 88, fill: '#3B82F6' },
    { name: 'Penelitian', score: 75, fill: '#10B981' },
    { name: 'Pengabdian', score: 82, fill: '#8B5CF6' }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Input Nilai UTS', deadline: '2 Hari Lagi', priority: 'high' },
    { id: 2, title: 'Bimbingan Skripsi', deadline: 'Besok', priority: 'urgent' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header Futuristik */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Selamat Pagi, <span className="text-blue-600">Prof. Andi</span></h1>
          <p className="text-gray-500">Senin, 12 Juni 2023 | 08:30 AM</p>
        </div>
        <div className="flex space-x-4">
          <button className="p-2 bg-white rounded-full shadow-md text-blue-500">
            <FiMessageSquare size={20} />
          </button>
          <button className="p-2 bg-white rounded-full shadow-md text-gray-600">
            <FiSettings size={20} />
          </button>
        </div>
      </div>

      {/* Statistik Utama */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center">
          <div className="p-4 bg-blue-100 rounded-xl mr-4">
            <FiBook className="text-blue-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Matkul Diampu</p>
            <p className="text-2xl font-bold">5</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center">
          <div className="p-4 bg-green-100 rounded-xl mr-4">
            <FiUsers className="text-green-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Total Mahasiswa</p>
            <p className="text-2xl font-bold">183</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center">
          <div className="p-4 bg-purple-100 rounded-xl mr-4">
            <FiAward className="text-purple-600" size={24} />
          </div>
          <div>
            <p className="text-gray-500">Kinerja</p>
            <p className="text-2xl font-bold">A</p>
          </div>
        </div>
      </div>

      {/* Visualisasi Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Grafik Radar Kinerja */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiBarChart2 className="mr-2 text-indigo-500" />
            Profil Kinerja
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="20%"
                outerRadius="80%"
                data={performanceData}
                startAngle={180}
                endAngle={-180}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  minAngle={15}
                  label={{ position: 'insideStart', fill: '#fff' }}
                  background
                  dataKey="score"
                  angleAxisId={0}
                />
                <Legend />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Progress Mengajar */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Progress Perkuliahan</h2>
          <div className="space-y-4">
            {teachingData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{item.course}</span>
                  <span className="text-blue-600">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{item.students} mahasiswa</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tugas Mendatang & Aktivitas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FiClock className="mr-2 text-amber-500" />
            Tugas Mendatang
          </h2>
          <div className="space-y-4">
            {upcomingTasks.map(task => (
              <div
                key={task.id}
                className={`p-4 rounded-xl border-l-4 ${task.priority === 'urgent'
                    ? 'border-red-500 bg-red-50'
                    : 'border-amber-500 bg-amber-50'
                  }`}
              >
                <div className="flex justify-between">
                  <h3 className="font-medium">{task.title}</h3>
                  <span className={`text-sm ${task.priority === 'urgent'
                      ? 'text-red-600'
                      : 'text-amber-600'
                    }`}>
                    {task.deadline}
                  </span>
                </div>
                <button className="mt-2 text-sm bg-white px-3 py-1 rounded-full shadow-sm">
                  Tandai Selesai
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Aktivitas Terakhir</h2>
          <div className="space-y-3">
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
              <div className="bg-blue-100 p-2 rounded-lg mr-3">
                <FiBook className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Mengupload materi "Machine Learning"</p>
                <p className="text-sm text-gray-500">2 jam yang lalu</p>
              </div>
            </div>
            <div className="flex items-start p-3 hover:bg-gray-50 rounded-lg">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <FiUsers className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Presensi kelas Basis Data</p>
                <p className="text-sm text-gray-500">Kemarin, 14:30</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDosen;