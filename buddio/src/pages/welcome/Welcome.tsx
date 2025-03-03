import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import { Header, Button, Footer } from '../../components';
import cam from '../../assets/cam.jpg';
import image2 from '../../assets/buddioImage3.jpeg';
import image3 from '../../assets/buddioImage6.jpeg';
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
    delay: 4300,
    config: { duration: 600 },
  });

  const handleJoinClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-buddyGray flex flex-col w-full overflow-x-hidden h-full  items-center justify-start">
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

      <div className="relative flex w-full md:w-auto mt-14 justify-between mx-10 lg:px-20 xl:px-32">
        <div className="flex items-center justify-center w-full">
          <animated.div style={imageAnimation} className="relative flex ">
            <animated.h2
              style={textAnimation}
              className="absolute z-10 text-4xl sm:text-5xl font-extrabold text-white  w-full left-0"
            >
              FOR <span className="absolute right-2">ALL</span> <span className=' block text-3xl sm:text-[1em] md:text-[.8em]'>PHOTOGRAPHERS</span>
            </animated.h2>
            <img src={cam} className="grayscale md:max-w-96" alt="Camera" />
          </animated.div>
        </div>

        <div className="hidden md:flex flex-col items-start justify-center ">
          <animated.p
            style={quoteAnimation}
            className="font-montserrat flex items-center text-xl lg:text-2xl pl-10 py-6 font-semibold  lg:text-justify leading-tight text-white"
          >
            "Este mundo natural é uma catedral, uma vastidão de beleza e
            harmonia. Cada folha de grama, cada raio de luz e sombra são
            obras-primas, esperando serem vistas por aqueles que se permitem ser
            tocados pelo divino na simplicidade."
          </animated.p>
          <animated.span
            style={authorAnimation}
            className="absolute bottom-1 right-1 lg:right-20 xl:right-32 font-montserrat text-sm"
          >
            John Muir
          </animated.span>
        </div>
      </div>

      <div className="hidden md:flex relative w-full flex-row-reverse md:w-auto mt-24 justify-between mx-10 lg:px-20 xl:px-32">
        <div className="flex items-center justify-center w-full">
          <animated.div style={image2Animation} className="relative flex">
            <img src={image2} className="max-w-96 md:py-4 lg:py-9 bg-white" />
          </animated.div>
        </div>

        <div className="hidden md:flex flex-col items-start justify-center">
          <animated.p
            style={quote2Animation}
            className="relative font-montserrat h-full items-center flex text-xl lg:text-2xl pr-10 py-6 font-semibold  lg:text-justify leading-tight text-white"
          >
            "Acordei esta manhã com um devoto reconhecimento pela beleza ao meu
            redor. O céu estava puro e sereno, e toda a terra parecia em
            harmonia. Não há como passar pelo dia sem um espírito de
            contemplação por tudo que é belo e verdadeiro."
            <animated.span
              style={author2Animation}
              className="absolute right-4 md:bottom-4  lg:right-10  font-montserrat text-sm font-normal text-pretty text-white"
            >
              Henry David Thoreau
            </animated.span>
          </animated.p>
        </div>
      </div>

      <div className="hidden md:flex relative  w-full  md:w-auto my-24 justify-between mx-10 lg:px-20 xl:px-32">
        <div className="flex items-center justify-center w-full">
          <animated.div style={image3Animation} className="relative flex">
            <img src={image3} className="max-w-96" />
          </animated.div>
        </div>
        <div className="hidden md:flex flex-col items-start justify-center">
          <animated.p
            style={quote3Animation}
            className="relative font-montserrat  flex text-lg lg:text-2xl pl-10 py-3 font-semibold lg:text-justify leading-tight text-white"
          >
            "Às vezes, é impossível expressar em palavras como um simples campo
            de trigo sob um céu azul pode conter toda a imensidão da vida e da
            alma. Mas, quando você olha, sente que é bonito, sente que é
            eterno."
          </animated.p>
          <animated.span
            style={author3Animation}
            className="absolute right-4 md:bottom-4  lg:right-20 xl:right-32 font-montserrat text-sm font-normal text-white"
          >
            Vincent van Gogh
          </animated.span>
        </div>
      </div> 
      <Footer />
    </div>
  );
};
