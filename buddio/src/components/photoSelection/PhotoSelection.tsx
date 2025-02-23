import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaceSmileIcon } from '@heroicons/react/24/solid';
import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import plus from '../../assets/plus.svg';
import person from '../../assets/person.svg';
import aperture from '../../assets/aperture.svg';
import checkmark from '../../assets/checkmark.svg';
import close from '../../assets/close.svg';
import { Header } from '../../components';
import { Loader } from '../../components';
import { api }from '../../services/api'


export const PhotoSelection: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);
  const [postedCheck, setPostedCheck] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const location = useLocation();
  const isProfilePhotoSelection =
    location.pathname === '/profile-photo-selection';

  const uploadEndpointPhoto = isProfilePhotoSelection
    ? `/profile/upload-profile`
    : `/posts/upload`

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      console.log('imagem selecionada: ', e.target.files[0]);
    }
  };

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    setToken(storedToken);
    console.log('Token capturado: ', storedToken);
  }, []);

  const handleClose = () => {
    setSelectedImage(null);
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
        const uploadResponse = await api.post(uploadEndpointPhoto, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = uploadResponse.data;

        const imageUrl = data.url;

        if (isProfilePhotoSelection) {
          const updateResponse = await api.put(
            `/profile/user/update-profile`,
            { imageUrl },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (updateResponse.status === 200 || updateResponse.status === 201) {
            setSelectedImage(null);
            setLoading(false);
            setPostedCheck(true);

            setTimeout(() => {
              setPostedCheck(false);
            }, 2600);
          } else {
            console.error(
              'Erro ao atualizar a foto do perfil: ',
              updateResponse.status,
            );
          }
        }
      } catch (error) {
        console.error('Erro ao enviar a imagem: ', error);
      }
    }
  };

  return (
    <>
      <Header />
      {loading && (
        <div className="z-20 absolute flex items-center justify-center w-full h-full bg-white">
          <Loader loading={loading} />
        </div>
      )}
      {postedCheck && (
        <div className="absolute z-20 inset-0 flex items-center justify-center font-montserrat font-medium bg-black">
          <div className="flex flex-col items-center text-white">
            {isProfilePhotoSelection ? (
              <>
                <FaceSmileIcon className="w-24 h-24 text-[#4CAF50] animate-bounce" />
                <h2 className="mt-4 text-2xl">Profile Photo Updated</h2>
              </>
            ) : (
              <>
                <CheckBadgeIcon className="w-24 h-24 text-[#4CAF50] animate-bounce" />
                <h2 className="mt-4 text-2xl">Post successful</h2>
              </>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center justify-center bg-white w-screen h-full">
        {selectedImage ? (
          isProfilePhotoSelection ? (
            <div className="z-10 flex items-center justify-center">
              <div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="object-cover w-60 h-60 rounded-full"
                />
              </div>
            </div>
          ) : (
            <div className="absolute flex items-center w-80  justify-center inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="border-1 border-gray-300 flex justify-center items-center w-full ">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            </div>
          )
        ) : (
          <span className="absolute flex flex-col text-center items-center justify-center inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={isProfilePhotoSelection ? person : aperture}
              className="size-32"
            />
            <p className="font-montserrat text-xl font-bold text-[#A9A9A9]">
              {isProfilePhotoSelection
                ? "click on '+' to select a profile photo."
                : "click on '+' to select a photo."}
            </p>
          </span>
        )}

        <div className="absolute flex justify-center bg-black h-20 w-full bottom-0">
          {selectedImage ? (
            <div className="flex gap-2">
              <div
                className="relative flex items-center justify-center bg-white hover:bg-slate-950 rounded-full size-20 bottom-10 border-[1px] cursor-pointer"
                onClick={handleClose}
              >
                <img src={close} className="size-12" alt="Submit" />
              </div>
              <div
                className="relative flex items-center justify-center bg-white rounded-full size-20 bottom-10 border-[1px] cursor-pointer"
                onClick={handleSubmit}
              >
                <img src={checkmark} className="size-12" alt="Submit" />
              </div>
            </div>
          ) : (
            <div
              className="z-30 relative flex items-center justify-center bg-white rounded-full size-20 bottom-10 border-[1px] cursor-pointer"
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
