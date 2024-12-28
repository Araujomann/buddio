import { Button } from '../button';
import { useNavigate } from 'react-router-dom';
export const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-10 flex flex-col gap-10 px-10 bg-black">
      <h2 className="font-montserrat">Buddio.</h2>
      <div className="flex flex-col gap-4">
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
      <section>
        <ul className="flex flex-col text-[#c0c0c0] font-montserrat font-bold text-xs gap-2">
          <li>Terms of use</li>
          <li>Privacy Policy</li>
        </ul>
      </section>

      <p className="font-montserrat text-sm text-[#c0c0c0]">
        copyright 2024 Buddio. All rights reserved{' '}
      </p>
    </div>
  );
};
