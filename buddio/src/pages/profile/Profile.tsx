import { useState, useEffect } from 'react';
import { FollowButton, Gallery } from '../../components';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { api } from '../../services/api';
import profileCam from '../../assets/profile-cam.jpg';
import edit from '../../assets/edit.svg';
import back from '../../assets/back.svg';
import remove from '../../assets/remove.svg';
import { Tooltip } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import { DialogActions } from '@mui/material';

interface User {
    _id: string;
    username: string;
    email: string;
    bio?: string;
    profileImage: string;
}

interface Post {
    _id: string;
    imageUrl: string;
    createdAt: string;
}

interface TokenPayload {
    id: string;
}

type Section = 'Galeria' | 'Curtidas' | 'Seguidores';

export const Profile: React.FC = () => {
    const { userId = '' } = useParams();
    const [myProfileId, setMyProfileId] = useState<string>('');
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [activeSection, setActiveSection] = useState<Section>('Galeria');
    const [likedPosts, setLikedPosts] = useState<Post[]>([]);
    const [followers, setFollowers] = useState<User[]>([]);
    const [removeFollower, setRemoveFollower] = useState<boolean>(false);
    const navigate = useNavigate();
    const isOwnProfile = userId === myProfileId && myProfileId !== '';
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<TokenPayload>(token);
            const loggedUser = decodedToken.id;

            setMyProfileId(loggedUser);
        }
    }, []);
    console.log('token: ', myProfileId);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`/profile/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = response.data;
                setUser(data.user);
                setPosts(data.posts);
            } catch (error) {
                console.error('Erro ao buscar perfil: ', error);
            }
        };

        fetchProfile();
    }, [userId]);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                const response = await api.get(`/posts/${userId}/liked-posts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const likedPosts = response.data;
                setLikedPosts(likedPosts);
            } catch (error) {
                console.error('Erro ao buscar perfil: ', error);
            }
        };

        if (activeSection === 'Curtidas') fetchLikedPosts();
    }, [activeSection]);

    useEffect(() => {
        const fetchFollowers = async () => {
            try {
                const response = await api.get(`/followers`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const myFollowers = response.data;
                setFollowers(myFollowers);
                console.log('myFollowers', myFollowers);
            } catch (error) {
                console.error('Erro ao buscar perfil: ', error);
            }
        };

        if (activeSection === 'Seguidores') fetchFollowers();
    }, [activeSection]);

    const handleBack = () => {
        window.history.back();
    };

    const handleEdit = () => {
        navigate('/profile-photo-selection');
    };

    const handleFollowerRemove = async (id: string) => {
        try {
            const response = await api.delete(`/removeFollow/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('response', response);
        } catch (error) {
            console.error('Erro ao remover user: ', error);
        }
    };

    if (!user) return <h2>carregando perfil...</h2>;

    return (
        <div className="flex flex-col bg-white h-full ">
            <header className="relative flex bg-white mb-12 mt-4 items-center justify-center">
                <span className="absolute left-4 " onClick={handleBack}>
                    <img src={back} />
                </span>
                <p className="text-black font-montserrat font-semibold text-sm">
                    {user?.email}
                </p>
            </header>
            <div className="bg-white flex flex-col h-full w-screen">
                <div className="flex gap-4  px-4 items-center mb-12">
                    {user?.profileImage ? (
                        <div className="relative flex items-center justify-center rounded-full">
                            {isOwnProfile && (
                                <Tooltip
                                    title="Alterar foto de perfil"
                                    arrow
                                    placement="right-end"
                                    slotProps={{
                                        popper: {
                                            modifiers: [
                                                {
                                                    name: 'offset',
                                                    options: {
                                                        offset: [6, -8], // Ajuste a distância aqui (X, Y)
                                                    },
                                                },
                                            ],
                                        },
                                    }}
                                >
                                    <span
                                        className="absolute block right-0 bottom-0 p-2 cursor-pointer bg-black rounded-full "
                                        onClick={handleEdit}
                                    >
                                        <img src={edit} />
                                    </span>
                                </Tooltip>
                            )}
                            <img
                                src={user.profileImage}
                                className="object-cover rounded-full w-28 h-28"
                            />
                        </div>
                    ) : (
                        <div className="relative flex items-center justify-center  rounded-full bg-gray-500">
                            {isOwnProfile && (
                                <span
                                    className=" p-1 mt-1 cursor-pointer bg-black bg-opacity-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                    onClick={handleEdit}
                                >
                                    <img src={edit} />
                                </span>
                            )}
                            <img
                                src={profileCam}
                                className="rounded-full w-28"
                            />
                        </div>
                    )}
                    <div className="flex justify-between items-center gap-8 pt-6">
                        <div className="flex flex-col  ">
                            <h2 className="font-bold text-md text-black">
                                {user?.username}
                            </h2>
                            <p className="text-sm text-[#9b9b9b] ">biography</p>
                        </div>

                        {!isOwnProfile && (
                            <FollowButton followingUserId={userId} />
                        )}
                    </div>
                </div>
                <div className="mx-4 ">
                    <div className="flex ">
                        <span
                            className={`  flex w-fit px-2 py-2 border-solid border-t-4 ${
                                activeSection === 'Galeria'
                                    ? ' border-black'
                                    : 'border-[#9b9b9b]'
                            }`}
                            onClick={() => setActiveSection('Galeria')}
                        >
                            <h2
                                className={`font-montserrat font-semibold text-sm ${
                                    activeSection === 'Galeria'
                                        ? ' text-black'
                                        : 'text-[#9b9b9b]'
                                } `}
                            >
                                Galeria
                            </h2>
                        </span>
                        <span
                            className={`  flex w-fit px-2 py-2 border-solid border-t-4  ${
                                activeSection === 'Curtidas'
                                    ? ' border-black'
                                    : 'border-[#9b9b9b]'
                            }`}
                            onClick={() => setActiveSection('Curtidas')}
                        >
                            <h2
                                className={`font-montserrat font-semibold text-sm ${
                                    activeSection === 'Curtidas'
                                        ? ' text-black'
                                        : 'text-[#9b9b9b]'
                                }`}
                            >
                                Curtidas
                            </h2>
                        </span>
                        {isOwnProfile && (
                            <span
                                className={`  flex w-fit px-2 py-2 border-solid border-t-4 ${
                                    activeSection === 'Seguidores'
                                        ? ' border-black'
                                        : 'border-[#9b9b9b]'
                                }`}
                                onClick={() => setActiveSection('Seguidores')}
                            >
                                <h2
                                    className={`font-montserrat font-semibold text-sm ${
                                        activeSection === 'Seguidores'
                                            ? ' text-black'
                                            : 'text-[#9b9b9b]'
                                    } `}
                                >
                                    Seguidores
                                </h2>
                            </span>
                        )}
                    </div>

                    {activeSection === 'Galeria' && (
                        <Gallery images={posts.map((post) => post.imageUrl)} />
                    )}
                    {activeSection === 'Curtidas' && (
                        <Gallery
                            images={likedPosts.map(
                                (likedPost) => likedPost.imageUrl
                            )}
                        />
                    )}
                    {activeSection === 'Seguidores' && (
                        <div className="flex flex-col gap-2 mt-4 ">
                            {followers.map((follower, index) => (
                                follower && (
                                <div
                                    key={index}
                                    className="flex items-center justify-between gap-4 h-20 rounded-md px-4 shadow-[0px_4px_10px_-2px_rgba(0,0,0,0.5),0px_-4px_10px_-2px_rgba(0,0,0,0.1)]"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={follower.profileImage}
                                            className="rounded-full size-14 object-cover"
                                        />
                                        <div className="flex flex-col">
                                            <h2 className="font-bold text-md text-black">
                                                {follower.username}
                                            </h2>
                                        </div>
                                    </div>

                                    <Tooltip
                                        title="Remover"
                                        arrow
                                        placement="left"
                                        slotProps={{
                                            popper: {
                                                modifiers: [
                                                    {
                                                        name: 'offset',
                                                        options: {
                                                            offset: [0, -6], // Ajuste a distância aqui (X, Y)
                                                        },
                                                    },
                                                ],
                                            },
                                        }}
                                    >
                                        <div
                                            className="cursor-pointer"
                                            onClick={() =>
                                                setRemoveFollower(true)
                                            }
                                        >
                                            <img
                                                src={remove}
                                                className="w-full h-full"
                                            />
                                        </div>
                                    </Tooltip>

                                    {setRemoveFollower && (
                                        <Dialog
                                            open={removeFollower}
                                            onClose={() =>
                                                setRemoveFollower(false)
                                            }
                                        >
                                            <DialogContent>
                                                <DialogContentText>
                                                    Deseja realmente remover{' '}
                                                    {follower.username} de seus
                                                    seguidores?
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <button
                                                    onClick={() =>
                                                        setRemoveFollower(false)
                                                    }
                                                    className="text-white focus:outline-none"
                                                >
                                                    Cancelar
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        handleFollowerRemove(
                                                            follower._id
                                                        );
                                                        setRemoveFollower(
                                                            false
                                                        );
                                                    }}
                                                    className="text-white focus:outline-none"
                                                >
                                                    Remover
                                                </button>
                                            </DialogActions>
                                        </Dialog>
                                    )}
                                </div>
                            )))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
