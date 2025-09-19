import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getKelas, createKelas, updateKelas, deleteKelas } from '../../services/admin-prodi/DataKelasService'

export const useKelas = ({ kelas_id = null, mata_kuliah_id = null } = {}) => {
  const queryClient = useQueryClient()

  const kelasQuery = useQuery({
    queryKey: ['kelas', kelas_id, mata_kuliah_id],
    queryFn: () => getKelas({ kelas_id, mata_kuliah_id }),
    staleTime: 1000 * 60 * 5,
  })

  // 🔹 Create
  const createMutation = useMutation({
    mutationFn: createKelas,
    onSuccess: () => {
      toast.success('Kelas berhasil ditambahkan')
      queryClient.invalidateQueries(['kelas'])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menambahkan kelas')
    },
  })

  // 🔹 Update
  const updateMutation = useMutation({
    mutationFn: updateKelas,
    onSuccess: () => {
      toast.success('Data kelas berhasil diperbarui')
      queryClient.invalidateQueries(['kelas'])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal memperbarui kelas')
    },
  })

  // 🔹 Delete
  const deleteMutation = useMutation({
    mutationFn: deleteKelas,
    onSuccess: () => {
      toast.success('Data kelas berhasil dihapus')
      queryClient.invalidateQueries(['kelas'])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menghapus kelas')
    },
  })

  return {
    kelasQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
