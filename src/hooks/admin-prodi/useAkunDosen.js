import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../context/AuthContext'
import { getAkunDosen, createAkunDosen, updateAkunDosen, deleteAkunDosen } from '../../services/admin-prodi/AkunDosenService'

export const useAkunDosen = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userProdiId = user?.prodi_id



  const akunDosenQuery = useQuery({
    queryKey: ['akunDosen', userProdiId],
    queryFn: () => getAkunDosen(userProdiId),
    staleTime: 1000 * 60 * 5,
  })

  const createMutation = useMutation({
    mutationFn: (data) => createAkunDosen(data, userProdiId),
    onSuccess: () => {
      toast.success('Akun dosen berhasil ditambahkan')
      queryClient.invalidateQueries(['akunDosen', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menambahkan akun dosen')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateAkunDosen,
    onSuccess: () => {
      toast.success('Akun dosen berhasil diperbarui')
      queryClient.invalidateQueries(['akunDosen', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal memperbarui akun dosen')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAkunDosen,
    onSuccess: () => {
      toast.success('Akun dosen berhasil dihapus')
      queryClient.invalidateQueries(['akunDosen', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menghapus akun dosen')
    },
  })

  return {
    akunDosenQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    user,
    userProdiId,
  }
}
