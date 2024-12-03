import { Header, Button, Footer } from '../../components';
import cam from '../../assets/cam.jpg';
import buddioIcon from '../../assets/buddio-logo.jpg';
import { useNavigate } from 'react-router-dom';
export const Welcome: React.FC = () => {
    const navigate = useNavigate();

    const handleJoinClick = () => {
        navigate('/register');
    };
    const handleLoginClick = () => {
        navigate('/login');
    };
    return (
        <div className="bg-buddyGray flex flex-col w-screen overflow-x-hidden h-full items-center justify-start">
            <Header />
            <h1 className="font-montserrat text-3xl w-11/12 text-white font-bold mt-24">
                YOUR PLACE FOR AUTHENTIC PORTRAITS
            </h1>
            <p className="font-montserrat w-11/12 text-white mt-4">
                Capture unique moments, share true stories, and connect with
                people who value what’s real.
            </p>

            <div className="flex items-center  mr-20  gap-4 mt-12">
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
            </div>

            <div className="relative mt-8">
                <h2 className="z-10 absolute font-montserrat text-4xl font-extrabold left-4 text-white">
                    FOR <span className="absolute right-6">ALL</span>{' '}
                    PHOTOGRAPHERS
                </h2>
                <img src={cam} className="grayscale" />
            </div>
            <Footer />
        </div>
    );
};
