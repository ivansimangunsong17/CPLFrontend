import { toast } from 'react-toastify'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getMahasiswaKelas, createMahasiswaKelas, updateMahasiswaKelas, deleteMahasiswaKelas } from '../../services/admin-prodi/MahasiswaKelasService'

export const useMahasiswaKelas = ({ kelas_id }) => {
  const queryClient = useQueryClient()

  // GET
  const mahasiswaQuery = useQuery({
    queryKey: ['mahasiswaKelas', kelas_id],
    queryFn: () => getMahasiswaKelas(kelas_id),
  })

  // CREATE
  const createMutation = useMutation({
    // 'mahasiswasArray' sekarang adalah payload-nya langsung (bukan payload.mahasiswas)
    mutationFn: (mahasiswasArray) => createMahasiswaKelas({ kelas_id, mahasiswas: mahasiswasArray }),
    onSuccess: () => {
      toast.success('Mahasiswa berhasil ditambahkan')
      queryClient.invalidateQueries({ queryKey: ['mahasiswaKelas', kelas_id] }) // ✅ v5 style
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menambahkan mahasiswa')
    },
  })

  // UPDATE
  const updateMutation = useMutation({
    mutationFn: (payload) => updateMahasiswaKelas(payload),
    onSuccess: () => {
      toast.success('Data mahasiswa berhasil diperbarui')
      queryClient.invalidateQueries({ queryKey: ['mahasiswaKelas', kelas_id] })
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal memperbarui mahasiswa')
    },
  })

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: ({ mahasiswa_ids }) => deleteMahasiswaKelas({ mahasiswa_ids, kelas_id }),
    onSuccess: () => {
      toast.success('Data mahasiswa berhasil dihapus')
      queryClient.invalidateQueries({ queryKey: ['mahasiswaKelas', kelas_id] })
    },
    onError: (error) => {
      toast.error(error.message || 'Gagal menghapus mahasiswa')
    },
  })

  return { mahasiswaQuery, createMutation, updateMutation, deleteMutation }
}
