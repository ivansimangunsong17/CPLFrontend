import { toast } from 'react-toastify'
import { useQuery } from '@tanstack/react-query'
import { getKelas } from '../../services/dosen/DataKelasService' // Pastikan path ini benar

export const useKelas = ({ kelas_id = null, mata_kuliah_id = null, dosen_id = null } = {}) => {
  const kelasQuery = useQuery({
    // 1. Tambahkan dosen_id ke queryKey agar query-nya unik
    queryKey: ['kelas', kelas_id, mata_kuliah_id, dosen_id], // 2. Teruskan dosen_id ke service
    queryFn: () => getKelas({ kelas_id, mata_kuliah_id, dosen_id }),
    staleTime: 1000 * 60 * 5,
    enabled: !!dosen_id, // 3. (OPSIONAL TAPI DIREKOMENDASIKAN)
    // Hanya jalankan query jika dosenId sudah ada/login
  })

  return {
    kelasQuery,
  }
}
