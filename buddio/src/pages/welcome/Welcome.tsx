import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Header, Button, Footer } from '../../components';
import cam from '../../assets/cam.jpg';
import image2 from '../../assets/buddioImage3.jpeg';
import image3 from '../../assets/buddioImage1.jpeg';
import { useNavigate } from 'react-router-dom';

export const Welcome: React.FC = () => {
  const navigate = useNavigate();

 
  const titleAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    config: { duration: 800 },
  });


  const buttonsAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    delay: 500,
    config: { tension: 120, friction: 14 },
  });


  const imageAnimation = useSpring({
    from: { transform: 'scale(0.8)' },
    to: { transform: 'scale(1)' },
    config: { duration: 1000 },
  });

  const image2Animation = useSpring({
    from: { transform: 'scale(0.3)' },
    to: { transform: 'scale(1)' },
    config: { duration: 1800 },
  });

  const image3Animation = useSpring({
    from: { transform: 'scale(0.3)' },
    to: { transform: 'scale(1)' },
    config: { duration: 2200 },
  });

 
  const textAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    delay: 800,
  });

  
  const quoteAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 1000,
    config: { duration: 600 },
  });

  const quote2Animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 2500,
    config: { duration: 600 },
  });

  const quote3Animation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0px)' },
    delay: 3500,
    config: { duration: 800 },
  });

  
  const authorAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 2400,
    config: { duration: 600 },
  });

  const author2Animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 3200,
    config: { duration: 600 },
  });

  const author3Animation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 4100,
    config: { duration: 600 },
  });

  const handleJoinClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-buddyGray flex flex-col w-screen overflow-x-hidden h-full  items-center justify-start">
      <Header />

      
      <animated.div style={titleAnimation} className="w-11/12 mt-24">
        <h1 className="font-montserrat text-3xl text-white font-bold">
          YOUR PLACE FOR AUTHENTIC PORTRAITS
        </h1>
        <p className="font-montserrat text-white mt-4">
          Capture unique moments, share true stories, and connect with people
          who value what’s real.
        </p>
      </animated.div>

   
      <animated.div
        style={buttonsAnimation}
        className="flex items-center gap-4 mt-12"
      >
        <Button
          color="white"
          textColor="black"
          onClick={handleJoinClick}
          text="JOIN FOR FREE"
        />
        <Button
          color="black"
          textColor="white"
          onClick={handleLoginClick}
          text="LOGIN"
          borderColor="white"
        />
      </animated.div>

      <div className="relative flex w-full md:w-auto mt-14 justify-between mx-10">
        <div className="flex items-center justify-center w-full">
          <animated.div style={imageAnimation} className="relative flex">
            <animated.h2
              style={textAnimation}
              className="absolute z-10 text-4xl font-extrabold text-white left-0"
            >
              FOR <span className="absolute right-6">ALL</span> PHOTOGRAPHERS
            </animated.h2>
            <img src={cam} className="grayscale md:max-w-96" alt="Camera" />
          </animated.div>
        </div>

        <div className="hidden md:flex flex-col items-start  ">
          <animated.p
            style={quoteAnimation}
            className="font-montserrat flex  text-2xl lg:text-3xl pl-10 py-6 font-semibold  lg:text-justify leading-tight text-white"
          >
            "A beleza está nos detalhes do horizonte, na luz que dança sobre as
            montanhas, e nas cores que o céu pinta ao entardecer. Aqui no
            Buddio, cada paisagem é um convite para contemplar o mundo com olhos
            de gratidão."
          </animated.p>
          <animated.span
            style={authorAnimation}
            className="absolute bottom-1 right-1 font-montserrat text-sm lg:right-6"
          >
            Autor desconhecido
          </animated.span>
        </div>
      </div>

      <div className="relative flex w-full flex-row-reverse md:w-auto mt-24 justify-between mx-10">
        <div className="flex items-center justify-center w-full">
          <animated.div style={image2Animation} className="relative flex">
            <img src={image2} className="max-w-96" />
          </animated.div>
        </div>

        <div className="hidden md:flex flex-col items-start justify-center">
          <animated.p
            style={quote2Animation}
            className="relative font-montserrat  flex text-xl lg:text-2xl pr-10 py-6 font-semibold  lg:text-justify leading-tight text-white"
          >
            "Nos detalhes mais simples se escondem histórias grandiosas. Um
            reflexo na poça d'água, a sombra de uma árvore ou o brilho das
            folhas ao sol – momentos assim nos lembram que o extraordinário vive
            no cotidiano."
            <animated.span
              style={author2Animation}
              className="absolute right-4 md:bottom-4 lg:bottom-0 lg:right-10 font-montserrat text-sm font-normal text-white"
            >
              Autor desconhecido
            </animated.span>
          </animated.p>
        </div>
      </div>

      <div className="relative flex w-full  md:w-auto my-24 justify-between mx-10">
        <div className="flex items-center justify-center w-full">
          <animated.div style={image3Animation} className="relative flex">
            <img src={image3} className="max-w-96" />
          </animated.div>
        </div>
        <div className="  hidden md:flex flex-col items-start justify-center">
          <animated.p
            style={quote3Animation}
            className="relative font-montserrat  flex text-lg lg:text-2xl pl-10 py-3 font-semibold lg:text-justify leading-tight text-white"
          >
            "O mundo ainda guarda tanta beleza para ser descoberta. Cada foto é
            um registro do presente, um lembrete de que a criação nos presenteia
            diariamente com maravilhas que nos conectam ao divino e ao que
            realmente importa."
          </animated.p>
          <animated.span
            style={author3Animation}
            className="absolute right-4 md:bottom-0  lg:right-0 font-montserrat text-sm font-normal text-white"
          >
            Autor desconhecido
          </animated.span>
        </div>
      </div>
      <Footer />
    </div>
  );
};
