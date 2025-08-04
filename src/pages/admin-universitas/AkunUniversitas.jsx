import React, { useState, useMemo } from "react";
import {
  AiFillDelete,
  AiOutlinePlus,
  AiFillEdit,
  AiOutlineArrowDown,
} from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TableSkeleton from "../../components/TableSkeleton";
import ConfirmModal from "../../components/Modal/ConfModal";
import FormBox from "../../components/Form/FormBox";
import LoadingScreen from "../../components/LoadingScreen";
import {
  useAdminUnivList,
  useAddAdminUniv,
  useDeleteAdminUniv,
  useUpdateAdminUniv,
} from "../../hooks/admin-universitas/useAkunUniv";
import {
  useAdminProdiList,
  useAddAdminProdi,
  useDeleteAdminProdi,
  useUpdateAdminProdi,
} from "../../hooks/admin-universitas/useAkunProdi";
import { useProdiList } from "../../hooks/admin-universitas/useDataProdi";

const AkunUniversitas = () => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [selectedItems, setSelectedItems] = useState({
    adminUniv: [],
    adminProdi: []
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const { data: adminUnivList, isLoading: isLoadingAdminUniv, isError: isErrorAdminUniv } = useAdminUnivList();
  const { data: adminProdiList, isLoading: isLoadingAdminProdi, isError: isErrorAdminProdi } = useAdminProdiList();
  const { data: prodiList } = useProdiList();

  const deleteAdminUnivMutation = useDeleteAdminUniv();
  const deleteAdminProdiMutation = useDeleteAdminProdi();
  const addAdminUnivMutation = useAddAdminUniv();
  const addAdminProdiMutation = useAddAdminProdi();
  const updateAdminUnivMutation = useUpdateAdminUniv();
  const updateAdminProdiMutation = useUpdateAdminProdi();

  const handleCheckboxChange = (type, id, isChecked) => {
    setSelectedItems(prev => ({
      ...prev,
      [type]: isChecked ? [...prev[type], id] : prev[type].filter(itemId => itemId !== id)
    }));
  };

  const handleSelectAll = (type, isChecked) => {
    const dataList = type === 'adminUniv' ? adminUnivList : adminProdiList;
    setSelectedItems(prev => ({
      ...prev,
      [type]: isChecked ? dataList?.map(item => item.id) || [] : []
    }));
  };

  const handleDeleteSingle = (type, id, name) => {
    setDeleteTarget({ type, id, name, isBulk: false });
    setIsConfirmModalOpen(true);
  };

  const handleDeleteMultiple = (type) => {
    const selectedIds = selectedItems[type];
    if (selectedIds.length === 0) {
      toast.warning('Pilih minimal satu item untuk dihapus');
      return;
    }
    setDeleteTarget({ type, ids: selectedIds, isBulk: true });
    setIsConfirmModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      if (deleteTarget.isBulk) {
        const deletePromises = deleteTarget.ids.map(id => {
          return deleteTarget.type === 'adminUniv'
            ? deleteAdminUnivMutation.mutateAsync(id)
            : deleteAdminProdiMutation.mutateAsync(id);
        });
        await Promise.all(deletePromises);
        toast.success(`Berhasil menghapus ${deleteTarget.ids.length} akun`);
        setSelectedItems(prev => ({ ...prev, [deleteTarget.type]: [] }));
      } else {
        if (deleteTarget.type === 'adminUniv') {
          await deleteAdminUnivMutation.mutateAsync(deleteTarget.id);
        } else {
          await deleteAdminProdiMutation.mutateAsync(deleteTarget.id);
        }
        toast.success(`Berhasil menghapus akun ${deleteTarget.name}`);
      }
    } catch (error) {
      toast.error('Gagal menghapus akun');
    } finally {
      setIsConfirmModalOpen(false);
      setDeleteTarget(null);
    }
  };

  const handleEdit = (type, item) => {
    console.log('Edit handler called:', { type, item });

    setEditData(item);
    setIsEditMode(true);
    setFormType(type);
    setIsFormOpen(true);
  };

  const handleAddAccount = (type) => {
    setEditData(null);
    setIsEditMode(false);
    setFormType(type);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    console.log('Form submit:', { data, isEditMode, editData });

    // ✅ Basic validation (nama dan email selalu required)
    if (!data.name || !data.email) {
      toast.error('Nama dan email harus diisi');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      toast.error('Format email tidak valid');
      return;
    }

    // ✅ Password validation - hanya untuk create mode atau jika password diisi saat edit
    if (!isEditMode) {
      // Create mode - password wajib
      if (!data.password || !data.password_confirmation) {
        toast.error('Password dan konfirmasi password harus diisi');
        return;
      }
      if (data.password.length < 6) {
        toast.error('Password minimal 6 karakter');
        return;
      }
      if (data.password !== data.password_confirmation) {
        toast.error('Password dan konfirmasi tidak sama');
        return;
      }
    } else {
      // Edit mode - password optional
      if (data.password || data.password_confirmation) {
        // Jika user mengisi password, validasi lengkap
        if (!data.password || !data.password_confirmation) {
          toast.error('Jika ingin mengubah password, isi password dan konfirmasi');
          return;
        }
        if (data.password.length < 6) {
          toast.error('Password minimal 6 karakter');
          return;
        }
        if (data.password !== data.password_confirmation) {
          toast.error('Password dan konfirmasi tidak sama');
          return;
        }
      }
    }

    // ✅ Prodi validation hanya untuk admin prodi
    if (formType === 'adminProdi' && !data.prodi_id) {
      toast.error('Program Studi harus dipilih');
      return;
    }

    try {
      // ✅ Build payload berdasarkan mode
      const payload = {
        name: data.name,
        nip: data.nip,
        email: data.email,
        ...(formType === 'adminProdi' && { prodi_id: data.prodi_id }),
      };

      // ✅ Hanya tambahkan password jika diisi (create mode atau edit dengan password baru)
      if (!isEditMode || (data.password && data.password_confirmation)) {
        payload.password = data.password;
        payload.password_confirmation = data.password_confirmation;
      }

      if (isEditMode) {
        // ✅ UPDATE MODE
        const updatePayload = {
          id: editData.id,
          ...payload
        };

        if (formType === 'adminUniv') {
          await updateAdminUnivMutation.mutateAsync(updatePayload);
          toast.success('Berhasil memperbarui Admin Universitas');
        } else {
          await updateAdminProdiMutation.mutateAsync(updatePayload);
          toast.success('Berhasil memperbarui Admin Prodi');
        }
      } else {
        // ✅ CREATE MODE  
        if (formType === 'adminUniv') {
          await addAdminUnivMutation.mutateAsync(payload);
          toast.success('Berhasil menambah Admin Universitas');
        } else {
          await addAdminProdiMutation.mutateAsync(payload);
          toast.success('Berhasil menambah Admin Prodi');
        }
      }

      // Reset form
      setIsFormOpen(false);
      setFormType(null);
      setEditData(null);
      setIsEditMode(false);
    } catch (error) {
      console.error('Form submission error:', error);
      const message =
        error?.response?.data?.message ||
        Object.values(error?.response?.data?.errors || {})[0]?.[0] ||
        'Gagal memproses akun. Silakan coba lagi.';
      toast.error(message);
    }
  };

  const handleFormCancel = () => {
    setIsFormOpen(false);
    setFormType(null);
    setEditData(null);
    setIsEditMode(false);
  };

  const formFields = useMemo(() => {
    const base = [
      { name: 'name', label: 'Nama Lengkap', type: 'text', required: true },
      { name: 'nip', label: 'NIP', type: 'text', required: true },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: isEditMode ? 'Password Baru (kosongkan jika tidak diubah)' : 'Password', type: 'password', required: !isEditMode },
      { name: 'password_confirmation', label: isEditMode ? 'Konfirmasi Password Baru' : 'Konfirmasi Password', type: 'password', required: !isEditMode }
    ];

    if (formType === 'adminProdi') {
      const prodiOptions = prodiList?.map(p => ({
        value: p.prodi_id,
        label: p.nama_prodi  // ✅ gunakan `nama_prodi` bukan `name`
      })) || [];

      return [...base, {
        name: 'prodi_id',
        label: 'Program Studi',
        type: 'select',
        required: true,
        options: prodiOptions
      }];
    }

    return base;
  }, [formType, prodiList, isEditMode]);



  const formInitialData = useMemo(() => {
    if (isEditMode && editData) {
      return {
        name: editData.name || '',
        nip: editData.nip || '',
        email: editData.email || '',
        password: '',
        password_confirmation: '',
        ...(formType === 'adminProdi' && { prodi_id: editData.prodi_id || '' })
      };
    }

    return {
      name: '',
      nip: '',
      email: '',
      password: '',
      password_confirmation: '',
      ...(formType === 'adminProdi' && { prodi_id: '' })
    };
  }, [formType, editData, isEditMode]);

  const getFormTitle = () => {
    if (isEditMode) {
      return formType === 'adminUniv' ? 'Edit Admin Universitas' : 'Edit Admin Prodi';
    }
    return formType === 'adminUniv' ? 'Tambah Admin Universitas' : 'Tambah Admin Prodi';
  };
  const isLoadingOperation =
    addAdminUnivMutation.isPending ||
    addAdminProdiMutation.isPending ||
    updateAdminUnivMutation.isPending ||
    updateAdminProdiMutation.isPending ||
    deleteAdminUnivMutation.isPending ||
    deleteAdminProdiMutation.isPending;


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer autoClose={2500} hideProgressBar />
      {isLoadingOperation && <LoadingScreen message="Memproses data..." />}
      {/* Tabel Admin Universitas */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Admin Universitas</h2>
          <div className="flex gap-3">
            <button
              onClick={() => handleDeleteMultiple('adminUniv')}
              disabled={selectedItems.adminUniv.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedItems.adminUniv.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
                }`}
            >
              <AiFillDelete size={18} />
              <span>Hapus</span>
            </button>
            <button
              onClick={() => handleAddAccount('adminUniv')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <AiOutlinePlus size={18} /> <span>Tambah Akun</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-200 text-black">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-500"
                    checked={adminUnivList?.length > 0 && selectedItems.adminUniv.length === adminUnivList?.length}
                    onChange={(e) => handleSelectAll('adminUniv', e.target.checked)}
                  />
                </th>
                {["Nama Lengkap", "NIP", "Email", "Role", "Aksi"].map((label, i) => (
                  <th key={i} className="p-4 text-left">
                    <div className="flex items-center gap-1">
                      {label} <AiOutlineArrowDown />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoadingAdminUniv ? (
                <TableSkeleton rows={3} />
              ) : isErrorAdminUniv ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-red-600">
                    Error loading data
                  </td>
                </tr>
              ) :
                adminUnivList?.length > 0 ? (
                  adminUnivList?.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 accent-blue-500"
                          checked={selectedItems.adminUniv.includes(item.id)}
                          onChange={(e) => handleCheckboxChange('adminUniv', item.id, e.target.checked)}
                        />
                      </td>
                      <td className="p-4 font-medium text-gray-800">{item.name}</td>
                      <td className="p-4 text-gray-600">{item.nip}</td>
                      <td className="p-4 text-gray-600">{item.email}</td>

                      <td className="p-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Admin Universitas
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit('adminUniv', item)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <AiFillEdit size={20} />
                          </button>
                          <button
                            onClick={() => handleDeleteSingle('adminUniv', item.id, item.name)}
                            className="text-red-600 hover:text-red-800 flex items-center gap-1"
                          >
                            <AiFillDelete size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>

                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-600">
                      Tidak ada data
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabel Admin Prodi */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Admin Program Studi</h2>
          <div className="flex gap-3">
            <button
              onClick={() => handleDeleteMultiple('adminProdi')}
              disabled={selectedItems.adminProdi.length === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${selectedItems.adminProdi.length === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-red-500 text-white hover:bg-red-600'
                }`}
            >
              <AiFillDelete size={18} />
              <span>Hapus</span>
            </button>
            <button
              onClick={() => handleAddAccount('adminProdi')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <AiOutlinePlus size={18} /> <span>Tambah Akun</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-200 text-black">
              <tr>
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-blue-500"
                    checked={adminProdiList?.length > 0 && selectedItems.adminProdi.length === adminProdiList?.length}
                    onChange={(e) => handleSelectAll('adminProdi', e.target.checked)}
                  />
                </th>
                {["Nama Lengkap", "NIP", "Email", "Role", "Aksi"].map((label, i) => (
                  <th key={i} className="p-4 text-left">
                    <div className="flex items-center gap-1">
                      {label} <AiOutlineArrowDown />
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoadingAdminProdi ? (
                <TableSkeleton rows={3} />
              ) : isErrorAdminProdi ? (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-red-600">
                    Error loading data
                  </td>
                </tr>
              ) : adminProdiList?.length > 0 ? (
                adminProdiList?.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-blue-500"
                        checked={selectedItems.adminProdi.includes(item.id)}
                        onChange={(e) => handleCheckboxChange('adminProdi', item.id, e.target.checked)}
                      />
                    </td>
                    <td className="p-4 font-medium text-gray-800">{item.name}</td>
                    <td className="p-4 text-gray-600">{item.nip}</td>
                    <td className="p-4 text-gray-600">{item.email}</td>

                    <td className="p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {prodiList?.find((p) => p.prodi_id === item.prodi_id)?.nama_prodi || 'Admin Prodi'}

                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit('adminProdi', item)}
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <AiFillEdit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteSingle('adminProdi', item.id, item.name)}
                          className="text-red-600 hover:text-red-800 flex items-center gap-1"
                        >
                          <AiFillDelete size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-gray-600">
                    Tidak ada data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={handleConfirmDelete}
        message={
          deleteTarget?.isBulk
            ? `Apakah Anda yakin ingin menghapus ${deleteTarget.ids.length} akun?`
            : `Apakah Anda yakin ingin menghapus akun "${deleteTarget?.name}"?`
        }
      />

      <FormBox
        key={`${formType}-${isEditMode}-${editData?.id}`}
        isOpen={isFormOpen}
        title={getFormTitle()}
        fields={formFields}
        initialData={formInitialData}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        isLoading={
          addAdminUnivMutation.isPending ||
          addAdminProdiMutation.isPending ||
          updateAdminUnivMutation.isPending ||
          updateAdminProdiMutation.isPending
        }
      />


    </div>
  );
};

export default AkunUniversitas;