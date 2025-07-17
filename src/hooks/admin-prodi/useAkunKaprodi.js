import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../context/AuthContext'
import { getAkunKaprodi, createAkunKaprodi, updateAkunKaprodi, deleteAkunKaprodi } from '../../services/admin-prodi/AkunKaprodiService'

export const useAkunKaprodi = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userProdiId = user?.prodi_id

  const akunKaprodiQuery = useQuery({
    queryKey: ['akunKaprodi', userProdiId],
    queryFn: () => getAkunKaprodi(userProdiId),
    staleTime: 1000 * 60 * 5,
  })

  const createMutation = useMutation({
    mutationFn: (data) => createAkunKaprodi(data, userProdiId),
    onSuccess: () => {
      toast.success('Akun kaprodi berhasil ditambahkan')
      queryClient.invalidateQueries(['akunKaprodi', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menambahkan akun kaprodi')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateAkunKaprodi,
    onSuccess: () => {
      toast.success('Akun kaprodi berhasil diperbarui')
      queryClient.invalidateQueries(['akunKaprodi', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal memperbarui akun kaprodi')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteAkunKaprodi,
    onSuccess: () => {
      toast.success('Akun kaprodi berhasil dihapus')
      queryClient.invalidateQueries(['akunKaprodi', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menghapus akun kaprodi')
    },
  })

  return {
    akunKaprodiQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    user,
    userProdiId,
  }
}
