// src/pages/index.js

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import DashboardLayout from '../layout/DashboardLayout';
import DashboardRedirect from '../pages/DashboardRedirect';

//Admin Universitas
import DashboardUniversitas from '../pages/admin-universitas/DashboardUniversitas';
import AkunUniversitas from '../pages/admin-universitas/AkunUniversitas';
import HasilPerhitunganUniv from '../pages/admin-universitas/HasilPerhitunganUniv';
import DataProdiUniv from '../pages/admin-universitas/DataProdiUniv';
import DetailHasilPerhitunganUniv from '../pages/admin-universitas/DetailHasilPerhitunganUniv';
import DetailHasilPerhitunganKelasUniv from '../pages/admin-universitas/DetailHasilPerhitunganKelasUniv';

//Admin Prodi
import DashboardProdi from '../pages/admin-prodi/DashboardProdi';
import AkunProdi from '../pages/admin-prodi/AkunProdi';
import HasilPerhitunganProdi from '../pages/admin-prodi/HasilPerhitunganProdi';
import DataCPL from '../pages/admin-prodi/DataCPL';
import DataMahasiswaProdi from '../pages/admin-prodi/DataMahasiswaProdi';
import DataMataKuliahProdi from '../pages/admin-prodi/DataMataKuliahProdi';
import DetailMataKuliahProdi from '../pages/admin-prodi/DetailMataKuliahProdi';
import PemetaanProdi from '../pages/admin-prodi/PemetaanProdi';
import DetailPemetaanProdi from '../pages/admin-prodi/DetailPemetaanProdi';
import AturPenilaianProdi from '../pages/admin-prodi/AturPenilaianProdi';
import DetailKelasProdi from '../pages/admin-prodi/DetailKelasProdi';
import DetailPenilaianProdi from '../pages/admin-prodi/DetailPenilaianProdi';
import DetailHasilPerhitungan from '../pages/admin-prodi/DetailHasilPerhitungan';
import DetailAturPenilaianProdi from '../pages/admin-prodi/DetailAturPenilaianProdi';
import DetailDistribusiMatakuliah from '../pages/admin-prodi/DetailDistribusiMatakuliah';
import DetailDistribusiKelas from '../pages/admin-prodi/DetailDistribusiKelas';
import DetailDistribusiMahasiswa from '../pages/admin-prodi/DetailDistribusiMahasiswa';
import DetailMonitoringMahasiswa from '../pages/admin-prodi/DetailMonitoringMahasiswa';
import DetailMonitoringMatakuliahMahasiswa from '../pages/admin-prodi/DetailMonitoringMatakuliahMahasiswa';


//Kaprodi
import DashboardKaprodi from '../pages/kaprodi/DashboardKaprodi';
import DetailDistribusiMatakuliahKaprodi from '../pages/kaprodi/DetailDistribusiMatakuliahKaprodi';
import DetailMonitoringMahasiswaKaprodi from '../pages/kaprodi/DetailMonitoringMahasiswaKaprodi';
import DetailDistribusiKelasKaprodi from '../pages/kaprodi/DetailDistribusiKelasKaprodi';
import DetailDistribusiMahasiswaKaprodi from '../pages/kaprodi/DetailDistribusiMahasiswaKaprodi';
import DataMasterKaprodi from '../pages/kaprodi/DataMasterKaprodi';
import DetailDataMasterKaprodi from '../pages/kaprodi/DetailDataMasterKaprodi';
import HasilPerhitunganKaprodi from '../pages/kaprodi/HasilPerhitunganKaprodi';
import PemetaanKaprodi from '../pages/kaprodi/PemetaanKaprodi';
import DetailPemetaanKaprodi from '../pages/kaprodi/DetailPemetaanKaprodi';



//Dosen
import DashboardDosen from '../pages/dosen/DashboardDosen';
import AturPenilaianDosen from '../pages/dosen/AturPenilaianDosen';
import DetailAturPenilaianDosen from '../pages/dosen/DetailAturPenilaianDosen';
import PenilaianDosen from '../pages/dosen/PenilaianDosen';
import HasilPerhitunganDosen from '../pages/dosen/HasilPerhitunganDosen';
import DetailDistribusiDosen from '../pages/dosen/DetailDistribusiDosen';
import DetailDistribusiMahasiswaDosen from '../pages/dosen/DetailDistribusiMahasiswaDosen';
import DetailHasilPerhitunganDosen from '../pages/dosen/DetailHasilPerhitunganDosen';

export {
    LoginPage,
    NotFoundPage,
    UnauthorizedPage,
    DashboardLayout,
    DashboardRedirect,

    DashboardUniversitas,
    AkunUniversitas,
    HasilPerhitunganUniv,
    DataProdiUniv,
    DetailHasilPerhitunganUniv,
    DetailHasilPerhitunganKelasUniv,

    DashboardProdi,
    AkunProdi,
    DataMahasiswaProdi,
    DataMataKuliahProdi,
    DetailMataKuliahProdi,
    DataCPL,
    PemetaanProdi,
    DetailPemetaanProdi,
    HasilPerhitunganProdi,
    AturPenilaianProdi,
    DetailKelasProdi,
    DetailPenilaianProdi,
    DetailHasilPerhitungan,
    DetailAturPenilaianProdi,
    DetailDistribusiMatakuliah,
    DetailDistribusiKelas,
    DetailDistribusiMahasiswa,
    DetailMonitoringMahasiswa,
    DetailMonitoringMatakuliahMahasiswa,


    DashboardKaprodi,
    PemetaanKaprodi,
    DataMasterKaprodi,
    DetailDataMasterKaprodi,
    DetailPemetaanKaprodi,
    HasilPerhitunganKaprodi,
    DetailMonitoringMahasiswaKaprodi,
    DetailDistribusiMatakuliahKaprodi,
    DetailDistribusiKelasKaprodi,
    DetailDistribusiMahasiswaKaprodi,

    DashboardDosen,
    DetailDistribusiDosen,
    AturPenilaianDosen,
    DetailAturPenilaianDosen,
    PenilaianDosen,
    HasilPerhitunganDosen,
    DetailDistribusiMahasiswaDosen,
    DetailHasilPerhitunganDosen,

};
