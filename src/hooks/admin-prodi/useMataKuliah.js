import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMataKuliah, createMataKuliah, updateMataKuliah, deleteMataKuliah } from '../../services/admin-prodi/DataMataKuliahService'

export const useMataKuliah = () => {
  const queryClient = useQueryClient()

  const mataKuliahQuery = useQuery({
    queryKey: ['mataKuliah'],
    queryFn: getMataKuliah,
    staleTime: 1000 * 60 * 5,
  })

  const createMutation = useMutation({
    mutationFn: createMataKuliah,
    onSuccess: () => {
      toast.success('Mata kuliah berhasil ditambahkan')
      queryClient.invalidateQueries(['mataKuliah'])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menambahkan mata kuliah')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateMataKuliah,
    onSuccess: () => {
      toast.success('Data mata kuliah berhasil diperbarui')
      queryClient.invalidateQueries(['mataKuliah'])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal memperbarui mata kuliah')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMataKuliah,
    onSuccess: () => {
      toast.success('Data mata kuliah berhasil dihapus')
      queryClient.invalidateQueries(['mataKuliah'])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menghapus mata kuliah')
    },
  })

  return {
    mataKuliahQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}
