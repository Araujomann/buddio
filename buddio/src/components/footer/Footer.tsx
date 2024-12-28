import { Button } from '../button';
import { useNavigate, useLocation } from 'react-router-dom';

import chevronUp from '../../assets/chevron-up.svg';
import buddioIcon from '../../assets/buddio-logo.jpg';
export const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  location.pathname === '/';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleJoinClick = () => {
    navigate('/register');
  };
  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-black w-full flex flex-col ">
      <div
        className={`pt-10 flex flex-col ${
          location.pathname !== '/' ? 'gap-4' : 'gap-10'
        }  px-10 bg-black sm:w-full sm:px-20 xl:flex-row`}
      >
        <div className="flex items-center gap-2 ">
          <img
            src={buddioIcon}
            className="flex size-12 sm:size-16  xl:size-72 xl:mr-20 xl:mb-10"
          />
          <h2 className="font-montserrat md:text-2xl xl:hidden">Buddio.</h2>
        </div>
        <div className="flex flex-col xl:block ">
          {location.pathname === '/' && (
            <div className="flex flex-col gap-4 xl:hidden">
              <Button
                color="black"
                textColor="white"
                onClick={() => navigate('/register')}
                text="JOIN FOR FREE"
                borderColor="#444444"
              />
              <Button
                color="black"
                textColor="white"
                onClick={() => navigate('/login')}
                text="SIGN IN"
                borderColor="#444444"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-12  xl:py-6 xl:ml-32">
          <div className="hidden xl:flex justify-between">
            <h1 className="hidden xl:block font-montserrat mb-2">Buddio</h1>

            {location.pathname === '/' && (
              <div className="flex gap-2">
                <Button
                  color="black"
                  textColor="white"
                  onClick={handleJoinClick}
                  text="JOIN FOR FREE"
                  borderColor="white"
                />
                <Button
                  color="black"
                  textColor="white"
                  onClick={handleLoginClick}
                  text="LOGIN"
                  borderColor="white"
                />
              </div>
            )}
          </div>
          <div className="xl:flex xl:gap-32 ">
            <section className="flex flex-col gap-3">
              <h2 className="font-bold text-lg">COMPANY</h2>
              <ul className="flex flex-col gap-2 font-montserrat text-white">
                <li>About</li>
                <li>Blog</li>
                <li>Jobs</li>
              </ul>
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="font-bold text-lg">COMMUNITY</h2>
              <ul className="flex flex-col gap-2 font-montserrat text-white">
                <li>Learn</li>
                <li>Forum</li>
              </ul>
            </section>
            <section className="flex flex-col gap-3">
              <h2 className="font-bold text-lg">RULES</h2>
              <ul className="flex flex-col text-[#c0c0c0] font-montserrat font-bold text-xs gap-2">
                <li>Terms of use</li>
                <li>Privacy Policy</li>
              </ul>
            </section>
          </div>
        </div>
        <p className="font-montserrat text-sm text-[#c0c0c0] xl:hidden">
          copyright 2024 Buddio. All rights reserved{' '}
        </p>
      </div>
      <div className="hidden xl:block mb-6 mx-24 h-px border border-[#808080] " />
      <div className="hidden xl:flex justify-between  w-full px-24">
        <div className="flex justify-between w-1/3 mb-6">
          <p>Copyright @ Buddio</p>
          <p>Terms of Service</p>
        </div>
        <span className="flex gap-3 items-center h-fit" onClick={scrollToTop}>
          <p>Back to top</p>
          <img src={chevronUp} />
        </span>
      </div>
    </div>
  );
};
