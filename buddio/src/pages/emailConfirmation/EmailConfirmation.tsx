import { useUser } from '../../context/UserContext';
import axios from 'axios';

export const EmailConfirmation = () => {
    const { userData } = useUser();

    const handleResendEmail = async () => {
        try {
            if (userData) {
                await axios.post('http://localhost:5000/user/resend-email', {
                    email: userData.email,
                    username: userData.username,
                });
                alert(
                    'Email reenviado! confira novamente sua caixa de entrada',
                );
            }
        } catch (error) {
            console.error('Erro ao reenviar email: ', error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center bg-white py-4 px-2 mx-4 rounded-sm">
                <h1 className="text-black text-2xl font-bold mb-4">
                    Confirmação de Conta
                </h1>
                <p className="text-gray-700 mb-6 text-center">
                    Um email de confirmação foi enviado para o E-mail que você
                    registrou. Verifique sua caixa de entrada e clique no link
                    para continuar.
                </p>
                <button
                    onClick={handleResendEmail}
                    className="bg-white text-black border-black text-xs px-3 py-1 uppercase h-10 rounded-none outline-none transition-all duration-200 hover:bg-black hover:text-white"
                >
                    Reenviar Email
                </button>
            </div>
        </div>
    );
};
