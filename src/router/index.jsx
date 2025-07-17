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
import DetailProdiUniv from '../pages/admin-universitas/DetailProdiUniv';

//Admin Prodi
import DashboardProdi from '../pages/admin-prodi/DashboardProdi';
import AkunProdi from '../pages/admin-prodi/AkunProdi';
import HasilPerhitunganProdi from '../pages/admin-prodi/HasilPerhitunganProdi';
import DataCPL from '../pages/admin-prodi/DataCPL';
import DataMahasiswaProdi from '../pages/admin-prodi/DataMahasiswaProdi';
import DataMataKuliahProdi from '../pages/admin-prodi/DataMataKuliahProdi';
import DetailMataKuliahProdi from '../pages/admin-prodi/DetailMataKuliahProdi';


//Kaprodi
import DashboardKaprodi from '../pages/kaprodi/DashboardKaprodi';
import DataMahasiswaKaprodi from '../pages/kaprodi/DataMahasiswaKaprodi';
import DataMataKuliahKaprodi from '../pages/kaprodi/DataMatkulKaprodi';
import DataProdiKaprodi from '../pages/kaprodi/DataProdiKaprodi';
import HasilPerhitunganKaprodi from '../pages/kaprodi/HasilPerhitunganKaprodi';
import PemetaanCPLKaprodi from '../pages/kaprodi/PemetaanCPLKaprodi';
import PemetaanCPMKKaprodi from '../pages/kaprodi/PemetaanCPMKKaprodi';


//Dosen
import DashboardDosen from '../pages/dosen/DashboardDosen';
import InputNilaiDosen from '../pages/dosen/InputNilaiDosen';
import HasilPerhitunganDosen from '../pages/dosen/HasilPerhitunganDosen';




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
    DetailProdiUniv,

    DashboardProdi,
    AkunProdi,
    DataMahasiswaProdi,
    DataMataKuliahProdi,
    DetailMataKuliahProdi,
    DataCPL,

    HasilPerhitunganProdi,

    DashboardKaprodi,
    DataMahasiswaKaprodi,
    DataMataKuliahKaprodi,
    DataProdiKaprodi,
    HasilPerhitunganKaprodi,
    PemetaanCPLKaprodi,
    PemetaanCPMKKaprodi,


    DashboardDosen,
    InputNilaiDosen,
    HasilPerhitunganDosen

};
