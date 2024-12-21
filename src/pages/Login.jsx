import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useTranslation } from "react-i18next";
function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { t } = useTranslation()
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, username, password); 
            navigate("/centralDashboard");
        } catch (error) {
            alert("Login Failed: " + error.message);
        }
    };

    return (
        <div className="w-screen h-screen bg-white overscroll-none overflow-hidden ">
            <div className="bg-[#D1E9F5] w-full h-full flex justify-center items-center ">
                <div className="w-1/3 mx-auto p-8  rounded-lg shadow-xl bg-white -mt-10">
                    <h1 className="font-bold text-3xl mb-6 text-center text-blue-600">{t("Login")}</h1>
                    <form className="w-full flex flex-col space-y-5" onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder={t("Email")}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
                        >
                            {t("Login")}
                        </button>
                        <p className="text-center text-gray-600">
                            {/* {t('Don&apos;t have an account? "\t"')} */}
                            <span
                                className="text-blue-600 font-semibold cursor-pointer hover:underline"
                                onClick={() => navigate("/signup")}
                            >
                                Sign up
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;