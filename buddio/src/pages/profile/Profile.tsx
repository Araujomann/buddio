import { useState, useEffect } from "react";
import { FollowButton, Gallery } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import profileCam from "../../assets/profile-cam.jpg";
import edit from "../../assets/edit.svg";
import back from "../../assets/back.svg";

interface User {
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

export const Profile: React.FC = () => {
    const { userId = "" } = useParams();
    const [myProfileId, setMyProfileId] = useState<string>("");

    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            const decodedToken = jwtDecode<TokenPayload>(token);
            const loggedUser = decodedToken.id;

            setMyProfileId(loggedUser);
        }
    }, []);

    console.log("id do usuário clicado: ", userId);
    console.log("usuário logado no momento: ", myProfileId);
    const isOwnProfile = userId === myProfileId && myProfileId !== "";
    console.log("é  o meu perfil? ", isOwnProfile);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                const response = await axios.get(
                    `http://localhost:5000/profile/${userId}`,
                    {
                        headers: {

                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = response.data;
                console.log("Resposta da requisição: ", data);
                setUser(data.user);
                setPosts(data.posts);
            } catch (error) {
                console.error("Erro ao buscar perfil: ", error);
            }
        };

        fetchProfile();
    }, [userId]);

    console.log("User: ", user);

    const handleBack = () => {
        window.history.back();
    };

    const handleEdit = () => {
        navigate("/photo-selection");
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
                                <span
                                    className=" absolute right-0 bottom-0  p-1  cursor-pointer bg-black  rounded-full"
                                    onClick={handleEdit}
                                >
                                    <img src={edit} />
                                </span>
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

                        {!isOwnProfile && <FollowButton folllowingUserId={userId} />}
                    </div>
                </div>
                <div className="mx-4">
                    <span className="  flex w-fit px-2 py-2 border-solid border-t-4  border-black ">
                        <h2 className="text-black font-montserrat font-semibold text-sm">
                            Galeria
                        </h2>
                    </span>

                    <Gallery images={posts.map((post) => post.imageUrl)} />
                </div>
            </div>
        </div>
    );
};
