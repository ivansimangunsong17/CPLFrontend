import React, { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaCheck, FaRegChartBar, FaSearch } from 'react-icons/fa';

// Data contoh struktur pemetaan
const initialMappingData = [
  {
    cpl: 'CPL-01',
    deskripsi: 'Mampu menganalisis kebutuhan perangkat lunak',
    cpmk: [
      {
        kode: 'CPMK-01-01',
        deskripsi: 'Mampu membuat dokumen kebutuhan sistem',
        matakuliah: [
          { kode: 'RPL-301', nama: 'Rekayasa Perangkat Lunak', kontribusi: 40 },
          { kode: 'AS-201', nama: 'Analisis Sistem', kontribusi: 60 }
        ]
      },
      {
        kode: 'CPMK-01-02',
        deskripsi: 'Mampu membuat diagram use case',
        matakuliah: [
          { kode: 'RPL-301', nama: 'Rekayasa Perangkat Lunak', kontribusi: 70 },
          { kode: 'PB-101', nama: 'Pemodelan Bisnis', kontribusi: 30 }
        ]
      }
    ]
  },
  {
    cpl: 'CPL-02',
    deskripsi: 'Mampu merancang arsitektur sistem',
    cpmk: [
      {
        kode: 'CPMK-02-01',
        deskripsi: 'Mampu membuat diagram arsitektur',
        matakuliah: [
          { kode: 'ARS-401', nama: 'Arsitektur Sistem', kontribusi: 80 },
          { kode: 'DP-202', nama: 'Desain Pattern', kontribusi: 20 }
        ]
      }
    ]
  }
];

const PemetaanCPLCPMK = () => {
  const [expandedCPL, setExpandedCPL] = useState([]);
  const [expandedCPMK, setExpandedCPMK] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Fungsi toggle expand/collapse
  const toggleExpand = (type, code) => {
    if (type === 'cpl') {
      setExpandedCPL(prev =>
        prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
      );
    } else {
      setExpandedCPMK(prev =>
        prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]
      );
    }
  };

  // Filter data
  const filteredData = initialMappingData.filter(item => {
    const matchesSearch = item.cpl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = filterStatus === 'all' ? true :
      item.cpmk.some(cpmk => cpmk.matakuliah.some(mk => filterStatus === 'active' ? true : false));

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header dan Filter */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          <FaRegChartBar className="mr-2 text-blue-600" />
          Pemetaan CPL - CPMK - Mata Kuliah
        </h1>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Cari CPL/CPMK/Mata Kuliah..."
              className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="px-4 py-2 border rounded-lg bg-white"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Tidak Aktif</option>
          </select>
        </div>
      </div>

      {/* Tabel Pemetaan */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {filteredData.map((cpl) => (
          <div key={cpl.cpl} className="border-b last:border-b-0">
            {/* Header CPL */}
            <div
              className="p-4 bg-gray-50 hover:bg-gray-100 cursor-pointer flex items-center"
              onClick={() => toggleExpand('cpl', cpl.cpl)}
            >
              <span className="mr-2">
                {expandedCPL.includes(cpl.cpl) ? <FaChevronDown /> : <FaChevronRight />}
              </span>
              <div>
                <h3 className="font-semibold text-blue-600">{cpl.cpl}</h3>
                <p className="text-sm text-gray-600">{cpl.deskripsi}</p>
              </div>
            </div>

            {/* Detail CPMK */}
            {expandedCPL.includes(cpl.cpl) && cpl.cpmk.map((cpmk) => (
              <div key={cpmk.kode} className="ml-8 border-l-2 border-blue-100">
                {/* Header CPMK */}
                <div
                  className="p-4 bg-white hover:bg-gray-50 cursor-pointer flex items-center"
                  onClick={() => toggleExpand('cpmk', cpmk.kode)}
                >
                  <span className="mr-2">
                    {expandedCPMK.includes(cpmk.kode) ? <FaChevronDown /> : <FaChevronRight />}
                  </span>
                  <div>
                    <h4 className="font-medium text-green-600">{cpmk.kode}</h4>
                    <p className="text-sm text-gray-600">{cpmk.deskripsi}</p>
                  </div>
                </div>

                {/* Detail Mata Kuliah */}
                {expandedCPMK.includes(cpmk.kode) && (
                  <div className="ml-8 bg-gray-50 p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left text-sm text-gray-600">
                          <th className="pb-2">Kode</th>
                          <th className="pb-2">Mata Kuliah</th>
                          <th className="pb-2">Kontribusi</th>
                          <th className="pb-2">Status</th>
                          <th className="pb-2">Validasi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cpmk.matakuliah.map((mk) => (
                          <tr key={mk.kode} className="border-t">
                            <td className="py-3">{mk.kode}</td>
                            <td className="py-3 font-medium">{mk.nama}</td>
                            <td className="py-3">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full"
                                  style={{ width: `${mk.kontribusi}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-600">{mk.kontribusi}%</span>
                            </td>
                            <td className="py-3">
                              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                                Aktif
                              </span>
                            </td>
                            <td className="py-3">
                              <FaCheck className="text-green-600" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PemetaanCPLCPMK;