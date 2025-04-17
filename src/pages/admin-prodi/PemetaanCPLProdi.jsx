import React, { useState, useEffect } from 'react';
import { FiPlus, FiTrash2, FiChevronDown, FiChevronUp, FiBook } from 'react-icons/fi';
import ConfirmModal from "../../components/Modal/ConfModal";

const PemetaanCPLProdi = ({ cplData = [], cpmkData = [] }) => {
  // Dummy data fallback
  const [dummyCPL] = useState([
    { id: 'cpl-1', kode: 'CPL-1', deskripsi: 'Mampu menerapkan pengetahuan matematika dan ilmu komputer' },
    { id: 'cpl-2', kode: 'CPL-2', deskripsi: 'Mampu menganalisis masalah kompleks dalam komputasi' },
    { id: 'cpl-3', kode: 'CPL-3', deskripsi: 'Mampu merancang solusi berbasis komputasi' }
  ]);

  const [dummyCPMK] = useState([
    { id: 'cpmk-1', kode: 'CPMK-1', deskripsi: 'Memahami konsep dasar algoritma dan pemrograman' },
    { id: 'cpmk-2', kode: 'CPMK-2', deskripsi: 'Mampu mengimplementasikan struktur data dasar' },
    { id: 'cpmk-3', kode: 'CPMK-3', deskripsi: 'Memahami prinsip-prinsip rekayasa perangkat lunak' },
    { id: 'cpmk-4', kode: 'CPMK-4', deskripsi: 'Memahami konsep dasar algoritma dan pemrograman' },
    { id: 'cpmk-5', kode: 'CPMK-5', deskripsi: 'Mampu mengimplementasikan struktur data dasar' },
    { id: 'cpmk-6', kode: 'CPMK-6', deskripsi: 'Memahami prinsip-prinsip rekayasa perangkat lunak' }
  ]);

  // State for confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({ cplId: '', cpmkId: '' });

  // Gunakan props jika ada, jika tidak gunakan dummy data
  const actualCPL = cplData?.length > 0 ? cplData : dummyCPL;
  const actualCPMK = cpmkData?.length > 0 ? cpmkData : dummyCPMK;

  const [pemetaan, setPemetaan] = useState([]);
  const [expandedCPL, setExpandedCPL] = useState(null);
  const [addingCPMK, setAddingCPMK] = useState(null);
  const [newBobot, setNewBobot] = useState('');

  // Inisialisasi pemetaan
  useEffect(() => {
    const initialMapping = actualCPL.map(cpl => ({
      cpl: cpl.id,
      cpmk: actualCPMK.map(cpmk => ({
        id: cpmk.id,
        kode: cpmk.kode,
        deskripsi: cpmk.deskripsi,
        bobot: 0,
        terpilih: false
      }))
    }));
    setPemetaan(initialMapping);
  }, [actualCPL, actualCPMK]);

  const toggleExpand = (cplId) => {
    setExpandedCPL(expandedCPL === cplId ? null : cplId);
    setAddingCPMK(null);
  };

  const startAddingCPMK = (cplId, e) => {
    e.stopPropagation();
    setAddingCPMK(cplId);
    setNewBobot('');
  };

  const handleAddCPMK = (cplId, cpmkId) => {
    if (!newBobot || parseInt(newBobot) <= 0) return;

    setPemetaan(prev => prev.map(item => {
      if (item.cpl === cplId) {
        return {
          ...item,
          cpmk: item.cpmk.map(cpmkItem => {
            if (cpmkItem.id === cpmkId) {
              return { ...cpmkItem, bobot: parseInt(newBobot), terpilih: true };
            }
            return cpmkItem;
          })
        };
      }
      return item;
    }));

    setAddingCPMK(null);
    setNewBobot('');
  };

  const confirmDelete = (cplId, cpmkId) => {
    setItemToDelete({ cplId, cpmkId });
    setShowConfirmModal(true);
  };

  const handleRemoveMapping = () => {
    setPemetaan(prev => prev.map(item => {
      if (item.cpl === itemToDelete.cplId) {
        return {
          ...item,
          cpmk: item.cpmk.map(cpmkItem => {
            if (cpmkItem.id === itemToDelete.cpmkId) {
              return { ...cpmkItem, bobot: 0, terpilih: false };
            }
            return cpmkItem;
          })
        };
      }
      return item;
    }));
    setShowConfirmModal(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Header dengan informasi lebih */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <FiBook className="text-blue-500 text-xl" />
          <h1 className="text-xl font-semibold text-gray-800">Pemetaan CPL ke CPMK</h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="bg-blue-50 p-2 rounded">
            <div className="text-blue-800 font-medium">Total CPL</div>
            <div className="text-lg">{actualCPL.length}</div>
          </div>
          <div className="bg-green-50 p-2 rounded">
            <div className="text-green-800 font-medium">Total CPMK</div>
            <div className="text-lg">{actualCPMK.length}</div>
          </div>
          <div className="bg-purple-50 p-2 rounded">
            <div className="text-purple-800 font-medium">Pemetaan Aktif</div>
            <div className="text-lg">
              {pemetaan.reduce((acc, item) => acc + item.cpmk.filter(c => c.terpilih).length, 0)}
            </div>
          </div>
          <div className="bg-yellow-50 p-2 rounded">
            <div className="text-yellow-800 font-medium">Rata-rata Bobot</div>
            <div className="text-lg">
              {pemetaan.length > 0
                ? Math.round(pemetaan
                  .flatMap(item => item.cpmk.filter(c => c.terpilih))
                  .reduce((acc, curr, i, arr) => acc + (curr.bobot / arr.length), 0)) + '%'
                : '0%'}
            </div>
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
              const cpl = actualCPL.find(c => c.id === item.cpl);
              const mappedCPMK = item.cpmk.filter(c => c.terpilih);

              return (
                <div key={item.cpl} className="transition-colors hover:bg-gray-50">
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleExpand(item.cpl)}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-blue-600 truncate">{cpl?.kode}</h3>
                      <p className="text-sm text-gray-600 truncate">{cpl?.deskripsi}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="flex flex-col items-end">
                        <span className="text-xs text-gray-500">Total CPMK</span>
                        <span className="font-medium">{mappedCPMK.length}/{item.cpmk.length}</span>
                      </div>
                      <div className="text-gray-400">
                        {expandedCPL === item.cpl ? <FiChevronUp /> : <FiChevronDown />}
                      </div>
                    </div>
                  </div>

                  {expandedCPL === item.cpl && (
                    <div className="p-4 bg-gray-50 border-t border-gray-200">
                      {/* Form Tambah CPMK */}
                      <div className="mb-4 p-3 bg-white rounded border border-gray-300">
                        {addingCPMK === item.cpl ? (
                          <div className="flex flex-col sm:flex-row gap-2">
                            <select
                              className="flex-1 p-2 border rounded text-sm"
                              onChange={(e) => {
                                const selectedCPMK = e.target.value;
                                if (selectedCPMK) {
                                  handleAddCPMK(item.cpl, selectedCPMK);
                                }
                              }}
                            >
                              <option value="">Pilih CPMK untuk ditambahkan...</option>
                              {item.cpmk
                                .filter(cpmk => !cpmk.terpilih)
                                .map(cpmk => (
                                  <option key={cpmk.id} value={cpmk.id}>
                                    {cpmk.kode} - {cpmk.deskripsi.substring(0, 40)}...
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
                                className="bg-blue-600 text-white px-3 rounded text-sm"
                                onClick={() => {
                                  const availableCPMK = item.cpmk.find(c => !c.terpilih);
                                  if (availableCPMK) {
                                    handleAddCPMK(item.cpl, availableCPMK.id);
                                  }
                                }}
                              >
                                Simpan
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                            onClick={(e) => startAddingCPMK(item.cpl, e)}
                          >
                            <FiPlus size={14} /> Tambah CPMK
                          </button>
                        )}
                      </div>

                      {/* Daftar CPMK yang sudah dipetakan */}
                      {mappedCPMK.length === 0 ? (
                        <div className="text-center py-4 text-gray-500 text-sm bg-white rounded border border-dashed border-gray-300">
                          Belum ada CPMK yang dipetakan
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {mappedCPMK.map(cpmkItem => (
                            <div key={cpmkItem.id} className="flex justify-between items-center p-3 bg-white rounded border border-gray-200 hover:border-blue-200 transition">
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium truncate">{cpmkItem.kode}</h4>
                                <p className="text-xs text-gray-600 truncate">{cpmkItem.deskripsi}</p>
                              </div>
                              <div className="flex items-center gap-3 ml-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${cpmkItem.bobot >= 70 ? 'bg-green-100 text-green-800' :
                                    cpmkItem.bobot >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                                  }`}>
                                  {cpmkItem.bobot}%
                                </span>
                                <button
                                  className="text-red-500 hover:text-red-700 p-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    confirmDelete(item.cpl, cpmkItem.id);
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
        description="Apakah Anda yakin ingin menghapus pemetaan CPMK ini?"
        confirmText="Hapus"
        cancelText="Batal"
      />
    </div>
  );
};

export default PemetaanCPLProdi;