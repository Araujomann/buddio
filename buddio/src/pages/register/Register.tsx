import React from "react";
import googleIcon from "../../assets/google.png";
import back from "../../assets/back.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const eyeOpen = "https://img.icons8.com/ios/452/visible.png";
const eyeClosed =
    "https://img.icons8.com/?size=100&id=121539&format=png&color=000000";

export const Register: React.FC = () => {
    const navigate = useNavigate();

    const [form, setForm] = React.useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });

        console.log(e.target.value);
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(form);
        if (form.password !== form.confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            const response = await axios.post(
                "http://localhost:5000/user/register",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },

                    username: form.username,
                    email: form.email,
                    password: form.password,
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error("aconteceu algo inesperado: ", error);
        }
    };

    const handleToBack = () => {
        navigate("/");
    };

    const handleLogin = () => {
        navigate("/login");
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
            <span className="absolute top-6 left-4" onClick={handleToBack}>
                <img src={back} />
            </span>
            <div className="flex flex-col items-center">
                <h1 className="text-black font-montserrat text-3xl font-medium">
                    Create Your Acount
                </h1>
                <p className="text-[#9b9b9b] font-montserrat text-center text-sm">
                    Welcome! Enter your details
                </p>
                <button className="w-full flex items-center justify-center gap-2 bg-white text-[#838383] border-[#cecece] border-[1px] rounded-none mt-4">
                    <span>
                        <img className="size-4" src={googleIcon} />
                    </span>
                    Sign up with Google
                </button>

                <div className="flex items-center w-full justify-center mt-4">
                    <div className="w-full h-px bg-gray-200"></div>
                    <span className="font-thin text-xs px-3 text-gray-400">
                        OR
                    </span>
                    <div className="w-full h-px bg-gray-200"></div>
                </div>

                <form onSubmit={handleRegister}>
                    <div>
                        <label
                            htmlFor="userame"
                            className="text-black font-medium text-sm"
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full text-black border-[1px] bg-white outline-none border-[#cecece] rounded-none mt-1 p-2"
                        />
                    </div>
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
                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="text-black font-medium  text-sm"
                        >
                            Retype your password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleChange}
                            placeholder="Enter your password again"
                            className="w-full border-[1px] text-black bg-white outline-none border-[#cecece] rounded-none mt-1 p-2"
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <input
                            type="checkbox"
                            className="bg-white size-4"
                            name=""
                            id=""
                        />
                        <p className="text-[#383838] text-sm ">
                            I accept all{" "}
                            <span className="font-medium">
                                tearms & conditions.
                            </span>
                        </p>
                    </div>

                    <button
                        value="submit"
                        className="w-full flex items-center justify-center gap-2 bg-black text-white border-[1px] rounded-none mt-8"
                    >
                        Register
                    </button>
                    <div className="flex w-full items-center justify-center text-sm mt-2 gap-2">
                        <p className="text-[#7e7e7e]">
                            Already have a account?{" "}
                            <span className="font-medium text-black" onClick={handleLogin}>
                                Sign in
                            </span>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
