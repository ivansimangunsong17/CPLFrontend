import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiBookOpen } from 'react-icons/fi';
import ConfirmModal from "../../components/Modal/ConfModal";

const PemetaanCPMKProdi = ({ cpmkData = [], matakuliahData = [] }) => {
  // Dummy data fallback
  const [dummyCPMK] = useState([
    { id: 'cpmk-1', kode: 'CPMK-1', deskripsi: 'Memahami konsep dasar algoritma dan pemrograman' },
    { id: 'cpmk-2', kode: 'CPMK-2', deskripsi: 'Mampu mengimplementasikan struktur data dasar' },
    { id: 'cpmk-3', kode: 'CPMK-3', deskripsi: 'Memahami prinsip-prinsip rekayasa perangkat lunak' }
  ]);

  const [dummyMatakuliah] = useState([
    { id: 'mk-1', kode: 'MK001', nama: 'Algoritma dan Pemrograman', sks: 3 },
    { id: 'mk-2', kode: 'MK002', nama: 'Struktur Data', sks: 3 },
    { id: 'mk-3', kode: 'MK003', nama: 'Rekayasa Perangkat Lunak', sks: 3 }
  ]);

  // State untuk modal konfirmasi
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ cpmkId: '', mkId: '' });

  // Gunakan props jika ada, jika tidak gunakan dummy data
  const actualCPMK = cpmkData?.length > 0 ? cpmkData : dummyCPMK;
  const actualMatakuliah = matakuliahData?.length > 0 ? matakuliahData : dummyMatakuliah;

  const [pemetaan, setPemetaan] = useState([]);
  const [expandedCPMK, setExpandedCPMK] = useState(null);
  const [addingMatakuliah, setAddingMatakuliah] = useState(null);
  const [newBobot, setNewBobot] = useState('');

  // Inisialisasi pemetaan
  useEffect(() => {
    const initialMapping = actualCPMK.map(cpmk => ({
      cpmk: cpmk.id,
      kode: cpmk.kode,
      deskripsi: cpmk.deskripsi,
      matakuliah: actualMatakuliah.map(mk => ({
        id: mk.id,
        kode: mk.kode,
        nama: mk.nama,
        sks: mk.sks,
        bobot: 0,
        terpilih: false
      }))
    }));
    setPemetaan(initialMapping);
  }, [actualCPMK, actualMatakuliah]);

  const toggleExpand = (cpmkId) => {
    setExpandedCPMK(expandedCPMK === cpmkId ? null : cpmkId);
    setAddingMatakuliah(null);
  };

  const startAddingMatakuliah = (cpmkId, e) => {
    e.stopPropagation();
    setAddingMatakuliah(cpmkId);
    setNewBobot('');
  };

  const handleAddMatakuliah = (cpmkId, mkId) => {
    if (!newBobot || parseInt(newBobot) <= 0) return;

    setPemetaan(prev => prev.map(item => {
      if (item.cpmk === cpmkId) {
        return {
          ...item,
          matakuliah: item.matakuliah.map(mkItem => {
            if (mkItem.id === mkId) {
              return { ...mkItem, bobot: parseInt(newBobot), terpilih: true };
            }
            return mkItem;
          })
        };
      }
      return item;
    }));

    setAddingMatakuliah(null);
    setNewBobot('');
  };

  const confirmDelete = (cpmkId, mkId) => {
    setItemToDelete({ cpmkId, mkId });
    setShowConfirmModal(true);
  };

  const handleRemoveMapping = () => {
    setPemetaan(prev => prev.map(item => {
      if (item.cpmk === itemToDelete.cpmkId) {
        return {
          ...item,
          matakuliah: item.matakuliah.map(mkItem => {
            if (mkItem.id === itemToDelete.mkId) {
              return { ...mkItem, bobot: 0, terpilih: false };
            }
            return mkItem;
          })
        };
      }
      return item;
    }));
    setShowConfirmModal(false);
  };

  // Hitung statistik untuk header
  const totalPemetaan = pemetaan.reduce((acc, item) => acc + item.matakuliah.filter(m => m.terpilih).length, 0);
  const rataBobot = pemetaan.length > 0
    ? Math.round(pemetaan
      .flatMap(item => item.matakuliah.filter(m => m.terpilih))
      .reduce((acc, curr, i, arr) => acc + (curr.bobot / arr.length), 0))
    : 0;

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Header dengan informasi lebih */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <FiBookOpen className="text-indigo-500 text-xl" />
          <h1 className="text-xl font-semibold text-gray-800">Pemetaan CPMK ke Matakuliah</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-indigo-50 p-2 rounded">
            <div className="text-indigo-800 font-medium">Total CPMK</div>
            <div className="text-lg">{actualCPMK.length}</div>
          </div>
          <div className="bg-purple-50 p-2 rounded">
            <div className="text-purple-800 font-medium">Total Matakuliah</div>
            <div className="text-lg">{actualMatakuliah.length}</div>
          </div>
          <div className="bg-blue-50 p-2 rounded">
            <div className="text-blue-800 font-medium">Pemetaan Aktif</div>
            <div className="text-lg">{totalPemetaan}</div>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <div className="text-green-800 font-medium">Rata-rata Bobot</div>
            <div className="text-lg">{rataBobot}%</div>
          </div>
        </div>
      </div>

      {/* Daftar Pemetaan */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        {pemetaan.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Belum ada data pemetaan
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {pemetaan.map(item => {
              const mappedMatakuliah = item.matakuliah.filter(m => m.terpilih);

              return (
                <div key={item.cpmk} className="transition-colors hover:bg-gray-50">
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleExpand(item.cpmk)}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-indigo-600 truncate">{item.kode}</h3>
                      <p className="text-sm text-gray-600 truncate">{item.deskripsi}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500">Total Matakuliah</span>
                        <span className="font-medium">{mappedMatakuliah.length}/{item.matakuliah.length}</span>
                      </div>
                      <div className="text-gray-400">
                        {expandedCPMK === item.cpmk ? <FiChevronUp /> : <FiChevronDown />}
                      </div>
                    </div>
                  </div>

                  {expandedCPMK === item.cpmk && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      {/* Form Tambah Matakuliah */}
                      <div className="mb-4 p-3 bg-white rounded border border-gray-300">
                        {addingMatakuliah === item.cpmk ? (
                          <div className="flex flex-col sm:flex-row gap-2">
                            <select
                              className="flex-1 p-2 border rounded text-sm"
                              onChange={(e) => {
                                const selectedMatakuliah = e.target.value;
                                if (selectedMatakuliah) {
                                  handleAddMatakuliah(item.cpmk, selectedMatakuliah);
                                }
                              }}
                            >
                              <option value="">Pilih Matakuliah untuk ditambahkan...</option>
                              {item.matakuliah
                                .filter(mk => !mk.terpilih)
                                .map(mk => (
                                  <option key={mk.id} value={mk.id}>
                                    {mk.kode} - {mk.nama.substring(0, 40)}...
                                  </option>
                                ))}
                            </select>
                            <div className="flex gap-2">
                              <input
                                type="number"
                                min="1"
                                max="100"
                                placeholder="Bobot %"
                                className="w-24 p-2 border rounded text-sm"
                                value={newBobot}
                                onChange={(e) => setNewBobot(e.target.value)}
                              />
                              <button
                                className="bg-indigo-600 text-white px-3 rounded text-sm"
                                onClick={() => {
                                  const availableMatakuliah = item.matakuliah.find(m => !m.terpilih);
                                  if (availableMatakuliah) {
                                    handleAddMatakuliah(item.cpmk, availableMatakuliah.id);
                                  }
                                }}
                              >
                                Simpan
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm"
                            onClick={(e) => startAddingMatakuliah(item.cpmk, e)}
                          >
                            <FiPlus size={14} /> Tambah Matakuliah
                          </button>
                        )}
                      </div>

                      {/* Daftar Matakuliah yang sudah dipetakan */}
                      {mappedMatakuliah.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 text-sm bg-white rounded border border-dashed border-gray-300">
                          Belum ada Matakuliah yang dipetakan
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {mappedMatakuliah.map(mkItem => (
                            <div key={mkItem.id} className="flex justify-between items-center p-3 bg-white rounded border border-gray-200 hover:border-indigo-200 transition">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium truncate">{mkItem.kode}</h4>
                                <p className="text-xs text-gray-600 truncate">{mkItem.nama} ({mkItem.sks} SKS)</p>
                              </div>
                              <div className="flex items-center gap-3 ml-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${mkItem.bobot >= 70 ? 'bg-green-100 text-green-800' :
                                    mkItem.bobot >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                  {mkItem.bobot}%
                                </span>
                                <button
                                  className="text-red-500 hover:text-red-700 p-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    confirmDelete(item.cpmk, mkItem.id);
                                  }}
                                >
                                  <FiTrash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Konfirmasi Hapus */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleRemoveMapping}
        title="Konfirmasi Hapus Pemetaan"
        description="Apakah Anda yakin ingin menghapus pemetaan ini?"
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
};

export default PemetaanCPMKProdi;