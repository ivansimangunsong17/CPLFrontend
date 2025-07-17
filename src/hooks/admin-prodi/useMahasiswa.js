import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../context/AuthContext'
import { getMahasiswa, createMahasiswa, updateMahasiswa, deleteMahasiswa } from '../../services/admin-prodi/DataMahasiswaService'

export const useMahasiswa = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userProdiId = user?.prodi_id

  const mahasiswaQuery = useQuery({
    queryKey: ['mahasiswa', userProdiId],
    queryFn: () => getMahasiswa(userProdiId),
    staleTime: 1000 * 60 * 5,
  })

  const createMutation = useMutation({
    mutationFn: (data) => createMahasiswa(data, userProdiId),
    onSuccess: () => {
      toast.success('Mahasiswa berhasil ditambahkan')
      queryClient.invalidateQueries(['mahasiswa', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menambahkan mahasiswa')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateMahasiswa,
    onSuccess: () => {
      toast.success('Data mahasiswa berhasil diperbarui')
      queryClient.invalidateQueries(['mahasiswa', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal memperbarui mahasiswa')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteMahasiswa,
    onSuccess: () => {
      toast.success('Data mahasiswa berhasil dihapus')
      queryClient.invalidateQueries(['mahasiswa', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menghapus mahasiswa')
    },
  })

  return {
    mahasiswaQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    user,
    userProdiId,
  }
}
