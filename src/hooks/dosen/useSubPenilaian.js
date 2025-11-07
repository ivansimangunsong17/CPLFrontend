import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { getSubPenilaianByKelas, createSubPenilaian, updateSubPenilaian, deleteSubPenilaian } from '../../services/dosen/DataJenisSubPenilaianService' // Sesuaikan path jika perlu

export function useSubPenilaian(kelasId) {
  const queryClient = useQueryClient()
  const queryKey = ['subPenilaian', Number(kelasId)] // Query key spesifik untuk kelas ini

  // Query untuk mengambil data sub-penilaian
  const subPenilaianQuery = useQuery({
    queryKey: queryKey,
    queryFn: () => getSubPenilaianByKelas(Number(kelasId)),
    enabled: !!kelasId, // Hanya aktif jika kelasId ada
    staleTime: 1000 * 60 * 5, // Cache data selama 5 menit
  })

  // Mutasi untuk menambah sub-penilaian baru
  const createMutation = useMutation({
    mutationFn: createSubPenilaian, // Service menerima payload lengkap
    onSuccess: (data) => {
      toast.success(data?.message || 'Sub-penilaian berhasil ditambahkan')
      // Invalidate query untuk mengambil data terbaru
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || 'Gagal menambahkan sub-penilaian')
    },
  })

  // Mutasi untuk memperbarui nama sub-penilaian
  const updateMutation = useMutation({
    mutationFn: updateSubPenilaian,
    onSuccess: (data) => {
      toast.success(data?.message || 'Sub-penilaian berhasil diperbarui')
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || 'Gagal memperbarui sub-penilaian')
    },
  })

  // Mutasi untuk menghapus sub-penilaian
  const deleteMutation = useMutation({
    mutationFn: deleteSubPenilaian,
    onSuccess: (data) => {
      toast.success(data?.message || 'Sub-penilaian berhasil dihapus')
      queryClient.invalidateQueries({ queryKey: queryKey })
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error?.message || 'Gagal menghapus sub-penilaian')
    },
  })

  return {
    subPenilaianQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
