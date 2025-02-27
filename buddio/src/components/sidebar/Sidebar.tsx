import buddioIcon from '../../assets/buddio-logo.jpg';
import FeedIcon from '../../assets/feedLight.svg';
import ProfileIcon from '../../assets/profileLight.svg';
import PostIcon from '../../assets/postLight.svg';
import SearchIcon from '../../assets/searchLight.svg';
import logoutIcon from '../../assets/logoutLight.svg';
import messages from '../../assets/messagesLight.svg';
import FeedIcon2 from '../../assets/feed.svg';
import ProfileIcon2 from '../../assets/profile.svg';
import PostIcon2 from '../../assets/post.svg';
import SearchIcon2 from '../../assets/search.svg';
import logoutIcon2 from '../../assets/logout.svg';
import messages2 from '../../assets/messages.svg';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { api } from '../../services/api';

export const Sidebar: React.FC = () => {
    interface Payload extends JwtPayload {
        id: string;
    }

    const [id, setId] = useState<string>('');
    const location = useLocation();

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            const decode = jwtDecode<Payload>(token);
            console.log('toekn', decode.id);
            setId(decode.id);
        }
    }, [token]);

    const pathsWithoutSidebar = [
        '/',
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
    ];
    const shouldRenderSidebar = !pathsWithoutSidebar.includes(
        location.pathname
    );

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
            localStorage.removeItem('accessToken');

            window.location.href = '/login';
        } catch (error) {
            console.error('Erro ao fazer o logout: ', error);
        }
    };

    return (
        shouldRenderSidebar && (
            <div className="hidden h-full overflow-hidden lg:flex">
                <div
                    className={`${
                        location.pathname === '/search'
                            ? 'bg-black text-white'
                            : 'bg-white text-black'
                    } hidden md:flex fixed flex-col items-center  left-0 top-0 bottom-0 w-64`}
                >
                    <div className="relative flex px-5">
                        <h1 className="font-ptSans font-extrabold text-8xl">
                            B
                        </h1>
                        <img
                            src={buddioIcon}
                            className="absolute rounded-full size-5 animate-spinSlow bottom-4 p-px bg-black right-0"
                        />
                    </div>

                    <div className="flex flex-col mt-8 gap-4 w-40">
                        <Link
                            to="/feed"
                            className={`${
                                location.pathname === '/search'
                                    ? 'text-white hover:text-white'
                                    : 'text-black'
                            }`}
                        >
                            <div
                                className={`flex items-center gap-2 hover:relative mr-4 border-r-4 ${
                                    location.pathname === '/feed'
                                        ? 'font-bold border-black border-r-4 [filter:drop-shadow(7px_4px_3px_gray)]'
                                        : 'border-transparent'
                                }`}
                            >
                                <span>
                                    <img
                                        src={`${
                                            location.pathname === '/search'
                                                ? FeedIcon2
                                                : FeedIcon
                                        }`}
                                    />
                                </span>
                                FEED
                            </div>
                        </Link>
                        <Link
                            to="/conversations"
                            className={`${
                                location.pathname === '/search'
                                    ? 'text-white hover:text-white'
                                    : 'text-black'
                            }`}
                        >
                            <div
                                className={`flex items-center gap-2 hover:relative mr-4 border-r-4 ${
                                    location.pathname === '/conversations'
                                        ? 'font-bold border-black border-r-4 [filter:drop-shadow(7px_4px_3px_gray)]'
                                        : 'border-transparent'
                                }`}
                            >
                                <span>
                                    <img
                                        src={`${
                                            location.pathname === '/search'
                                                ? messages2
                                                : messages
                                        }`}
                                    />
                                </span>
                                MESSAGES
                            </div>
                        </Link>
                        <Link
                            to="/post"
                            className={`${
                                location.pathname === '/search'
                                    ? 'text-white hover:text-white'
                                    : 'text-black'
                            }`}
                        >
                            <div
                                className={`flex items-center gap-2 hover:relative mr-4 border-r-4 ${
                                    location.pathname === '/post'
                                        ? 'font-bold border-black border-r-4 [filter:drop-shadow(7px_4px_3px_gray)]'
                                        : 'border-transparent'
                                }`}
                            >
                                <span>
                                    <img
                                        src={`${
                                            location.pathname === '/search'
                                                ? PostIcon2
                                                : PostIcon
                                        }`}
                                    />
                                </span>
                                POST
                            </div>
                        </Link>
                        <Link
                            to="/search"
                            className={`${
                                location.pathname === '/search'
                                    ? 'text-white hover:text-white'
                                    : 'text-black'
                            }`}
                        >
                            <div
                                className={`flex items-center gap-2 hover:relative mr-4 border-r-4 ${
                                    location.pathname === '/search'
                                        ? 'font-bold border-r-4 [filter:drop-shadow(7px_4px_3px_gray)]'
                                        : 'border-transparent'
                                }`}
                            >
                                <span>
                                    <img
                                        src={`${
                                            location.pathname === '/search'
                                                ? SearchIcon2
                                                : SearchIcon
                                        }`}
                                    />
                                </span>
                                SEARCH
                            </div>
                        </Link>
                        <Link
                            to={`/profile/${id}`}
                            className={`${
                                location.pathname === '/search'
                                    ? 'text-white hover:text-white'
                                    : 'text-black'
                            }`}
                        >
                            <div
                                className={`flex items-center gap-2 hover:relative mr-4 border-r-4 ${
                                    location.pathname === `/profile/${id}`
                                        ? 'font-bold border-black border-r-4 [filter:drop-shadow(7px_4px_3px_gray)]'
                                        : 'border-transparent'
                                }`}
                            >
                                <span>
                                    <img
                                        src={`${
                                            location.pathname === '/search'
                                                ? ProfileIcon2
                                                : ProfileIcon
                                        }`}
                                    />
                                </span>
                                PROFILE
                            </div>
                        </Link>
                        <div
                            className="flex items-center gap-2 hover:mr-4 border-black hover:pl-3 hover:border-l-4 hover:[filter:drop-shadow(-3px_4px_3px_gray)] transition-all pr-4 mt-4 font-semibold"
                            onClick={handleLogout}
                        >
                            <span>
                                <img
                                    src={`${
                                        location.pathname === '/search'
                                            ? logoutIcon2
                                            : logoutIcon
                                    }`}
                                />
                            </span>
                            LOG OUT
                        </div>
                    </div>
                    <div
                        className={`absolute z-40 ${
                            location.pathname === '/search'
                                ? 'bg-black'
                                : 'bg-gray-300'
                        }  h-screen w-px right-0 `}
                    />
                </div>
            </div>
        )
    );
};
