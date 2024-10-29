import { Header, Footer } from "../../components";
import { useState } from "react";
import axios from "axios";


interface User {
    username: string;
    name: string;
}
export const Search: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchResults, setSearchResults] = useState<User[]>([]);

    const handleSearch = async () => {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await axios.get(`http://localhost:5000/search/users?query=${searchTerm}`, {
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
            <div className="flex items-center justify-center bg-white h-60">
                <div className=" relative h-12 flex items-center  w-10/12  border-b-[1px] border-gray-300">
                    <input
                        className="bg-white font-montserrat text-xl outline-none text-black"
                        type="text"
                        placeholder="Buscar usuários"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <button onClick={handleSearch}>Buscar</button>
                    <ul>

                        {searchResults && searchResults.map((user, index) => (
                            <li key={index}>{user.username}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
};
