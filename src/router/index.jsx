// src/pages/index.js

// Auth Pages
import LoginPage from '../pages/auth/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import DashboardLayout from '../layout/DashboardLayout';

//Admin Universitas
import DashboardUniversitas from '../pages/admin-universitas/DashboardUniversitas';
import AkunUniversitas from '../pages/admin-universitas/AkunUniversitas';
import HasilPerhitunganUniv from '../pages/admin-universitas/HasilPerhitunganUniv';
import DataProdiUniv from '../pages/admin-universitas/DataProdiUniv';

//Admin Prodi
import DashboardProdi from '../pages/admin-prodi/DashboardProdi';
import AkunProdi from '../pages/admin-prodi/AkunProdi';
import HasilPerhitunganProdi from '../pages/admin-prodi/HasilPerhitunganProdi';
import DataProdi from '../pages/admin-prodi/DataProdi';
import DataMahasiswaProdi from '../pages/admin-prodi/DataMahasiswaProdi';
import DataMataKuliahProdi from '../pages/admin-prodi/DataMataKuliahProdi';
import PemetaanCPLProdi from '../pages/admin-prodi/PemetaanCPLProdi';
import PemetaanCPMKProdi from '../pages/admin-prodi/PemetaanCPMKProdi';

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
    DashboardLayout,

    DashboardUniversitas,
    AkunUniversitas,
    HasilPerhitunganUniv,
    DataProdiUniv,

    DashboardProdi,
    AkunProdi,
    DataMahasiswaProdi,
    DataMataKuliahProdi,
    DataProdi,
    PemetaanCPLProdi,
    PemetaanCPMKProdi,
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
