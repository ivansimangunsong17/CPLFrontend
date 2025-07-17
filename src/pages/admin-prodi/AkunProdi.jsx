import React, { useState } from "react";
import { AiFillDelete, AiOutlinePlus, AiFillEdit, AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import ConfirmModal from "../../components/Modal/ConfModal";
import FormBox from "../../components/Form/FormBox";
import { useAkunKaprodi } from "../../hooks/admin-prodi/useAkunKaprodi";
import { useAkunDosen } from "../../hooks/admin-prodi/useAkunDosen";
import LoadingScreen from "../../components/LoadingScreen";
import TableSkeleton from "../../components/TableSkeleton";

const AkunProdi = () => {
  // Kaprodi hooks and state
  const {
    akunKaprodiQuery,
    createMutation: createKaprodiMutation,
    updateMutation: updateKaprodiMutation,
    deleteMutation: deleteKaprodiMutation,
    user,
    userProdiId,
  } = useAkunKaprodi();

  // Dosen hooks and state
  const {
    akunDosenQuery,
    createMutation: createDosenMutation,
    updateMutation: updateDosenMutation,
    deleteMutation: deleteDosenMutation,
  } = useAkunDosen();

  // Kaprodi states
  const [selectedRowsKaprodi, setSelectedRowsKaprodi] = useState([]);
  const [allSelectedKaprodi, setAllSelectedKaprodi] = useState(false);
  const [isModalOpenKaprodi, setIsModalOpenKaprodi] = useState(false);
  const [isFormOpenKaprodi, setIsFormOpenKaprodi] = useState(false);
  const [editDataKaprodi, setEditDataKaprodi] = useState(null);
  const [searchTermKaprodi, setSearchTermKaprodi] = useState("");

  // Dosen states
  const [selectedRowsDosen, setSelectedRowsDosen] = useState([]);
  const [allSelectedDosen, setAllSelectedDosen] = useState(false);
  const [isModalOpenDosen, setIsModalOpenDosen] = useState(false);
  const [isFormOpenDosen, setIsFormOpenDosen] = useState(false);
  const [editDataDosen, setEditDataDosen] = useState(null);
  const [searchTermDosen, setSearchTermDosen] = useState("");

  const dataKaprodi = akunKaprodiQuery.data || [];
  const dataDosen = akunDosenQuery.data || [];
  const isLoadingKaprodi = akunKaprodiQuery.isLoading;
  const isLoadingDosen = akunDosenQuery.isLoading;
  const errorKaprodi = akunKaprodiQuery.error;
  const errorDosen = akunDosenQuery.error;

  const formFieldsKaprodi = [
    {
      name: "name",
      label: "Nama Lengkap",
      type: "text",
      placeholder: "Masukkan nama lengkap",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Masukkan email",
      required: true,
    },
    {
      name: "nip",
      label: "NIP",
      type: "text",
      placeholder: "Masukkan NIP",
      required: false,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: editDataKaprodi ? "⚠️ Kosongkan jika tidak ingin mengubah password" : "Masukkan password",
      required: !editDataKaprodi, // Password required only for create
      description: editDataKaprodi ? "Isi hanya jika ingin mengubah password" : undefined,
    },
    {
      name: "password_confirmation",
      label: "Konfirmasi Password",
      type: "password",
      placeholder: editDataKaprodi ? "⚠️ Konfirmasi password baru" : "Konfirmasi password",
      required: !editDataKaprodi,
      description: editDataKaprodi ? "Wajib diisi jika mengubah password" : "Masukkan ulang password yang sama",
    },

  ];

  const formFieldsDosen = [
    {
      name: "name",
      label: "Nama Lengkap",
      type: "text",
      placeholder: "Masukkan nama lengkap",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Masukkan email",
      required: true,
    },
    {
      name: "nip",
      label: "NIP",
      type: "text",
      placeholder: "Masukkan NIP",
      required: false,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: editDataDosen ? "⚠️ Kosongkan jika tidak ingin mengubah password" : "Masukkan password",
      required: !editDataDosen,
      description: editDataDosen ? "Isi hanya jika ingin mengubah password" : undefined,
    },
    {
      name: "password_confirmation",
      label: "Konfirmasi Password",
      type: "password",
      placeholder: editDataDosen ? "⚠️ Konfirmasi password baru" : "Konfirmasi password",
      required: !editDataDosen,
      description: editDataDosen ? "Wajib diisi jika mengubah password" : "Masukkan ulang password yang sama",
    },

  ];

  // Kaprodi handlers
  const handleAddAkunKaprodi = (formData) => {
    // Validasi dasar
    if (!formData.name || !formData.email) {
      toast.error('Nama dan email harus diisi');
      return;
    }

    // Validasi email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Format email tidak valid');
      return;
    }

    // Validasi password untuk mode create
    if (!editDataKaprodi) {
      if (!formData.password || !formData.password_confirmation) {
        toast.error('Password dan konfirmasi password harus diisi');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password minimal 6 karakter');
        return;
      }
      if (formData.password !== formData.password_confirmation) {
        toast.error('Password dan konfirmasi password tidak sama');
        return;
      }
    } else {
      // Validasi password untuk mode edit (jika diisi)
      if (formData.password || formData.password_confirmation) {
        if (!formData.password || !formData.password_confirmation) {
          toast.error('Jika mengubah password, isi password dan konfirmasi');
          return;
        }
        if (formData.password.length < 6) {
          toast.error('Password minimal 6 karakter');
          return;
        }
        if (formData.password !== formData.password_confirmation) {
          toast.error('Password dan konfirmasi password tidak sama');
          return;
        }
      }
    }

    // Prepare data payload
    const dataWithProdiId = {
      name: formData.name,
      email: formData.email,
      nip: formData.nip,
      prodi_id: userProdiId,
    };

    // Hanya tambahkan password jika diisi
    if (!editDataKaprodi || formData.password) {
      dataWithProdiId.password = formData.password;
      dataWithProdiId.password_confirmation = formData.password_confirmation;
    }

    if (editDataKaprodi) {
      updateKaprodiMutation.mutate({ id: editDataKaprodi.id, ...dataWithProdiId });
    } else {
      createKaprodiMutation.mutate(dataWithProdiId);
    }
    setIsFormOpenKaprodi(false);
    setEditDataKaprodi(null);
  };

  const handleDeleteKaprodi = () => {
    const validIds = selectedRowsKaprodi.filter(id => {
      const akun = dataKaprodi.find(item => item.id === id);
      return akun && (akun.prodi_id === userProdiId || akun.prodi_id === null);
    });

    if (validIds.length === 0) {
      toast.error('Tidak ada akun kaprodi yang valid untuk dihapus');
      return;
    }

    deleteKaprodiMutation.mutate(validIds);
    setSelectedRowsKaprodi([]);
    setAllSelectedKaprodi(false);
    setIsModalOpenKaprodi(false);
  };

  const handleDeleteSingleKaprodi = (id) => {
    const akun = dataKaprodi.find(item => item.id === id);

    if (akun && (akun.prodi_id === userProdiId || akun.prodi_id === null)) {
      setSelectedRowsKaprodi([id]);
      setIsModalOpenKaprodi(true);
    } else {
      toast.error('Anda tidak memiliki izin untuk menghapus akun kaprodi ini');
    }
  };

  // Enhanced Kaprodi handlers
  const handleAddKaprodi = () => {
    setEditDataKaprodi(null);
    setIsFormOpenKaprodi(true);
  };

  const handleEditKaprodi = (item) => {
    if (item.prodi_id === userProdiId || item.prodi_id === null) {
      setEditDataKaprodi(item);
      setIsFormOpenKaprodi(true);
    } else {
      toast.error('Anda tidak memiliki izin untuk mengedit akun kaprodi ini');
    }
  };

  const handleCancelKaprodiForm = () => {
    setIsFormOpenKaprodi(false);
    setEditDataKaprodi(null);
  };

  // Dosen handlers
  const handleAddAkunDosen = (formData) => {
    // Validasi dasar
    if (!formData.name || !formData.email) {
      toast.error('Nama dan email harus diisi');
      return;
    }

    // Validasi email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Format email tidak valid');
      return;
    }

    // Validasi password untuk mode create
    if (!editDataDosen) {
      if (!formData.password || !formData.password_confirmation) {
        toast.error('Password dan konfirmasi password harus diisi');
        return;
      }
      if (formData.password.length < 6) {
        toast.error('Password minimal 6 karakter');
        return;
      }
      if (formData.password !== formData.password_confirmation) {
        toast.error('Password dan konfirmasi password tidak sama');
        return;
      }
    } else {
      // Validasi password untuk mode edit (jika diisi)
      if (formData.password || formData.password_confirmation) {
        if (!formData.password || !formData.password_confirmation) {
          toast.error('Jika mengubah password, isi password dan konfirmasi');
          return;
        }
        if (formData.password.length < 6) {
          toast.error('Password minimal 6 karakter');
          return;
        }
        if (formData.password !== formData.password_confirmation) {
          toast.error('Password dan konfirmasi password tidak sama');
          return;
        }
      }
    }

    // Prepare data payload
    const dataWithProdiId = {
      name: formData.name,
      email: formData.email,
      nip: formData.nip,
      prodi_id: userProdiId,
    };

    // Hanya tambahkan password jika diisi
    if (!editDataDosen || formData.password) {
      dataWithProdiId.password = formData.password;
      dataWithProdiId.password_confirmation = formData.password_confirmation;
    }

    if (editDataDosen) {
      updateDosenMutation.mutate({ id: editDataDosen.id, ...dataWithProdiId });
    } else {
      createDosenMutation.mutate(dataWithProdiId);
    }
    setIsFormOpenDosen(false);
    setEditDataDosen(null);
  };

  const handleDeleteDosen = () => {
    deleteDosenMutation.mutate(selectedRowsDosen);
    setSelectedRowsDosen([]);
    setAllSelectedDosen(false);
    setIsModalOpenDosen(false);
  };

  const handleDeleteSingleDosen = (id) => {
    setSelectedRowsDosen([id]);
    setIsModalOpenDosen(true);
  };

  // Enhanced Dosen handlers
  const handleAddDosen = () => {
    setEditDataDosen(null);
    setIsFormOpenDosen(true);
  };

  const handleEditDosen = (item) => {
    setEditDataDosen(item);
    setIsFormOpenDosen(true);
  };

  const handleCancelDosenForm = () => {
    setIsFormOpenDosen(false);
    setEditDataDosen(null);
  };

  // Kaprodi toggle functions
  const toggleSelectAllKaprodi = () => {
    if (allSelectedKaprodi) {
      setSelectedRowsKaprodi([]);
    } else {
      const validIds = filteredDataKaprodi
        .filter(item => item.prodi_id === userProdiId || item.prodi_id === null)
        .map(item => item.id);
      setSelectedRowsKaprodi(validIds);
    }
    setAllSelectedKaprodi(!allSelectedKaprodi);
  };

  const toggleSelectRowKaprodi = (id) => {
    const akun = dataKaprodi.find(item => item.id === id);

    if (!(akun.prodi_id === userProdiId || akun.prodi_id === null)) {
      return;
    }

    if (selectedRowsKaprodi.includes(id)) {
      setSelectedRowsKaprodi(selectedRowsKaprodi.filter((rowId) => rowId !== id));
    } else {
      setSelectedRowsKaprodi([...selectedRowsKaprodi, id]);
    }
  };

  // Dosen toggle functions
  const toggleSelectAllDosen = () => {
    if (allSelectedDosen) {
      setSelectedRowsDosen([]);
    } else {
      const validIds = filteredDataDosen.map(item => item.id);
      setSelectedRowsDosen(validIds);
    }
    setAllSelectedDosen(!allSelectedDosen);
  };

  const toggleSelectRowDosen = (id) => {
    if (selectedRowsDosen.includes(id)) {
      setSelectedRowsDosen(selectedRowsDosen.filter((rowId) => rowId !== id));
    } else {
      setSelectedRowsDosen([...selectedRowsDosen, id]);
    }
  };

  // Filter data
  const filteredDataKaprodi = dataKaprodi.filter((item) => {
    const term = (searchTermKaprodi || "").toLowerCase().trim();
    return (
      item.nama?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.prodi_nama?.toLowerCase().includes(term)
    );
  });

  const filteredDataDosen = dataDosen.filter((item) => {
    const term = (searchTermDosen || "").toLowerCase().trim();
    return (
      item.nama?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term) ||
      item.nip?.toLowerCase().includes(term)
    );
  });

  const isMutating = createKaprodiMutation.isPending || updateKaprodiMutation.isPending || deleteKaprodiMutation.isPending ||
    createDosenMutation.isPending || updateDosenMutation.isPending || deleteDosenMutation.isPending;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Loading */}
      {isMutating && <LoadingScreen />}

      {/* Header */}


      {/* Akun Kaprodi Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Akun Kaprodi</h2>

          </div>



          <div className="flex gap-3">
            <div className="relative max-w-md">
              <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari akun kaprodi..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTermKaprodi}
                onChange={(e) => setSearchTermKaprodi(e.target.value)}
              />
            </div>

            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedRowsKaprodi.length > 0 && !deleteKaprodiMutation.isPending
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              disabled={selectedRowsKaprodi.length === 0 || deleteKaprodiMutation.isPending}
              onClick={() => setIsModalOpenKaprodi(true)}
            >
              <AiFillDelete size={20} />
              <span>Hapus</span>
            </button>

            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={handleAddKaprodi}
              disabled={createKaprodiMutation.isPending}
            >
              <AiOutlinePlus size={18} />
              <span>Tambah</span>
            </button>
          </div>
        </div>

        {/* Search Bar Kaprodi */}


        {/* Table Kaprodi */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {errorKaprodi && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
              <p className="font-medium">Error memuat data:</p>
              <p className="text-sm">{errorKaprodi.message}</p>
            </div>
          )}
          <table className="w-full">
            <thead className="bg-blue-100 text-black">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={allSelectedKaprodi}
                    onChange={toggleSelectAllKaprodi}
                    className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">NIP</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoadingKaprodi ? (
                <TableSkeleton rows={5} columns={6} />
              ) : filteredDataKaprodi.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    Tidak ada data akun kaprodi.
                  </td>
                </tr>
              ) : (
                filteredDataKaprodi.map((item, index) => (
                  <tr key={item.id ?? index} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRowsKaprodi.includes(item.id)}
                        onChange={() => toggleSelectRowKaprodi(item.id)}
                        disabled={!(item.prodi_id === userProdiId || item.prodi_id === null)}
                        className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.nama}</td>
                    <td className="p-4 text-gray-600">{item.email}</td>

                    <td className="p-4 text-gray-600">{item.nip || '-'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditKaprodi(item)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                          disabled={!(item.prodi_id === userProdiId || item.prodi_id === null)}
                        >
                          <AiFillEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteSingleKaprodi(item.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                          disabled={!(item.prodi_id === userProdiId || item.prodi_id === null)}
                        >
                          <AiFillDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Akun Dosen Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Akun Dosen</h2>

          </div>
          <div className="flex gap-3">
            {/* Search Bar Dosen */}

            <div className="relative max-w-md">
              <AiOutlineSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Cari akun dosen..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTermDosen}
                onChange={(e) => setSearchTermDosen(e.target.value)}
              />
            </div>

            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedRowsDosen.length > 0 && !deleteDosenMutation.isPending
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              disabled={selectedRowsDosen.length === 0 || deleteDosenMutation.isPending}
              onClick={() => setIsModalOpenDosen(true)}
            >
              <AiFillDelete size={20} />
              <span>Hapus</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={handleAddDosen}
              disabled={createDosenMutation.isPending}
            >
              <AiOutlinePlus size={20} />
              <span>Tambah</span>
            </button>
          </div>
        </div>



        {/* Table Dosen */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {errorDosen && (
            <div className="p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
              <p className="font-medium">Error memuat data:</p>
              <p className="text-sm">{errorDosen.message}</p>
            </div>
          )}
          <table className="w-full">
            <thead className="bg-blue-100 text-black">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    checked={allSelectedDosen}
                    onChange={toggleSelectAllDosen}
                    className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                  />
                </th>
                <th className="p-4 text-left">Nama</th>
                <th className="p-4 text-left">Email</th>

                <th className="p-4 text-left">NIP</th>
                <th className="p-4 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoadingDosen ? (
                <TableSkeleton rows={5} columns={6} />
              ) : filteredDataDosen.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-500">
                    Tidak ada data akun dosen.
                  </td>
                </tr>
              ) : (
                filteredDataDosen.map((item, index) => (
                  <tr key={item.id ?? index} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRowsDosen.includes(item.id)}
                        onChange={() => toggleSelectRowDosen(item.id)}
                        className="w-4 h-4 rounded accent-blue-500 focus:ring-blue-300"
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.nama}</td>
                    <td className="p-4 text-gray-600">{item.email}</td>

                    <td className="p-4 text-gray-600">{item.nip || '-'}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditDosen(item)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition"
                        >
                          <AiFillEdit size={20} />

                        </button>
                        <button
                          onClick={() => handleDeleteSingleDosen(item.id)}
                          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
                        >
                          <AiFillDelete size={20} />

                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modals */}
      <ConfirmModal
        isOpen={isModalOpenKaprodi}
        onClose={() => setIsModalOpenKaprodi(false)}
        onConfirm={handleDeleteKaprodi}
        title="Konfirmasi Hapus"
        description={`Anda akan menghapus ${selectedRowsKaprodi.length} ${selectedRowsKaprodi.length === 1 ? 'akun kaprodi' : 'akun kaprodi'}. Lanjutkan?`}
        confirmText="Hapus"
        cancelText="Batal"
      />

      <ConfirmModal
        isOpen={isModalOpenDosen}
        onClose={() => setIsModalOpenDosen(false)}
        onConfirm={handleDeleteDosen}
        title="Konfirmasi Hapus"
        description={`Anda akan menghapus ${selectedRowsDosen.length} ${selectedRowsDosen.length === 1 ? 'akun dosen' : 'akun dosen'}. Lanjutkan?`}
        confirmText="Hapus"
        cancelText="Batal"
      />

      {/* Form Modals */}
      <FormBox
        title={editDataKaprodi ? "Edit Akun Kaprodi" : "Tambah Akun Kaprodi Baru"}
        subtitle={editDataKaprodi ? "Perbarui informasi akun kaprodi" : "Lengkapi data untuk akun kaprodi baru"}
        fields={formFieldsKaprodi}
        initialData={editDataKaprodi ? {
          name: editDataKaprodi.nama || editDataKaprodi.name || '',
          email: editDataKaprodi.email || '',
          password: '',
          password_confirmation: '',
          nip: editDataKaprodi.nip || '',
        } : {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          nip: '',
        }}
        onSubmit={handleAddAkunKaprodi}
        onCancel={handleCancelKaprodiForm}
        isLoading={createKaprodiMutation.isPending || updateKaprodiMutation.isPending}
        isOpen={isFormOpenKaprodi}
      />

      <FormBox
        title={editDataDosen ? "Edit Akun Dosen" : "Tambah Akun Dosen Baru"}
        subtitle={editDataDosen ? "Perbarui informasi akun dosen" : "Lengkapi data untuk akun dosen baru"}
        fields={formFieldsDosen}
        initialData={editDataDosen ? {
          name: editDataDosen.nama || editDataDosen.name || '',
          email: editDataDosen.email || '',
          password: '',
          password_confirmation: '',
          nip: editDataDosen.nip || '',
        } : {
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
          nip: '',
        }}
        onSubmit={handleAddAkunDosen}
        onCancel={handleCancelDosenForm}
        isLoading={createDosenMutation.isPending || updateDosenMutation.isPending}
        isOpen={isFormOpenDosen}
      />
    </div>
  );
};

export default AkunProdi;