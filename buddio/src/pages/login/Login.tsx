import React from "react";
import { useNavigate } from "react-router-dom";
import googleIcon from "../../assets/google.png";
import back from "../../assets/back.svg";
import axios from "axios";


const eyeOpen = "https://img.icons8.com/ios/452/visible.png";
const eyeClosed =
    "https://img.icons8.com/?size=100&id=121539&format=png&color=000000";


export const Login: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        console.log(e.target.value);
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form:", form);
        try {
            const response = await axios.post("http://localhost:5000/auth/login", {
                headers: {
                    "Content-Type": "application/json"
                },

                email: form.email,
                password: form.password
            });
            console.log("Token:", response.data.token);
            // Você pode armazenar o token em localStorage ou state
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            console.log("Erro ao fazer login:", error);
        }
    };
    const handleToBack = () => {
        navigate("/");
    }

    

    const togglePassword = () => {
        const passwordInput = document.getElementById(
            "password"
        ) as HTMLInputElement | null;
        const eyeIcon = document.getElementById(
            "eye-icon"
        ) as HTMLImageElement | null;
        if (passwordInput && eyeIcon) {
            if (passwordInput.type === "text") {
                passwordInput.type = "password";
                eyeIcon.src = eyeOpen;
            } else {
                passwordInput.type = "text";
                eyeIcon.src = eyeClosed;
            }
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-white pt-10">
            <span  className="absolute top-6 left-4" onClick={handleToBack}>
                <img src={back}  />
            </span>
            <div className="flex flex-col items-center">
                <h1 className="text-black font-montserrat text-3xl font-medium">
                    Login
                </h1>
                <p className="text-[#9b9b9b] font-montserrat text-center text-sm">
                    Welcome! Enter your details
                </p>
                <button className="w-full flex items-center justify-center gap-2 bg-white text-[#838383] border-[#cecece] border-[1px] rounded-none mt-4">
                    <span>
                        <img className="size-4" src={googleIcon} />
                    </span>
                    Login with Google
                </button>

                <div className="flex items-center w-full justify-center mt-4">
                    <div className="w-full h-px bg-gray-200"></div>
                    <span className="font-thin text-xs px-3 text-gray-400">
                        OR
                    </span>
                    <div className="w-full h-px bg-gray-200"></div>
                </div>

                <form onSubmit={handleLogin}>
                    <div>
                        <label
                            htmlFor="email"
                            className="text-black font-medium  text-sm"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full text-black border-[1px] bg-white outline-none border-[#cecece] rounded-none mt-1 p-2"
                        />
                    </div>

                    <label
                        htmlFor="password"
                        className="text-black font-medium  text-sm"
                    >
                        Password
                    </label>
                    <div className="relative flex  ">
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="w-full border-[1px] text-black bg-white outline-none border-[#cecece] rounded-none mt-1 p-2"
                        />
                        <span
                            className="absolute right-2 top-4 "
                            onClick={togglePassword}
                        >
                            <img
                                className="size-4"
                                id="eye-icon"
                                src="https://img.icons8.com/ios/452/visible.png"
                            />
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 bg-black text-white border-[1px] rounded-none mt-8"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};
