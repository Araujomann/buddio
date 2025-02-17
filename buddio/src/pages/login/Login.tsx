import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import googleIcon from '../../assets/google.png';
import back from '../../assets/back.svg';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../../services/googleAuthConfig';
import { api }from '../../services/api'

const eyeOpen = 'https://img.icons8.com/ios/452/visible.png';
const eyeClosed =
  'https://img.icons8.com/?size=100&id=121539&format=png&color=000000';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const verified = searchParams.get('verified');
  const [form, setForm] = React.useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if(verified) {
     toast.success('Email verificado com sucesso! Agora é só aproveitar!', {
      icon: "✅",
      position: "top-center",
      duration: 8000,
     });
    }
  }, [verified]);  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    console.log(e.target.value);
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await api.post('/auth/login', {
        Headers: {
          'Content-Type': 'application/json',
        },
        email: user.email,
        password: user.uid,
      });
      localStorage.setItem('accessToken', response.data.accessToken);
      window.location.href = '/feed';
    } catch (error) {
      console.error('aconteceu algo inesperado: ', error);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form:', form);
    try {
      const response = await api.post('/auth/login', {
        headers: {
          'Content-Type': 'application/json',
        },

        email: form.email,
        password: form.password,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      window.location.href = '/feed';
    } catch (error: any) {
      if (error.response) {
        // Exibir o erro dependendo da resposta da API
        if (error.response.status === 401) {
          toast.error('Senha incorreta, tente novamente.');
        } else if (error.response.status === 404) {
          toast.error('Email não encontrado, verifique seus dados.');
        } else if (error.response.status === 403) {
          toast.error('Por favor, verifique seu email para continuar.');
        } else {
          toast.error(
            'Ocorreu um erro ao tentar fazer login. Tente novamente.',
          );
        }
      } else {
        // Erro sem resposta da API
        toast.error('Erro de conexão. Verifique sua internet.');
      }
    }
  };
  const handleToBack = () => {
    navigate('/');
  };

  const navigateToRegister = () => {
    navigate('/register');
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
    <div className="relative flex flex-col items-center justify-center w-screen h-screen bg-white pt-10">
      <span className="absolute top-6 left-4" onClick={handleToBack}>
        <img src={back} />
      </span>
      <div className="flex flex-col items-center w-[90vw] max-w-[300px] ">
        <h1 className="text-black font-montserrat text-3xl font-medium">
          Login
        </h1>
        <p className="text-[#9b9b9b] font-montserrat text-center text-sm">
          Welcome! Enter your details
        </p>
        <button
          className="w-full flex items-center justify-center gap-2 bg-white text-[#838383] border-[#cecece] border-[1px] rounded-none mt-4"
          onClick={handleGoogleLogin}
        >
          <span>
            <img className="size-4" src={googleIcon} />
          </span>
          Login with Google
        </button>

        <div className="flex items-center w-full justify-center mt-4">
          <div className="w-full h-px bg-gray-200"></div>
          <span className="font-thin text-xs px-3 text-gray-400">OR</span>
          <div className="w-full h-px bg-gray-200"></div>
        </div>

        <form onSubmit={handleLogin} className='w-[90vw] max-w-[300px]'>
          <div>
            <label htmlFor="email" className="text-black font-medium  text-sm">
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

          <label htmlFor="password" className="text-black font-medium  text-sm">
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
            <span className="absolute right-2 top-4 " onClick={togglePassword}>
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
          <div className="flex w-full items-center justify-center text-sm mt-2 gap-2">
            <p className="text-[#7e7e7e]">
              Don't have an account yet?{' '}
              <span
                className="font-medium text-black"
                onClick={navigateToRegister}
              >
                Register
              </span>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};
