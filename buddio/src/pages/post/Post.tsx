import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import plus from '../../assets/plus.svg';
import aperture from '../../assets/aperture.svg';
import checkmark from '../../assets/checkmark.svg';
import close from '../../assets/close.svg';
import posted from '../../assets/posted.json';
import error from '../../assets/error.json';
import { Header } from '../../components';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';


export const Post: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [postedCheck, setPostedCheck] = useState<boolean>(false);
    const [errorUpload, setErrorUpload] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        setToken(storedToken);
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedImage(e.target.files[0]);
        }
    };

    const handleClick = () => {
        const fileInput = document.getElementById(
            'fileInput'
        ) as HTMLInputElement;
        fileInput?.click();
    };

    const handleSubmit = async () => {
        setLoading(true);
        if (!token) {
            console.error('Token não encontrado!');
            return;
        }

        if (selectedImage) {
            const formData = new FormData();
            formData.append('file', selectedImage);

            try {
                const uploadResponse = await api.post(
                    '/posts/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (
                    uploadResponse.status === 200 ||
                    uploadResponse.status === 201
                ) {
                    setSelectedImage(null);
                    setLoading(false);
                    setPostedCheck(true);
                    setTimeout(() => {
                        setPostedCheck(false);
                        navigate('/feed');
                    }, 1920);
                } else {
                    console.error(
                        'Erro ao criar o post: ',
                        uploadResponse.status
                    );
                }
            } catch (error: any) {
                console.error('Erro ao enviar a imagem: ', error.message);
                setLoading(false);
                setErrorUpload(true);
                setTimeout(() => {
                    setErrorUpload(false);
                    navigate('/post');
                }, 3900);
            }
        }
    };

    const handleClose = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <Header />
            {loading && (
                <div className="z-20 fixed flex items-center justify-center w-full h-full bg-white">
                    <div className="spinner"></div>
                </div>
            )}
            {errorUpload && (
                <div className="absolute z-20 inset-0 flex flex-col items-center justify-center  font-montserrat font-medium bg-white">
                    <div className="flex flex-col items-center text-white size-36">
                        <Lottie animationData={error} />
                    </div>
                    <h2 className="mt-4 text-2xl text-black">
                        Parece que algo deu errado aqui!
                    </h2>
                    <h3 className="mt-1 text-2xl text-black">
                        Vamos voltar para você tentar novamente.
                    </h3>
                </div>
            )}
            {postedCheck && (
                <div className="absolute z-20 inset-0 flex flex-col items-center justify-center  font-montserrat font-medium bg-white">
                    <div className="flex flex-col items-center text-white size-36">
                        <Lottie animationData={posted} />
                    </div>
                    <h2 className="mt-4 text-2xl text-black ">
                        Retrato postado!
                    </h2>
                </div>
            )}
            <div className="flex items-end bg-white w-screen h-full">
                {selectedImage ? (
                    <div className="absolute flex items-center max-w-80 lg:w-4/6 xl:w-3/6 xl:pb-6 justify-center inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="border-1 border-gray-300 flex justify-center items-center w-full p-1 pb-3 ">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected"
                                className="object-contain max-w-full max-h-full"
                            />
                        </div>
                    </div>
                ) : (
                    <span className="absolute flex flex-col text-center items-center justify-center inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <img src={aperture} className="size-32" />
                        <p className="font-montserrat text-xl font-bold text-[#A9A9A9]">
                            Clique no '+' para selecionar um retrato.
                        </p>
                    </span>
                )}

                <div className="absolute flex justify-center bg-black h-20 w-full bottom-0">
                    {selectedImage ? (
                        <div className="flex gap-2">
                            <div
                                className="relative flex items-center justify-center bg-white hover:[filter:drop-shadow(0px_-1px_3px_black)] hover:transition-all rounded-full size-20 bottom-10 border-[1px] cursor-pointer"
                                onClick={handleClose}
                            >
                                <img
                                    src={close}
                                    className="size-12 hover:[filter:drop-shadow(0px_-1px_1px_red)]"
                                    alt="Cancel"
                                />
                            </div>
                            <div
                                className="relative flex items-center justify-center bg-white hover:[filter:drop-shadow(0px_-1px_3px_black)] hover:transition-all rounded-full size-20 bottom-10 border-[1px] cursor-pointer"
                                onClick={handleSubmit}
                            >
                                <img
                                    src={checkmark}
                                    className="size-12 hover:[filter:drop-shadow(0px_-1px_1px_green)]"
                                    alt="Submit"
                                />
                            </div>
                        </div>
                    ) : (
                       

                        <div
                            className="relative flex items-center justify-center bg-white rounded-full size-20 bottom-10 border-[1px] cursor-pointer"
                            onClick={handleClick}
                        >
                            <img src={plus} className="size-12" alt="Add" />
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>
                         
                    )}
                </div>
            </div>
        </>
    );
};
