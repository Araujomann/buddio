import { Header, Footer } from "../../components";
import { useState } from "react";
import profileCam from "../../assets/profile-cam.jpg";
import axios from "axios"

interface User {
    username: string;
    profileImage: string;
}

export const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<User[]>([]);

    const handleSearch = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            if(!searchTerm.trim()) return
            const response = await axios.get(
                `http://localhost:5000/search/users?query=${searchTerm}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSearchResults(response.data);
        } catch (error) {
            console.log("Erro na busca: ", error);
        }
    };

    console.log("searchResults heereeeee: ", searchResults);

    return (
        <>
            <Header />
            <div className="flex flex-col items-center  bg-white  ">
                <div className=" relative h-12 flex items-center  w-10/12  border-b-[1px] border-gray-300 mt-20 mb-6">
                    <input
                        className="bg-white font-montserrat text-xl outline-none text-black"
                        type="text"
                        placeholder="Buscar usuários"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key ==="Enter" && handleSearch()}
                    />

                    <button onClick={handleSearch}>Buscar</button>
                </div>

                <ul className="flex flex-col items-center mb-2 mx-auto gap-1 max-h-80 w-80 overflow-auto py-1 rounded-md">
                    {searchResults &&
                        searchResults.map((user, index) => (
                            <li
                                key={index}
                                className="flex w-full items-center"
                            >
                                <div className=" bg-white flex items-center w-full h-16 rounded-md gap-4 mx-1">
                                    <img
                                        className="flex size-14 rounded-full"
                                       src={user.profileImage? user.profileImage: profileCam }
                                        alt="user"></img>
                                        <div className="flex flex-col  h-12justify-around">

                                    <span className="text-black font-montserrat font-semibold text-sm">{user.username}</span>
                                    <span className="text-gray-400 font-montserrat  text-xs">Lorem ipsum dolor sit amet consec.</span>
                                        </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
            <Footer />
        </>
    );
};
