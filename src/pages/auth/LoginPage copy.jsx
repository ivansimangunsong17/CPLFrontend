import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoUnila from "../../assets/LogoUnila.png";

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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative">
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
                    <img src={LogoUnila} alt="Logo" className="w-20 h-20" />
                </div>
                <h2 className="text-3xl font-bold text-center text-blue-600 mt-8 mb-4">
                    Login Portal
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">Sistem Informasi CPL</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Masukkan username"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2 text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            placeholder="Masukkan password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                    {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
                </form>
                <div className="text-center text-sm text-gray-500 mt-4">
                    Belum punya akun? <a href="#" className="text-blue-600 hover:underline">Hubungi Admin</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
