import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import BgLogin from "../../assets/BgLogin.png";
import LogoCPLLogin from "../../assets/LogoCPLLogin.png";



const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        if (login(username, password)) {
            const user = JSON.parse(localStorage.getItem("user"));
            navigate(user ? `/dashboard/${user.role}` : "/login");
        } else {
            setError("Username atau password salah!");
        }
    };

    return (
        <div className="flex bg-gray-500 items-center justify-center min-h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${BgLogin})` }}>
            <div className="bg-white bg-opacity-80 p-4 rounded-lg shadow-lg w-[430px] flex flex-col items-center">
                <div className="h-24 justify-center items-center mb-4 bg-white">
                    <img src={LogoCPLLogin} alt="Logo" className="w-20 h-20 " />
                    <p className="font-bold text-xl text-center ">SIP-CPL</p>
                </div>
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="mb-4">
                        <label className="block text-sm mb-2 text-gray-700">
                            Email
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="w-full px-2 py-2 border rounded-sm border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="@unila.ac.id"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm mb-2 text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-2 py-2 border rounded-sm border-gray-400 focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="*********"
                            required
                        />
                    </div>
                    <div>

                        <label class="inline-flex items-center mt-3">
                            <input type="checkbox" class="form-checkbox text-indigo-600" />
                            <span className="ml-2 text-xs text-slate-400">
                                Ingat saya sebagai anggota komunitas <span className="font-semi-bold  text-black ">Sistem Informasi CPL </span> Unila
                            </span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-sm text-white py-2 mt-2.5 rounded-sm hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                </form>

            </div>
        </div>
    );
};

export default LoginPage;
