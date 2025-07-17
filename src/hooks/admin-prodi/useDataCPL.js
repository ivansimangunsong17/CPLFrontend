import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../../context/AuthContext'
import { getDataCPL, createDataCPL, updateDataCPL, deleteDataCPL } from '../../services/admin-prodi/DataCPLService'

export const useDataCPL = () => {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const userProdiId = user?.prodi_id

  const dataCPLQuery = useQuery({
    queryKey: ['dataCPL', userProdiId],
    queryFn: () => getDataCPL(userProdiId),
    staleTime: 1000 * 60 * 5,
  })

  const createMutation = useMutation({
    mutationFn: (data) => createDataCPL(data, userProdiId),
    onSuccess: () => {
      toast.success('Data CPL berhasil ditambahkan')
      queryClient.invalidateQueries(['dataCPL', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menambahkan data CPL')
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateDataCPL,
    onSuccess: () => {
      toast.success('Data CPL berhasil diperbarui')
      queryClient.invalidateQueries(['dataCPL', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal memperbarui data CPL')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteDataCPL,
    onSuccess: () => {
      toast.success('Data CPL berhasil dihapus')
      queryClient.invalidateQueries(['dataCPL', userProdiId])
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menghapus data CPL')
    },
  })

  return {
    dataCPLQuery,
    createMutation,
    updateMutation,
    deleteMutation,
    user,
    userProdiId,
  }
}
