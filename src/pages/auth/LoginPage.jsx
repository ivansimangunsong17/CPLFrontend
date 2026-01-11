import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import { AuthContext } from "../../context/AuthContext";
import BgLogin from "../../assets/BgLogin.png";
import LogoCPLLogin from "../../assets/LogoCPLLogin.png";
import LoadingScreen from "../../components/LoadingScreen";
import { MdErrorOutline } from "react-icons/md";

const LoginPage = () => {

  const { login, getDashboardUrl } = useContext(AuthContext);
  const loginMutation = useLogin();
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();


    const email = e.target.email.value;
    const password = e.target.password.value;

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (res) => {
          console.log('Full login response:', res); // Debug log
          console.log('Login response data:', res.data); // Debug log
          console.log('Response data keys:', Object.keys(res.data)); // Debug log

          const { access_token: token, user, roles } = res.data;

          // Cek apakah roles ada di level user
          const userRoles = roles || res.data.user?.roles || [];



          if (token && user) {
            // Login dengan data user yang sudah include prodi_id dan roles dari response
            login({ token, user, roles: userRoles });

            // Buat URL dashboard dengan parameter yang tepat
            const dashboardUrl = getDashboardUrl(user, userRoles);

            console.log('Role slug calculated:', userRoles?.[0]?.toLowerCase().replace(/\s+/g, "_"));
            console.log('Navigating to:', dashboardUrl); // Debug log
            navigate(dashboardUrl);
          } else {
            setError("Login gagal: data token atau user tidak ditemukan.");
          }
        },
        onError: (error) => {
          console.error('Login error:', error);
          setError("Email atau password salah");
        },
      }
    );
  };

  return (
    <>
      {loginMutation.status === 'pending' && <LoadingScreen />}
      {/* {console.log(loginMutation.status)} */}
      <div
        className="flex bg-gray-500 items-center justify-center min-h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url(${BgLogin})` }}
      >
        <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg w-[430px] flex flex-col items-center relative">
          <div className="h-24 justify-center items-center mb-4 bg-white">
            <img src={LogoCPLLogin} alt="Logo" className="w-20 h-20" />
            <p className="font-bold text-xl text-center">SIP-CPL</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-700">Email</label>
              <input
                type="text"
                name="email"
                className="w-full px-2 py-2 border rounded-sm border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="@unila.ac.id"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-2 py-2 border rounded-sm border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="*********"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-sm text-white py-2 mt-2.5 rounded-sm hover:bg-blue-700 transition"
              disabled={loginMutation.status === 'pending'}
            >
              {loginMutation.status === 'pending' ? "Logging in..." : "Login"}
            </button>
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm mt-2">
                <MdErrorOutline className="h-5 w-5" />
                <p>{error}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );

};

export default LoginPage;
