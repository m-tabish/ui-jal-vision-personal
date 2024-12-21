import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();


    return (
        <div className="w-screen h-screen bg-white">

            <div className="bg-[#D1E9F5] w-screen h-screen flex flex-col justify-center items-center">
                <div className="w-1/3 mx-auto mt-10 p-8 rounded-lg shadow-xl bg-white">
                    <h1 className="font-bold text-3xl mb-6 text-center text-blue-600">Sign Up</h1>
                    <form className="w-full flex flex-col space-y-5">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border border-gray-300 p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-3 rounded-md shadow-md hover:bg-blue-600 transition-all"
                        >
                            Sign Up
                        </button>
                        <p className="text-center text-gray-600">
                            Already have an account?{" "}
                            <span
                                className="text-blue-600 font-semibold cursor-pointer"
                                onClick={() => navigate("/login")}>
                                Log in
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;