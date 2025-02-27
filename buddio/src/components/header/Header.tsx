import { HiMiniBars2 } from 'react-icons/hi2';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Options } from '../options/Options';
import buddioIcon from '../../assets/buddio-logo.jpg';

export const Header: React.FC = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const welcomePage = location.pathname === '/';

  return (
    <div className='flex lg:hidden'>
      {isOptionsOpen && (
        <Options handleClick={() => setIsOptionsOpen(!isOptionsOpen)} />
      )}
      <div className="flex ld:hideen z-20 fixed font-montserrat items-center justify-between h-14 bg-black w-full px-4">
        <img
          src={buddioIcon}
          className="rounded-full size-9"
          onClick={() => navigate('/feed')}
        />
        {!welcomePage && (
          <span onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
            <HiMiniBars2 size={30} />
          </span>
        )}
      </div>
    </div>
  );
};
