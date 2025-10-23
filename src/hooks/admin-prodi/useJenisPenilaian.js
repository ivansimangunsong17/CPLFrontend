import { useQuery } from '@tanstack/react-query';
import { getJenisPenilaian } from '../../services/admin-prodi/DataJenisPenilaianService'; // Sesuaikan path jika perlu

export function useJenisPenilaian() {
  const jenisPenilaianQuery = useQuery({
  
    queryKey: ['jenisPenilaian'],

    queryFn: getJenisPenilaian,

  
  });

  return { jenisPenilaianQuery };
}