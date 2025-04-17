import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit } from "react-icons/ai";

const DataProdiKaprodi = () => {
  const [selectedCPL, setSelectedCPL] = useState([]);
  const [selectedCPMK, setSelectedCPMK] = useState([]);

  const generateData = (type) =>
    Array(4)
      .fill()
      .map((_, index) => ({
        kode: `${type}-${index + 1}`,
        deskripsi:
          index % 2 === 0
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque imperdiet."
            : "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      }));

  const cplData = generateData("CPL");
  const cpmkData = generateData("CPMK");

  const toggleSelectRow = (index, type) => {
    if (type === "CPL") {
      setSelectedCPL((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setSelectedCPMK((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    }
  };

  const toggleSelectAll = (type) => {
    if (type === "CPL") {
      setSelectedCPL(selectedCPL.length === cplData.length ? [] : cplData.map((_, i) => i));
    } else {
      setSelectedCPMK(selectedCPMK.length === cpmkData.length ? [] : cpmkData.map((_, i) => i));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold">Teknik Informatika</h2>
      <p className="text-gray-600">Kapordi: Dr. Fajar Ramadhan, S.Kom., M.T.</p>

      {/* CPL Section */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Capaian Pembelajaran Lulusan (CPL)</h3>
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded ${selectedCPL.length > 0
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              disabled={selectedCPL.length === 0}
            >
              <AiFillDelete size={18} /> Hapus
            </button>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <AiOutlinePlus size={18} /> Tambah CPL
            </button>
          </div>
        </div>

        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={selectedCPL.length === cplData.length}
                  onChange={() => toggleSelectAll("CPL")}
                  className="w-4 h-4"
                />
              </th>
              <th className="p-3">Kode</th>
              <th className="p-3">Deskripsi</th>
              <th className="p-3">Ubah Data</th>
            </tr>
          </thead>
          <tbody>
            {cplData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedCPL.includes(index)}
                    onChange={() => toggleSelectRow(index, "CPL")}
                    className="w-4 h-4"
                  />
                </td>
                <td className="p-3">{item.kode}</td>
                <td className="p-3 break-words whitespace-normal">{item.deskripsi}</td>
                <td className="p-3 flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
                  Ubah <AiFillEdit size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CPMK Section */}
      <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">Capaian Pembelajaran Matakuliah (CPMK)</h3>
          <div className="flex gap-2">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded ${selectedCPMK.length > 0
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              disabled={selectedCPMK.length === 0}
            >
              <AiFillDelete size={18} /> Hapus
            </button>
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <AiOutlinePlus size={18} /> Tambah CPMK
            </button>
          </div>
        </div>

        <table className="w-full text-left border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={selectedCPMK.length === cpmkData.length}
                  onChange={() => toggleSelectAll("CPMK")}
                  className="w-4 h-4"
                />
              </th>
              <th className="p-3">Kode</th>
              <th className="p-3">Deskripsi</th>
              <th className="p-3">Ubah Data</th>
            </tr>
          </thead>
          <tbody>
            {cpmkData.map((item, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedCPMK.includes(index)}
                    onChange={() => toggleSelectRow(index, "CPMK")}
                    className="w-4 h-4"
                  />
                </td>
                <td className="p-3">{item.kode}</td>
                <td className="p-3 break-words whitespace-normal">{item.deskripsi}</td>
                <td className="p-3 flex items-center gap-1 text-blue-500 cursor-pointer hover:underline">
                  Ubah <AiFillEdit size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataProdiKaprodi;
