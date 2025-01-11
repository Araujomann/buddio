import { useState } from 'react';
import googleIcon from '../../assets/google.png';
import rightArrow from '../../assets/circle-chevron-right.svg';
import back from '../../assets/back.svg';
import { toast, Toaster } from 'react-hot-toast';
import { api }from '../../services/api'

import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { App } from '../../services/googleAuthConfig';

const eyeOpen = 'https://img.icons8.com/ios/452/visible.png';
const eyeClosed =
  'https://img.icons8.com/?size=100&id=121539&format=png&color=000000';

const provider = new GoogleAuthProvider();
const auth = getAuth(App);

export const Register: React.FC = () => {
  const navigate = useNavigate();

  const { setUserData } = useUser();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    console.log(e.target.value);
  };

  const handleGoogleRegister = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    try {
      const response = await api.post(
        '/user/register',
        {
          username: user.displayName,
          email: user.email,
          password: user.uid,
          authProvider: 'google',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data.message);
    } catch (error) {
      console.error('aconteceu algo inesperado: ', error);
      setErrorMessage(
        'Já existe um perfil associado a essa conta. Faça login em vez disso.',
      );
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert('passwords do not match');
      return;
    }
    try {
      setUserData({
        username: form.username,
        email: form.email,
      });

      const response = await api.post('/user/register', {
        headers: {
          'Content-Type': 'application/json',
        },

        username: form.username,
        email: form.email,
        password: form.password,
        authProvider: 'form',
      });
      console.log(response.data);
      navigate('/email-confirmation');
    } catch (error: any) {
      console.error('aconteceu algo inesperado: ', error);
      if (error.response) {
        if (error.response.status === 409) {
          toast.error(error.response.data.Error);
        }
      } else {
        toast.error('Erro de conexão. Verifique sua internet.');
      }
    }
  };

  const handleToBack = () => {
    navigate('/');
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  const togglePassword = () => {
    const passwordInput = document.getElementById(
      'password',
    ) as HTMLInputElement | null;
    const eyeIcon = document.getElementById(
      'eye-icon',
    ) as HTMLImageElement | null;
    if (passwordInput && eyeIcon) {
      if (passwordInput.type === 'text') {
        passwordInput.type = 'password';
        eyeIcon.src = eyeOpen;
      } else {
        passwordInput.type = 'text';
        eyeIcon.src = eyeClosed;
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-white ">
      {errorMessage && (
        <div
          className="absolute z-30 flex items-center justify-center h-full w-full bg-black bg-opacity-70"
          onClick={() => setErrorMessage(null)}
        >
          <div
            className="relative flex flex-col items-center bg-white py-4 px-2 mx-4 rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-black text-2xl font-bold mb-4">
              Conta existente!
            </h1>
            <p className="text-gray-700 mb-6 text-center">{errorMessage}</p>
            <button
              className="bg-black text-white border-black flex items-center justify-center gap-2 text-xs px-3 py-1 uppercase h-10 rounded-none outline-none transition-all duration-200 hover:bg-black hover:text-white"
              onClick={navigateToLogin}
            >
              Ir para Login
              <img src={rightArrow} alt="" />
            </button>
          </div>
        </div>
      )}
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
        <button
          className="w-full flex items-center justify-center gap-2 bg-white text-[#838383] border-[#cecece] border-[1px] rounded-none mt-4"
          onClick={handleGoogleRegister}
        >
          <span>
            <img className="size-4" src={googleIcon} />
          </span>
          Sign up with Google
        </button>

        <div className="flex items-center w-full justify-center mt-4">
          <div className="w-full h-px bg-gray-200"></div>
          <span className="font-thin text-xs px-3 text-gray-400">OR</span>
          <div className="w-full h-px bg-gray-200"></div>
        </div>

        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="userame" className="text-black font-medium text-sm">
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
            <label htmlFor="email" className="text-black font-medium  text-sm">
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

          <label htmlFor="password" className="text-black font-medium  text-sm">
            Password
          </label>
          <div className="relative flex">
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border-[1px] text-black bg-white outline-none border-[#cecece] rounded-none mt-1 p-2"
            />
            <span className="absolute right-2 top-4 " onClick={togglePassword}>
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
            <input type="checkbox" className="bg-white size-4" name="" id="" />
            <p className="text-[#383838] text-sm ">
              I accept all{' '}
              <span className="font-medium">tearms & conditions.</span>
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
              Already have a account?{' '}
              <span
                className="font-medium text-black"
                onClick={navigateToLogin}
              >
                Sign in
              </span>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};
