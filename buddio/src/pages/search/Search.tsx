import { Header, Footer } from '../../components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/profilePlaceHolder.png';
import axios from 'axios';
import isFollowing from '../../assets/following.svg';
import visit from '../../assets/visit.svg';

interface User {
  _id: string;
  username: string;
  profileImage: string;
}

export const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        const response = await axios.get(
          'http://localhost:5000/user/following',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFollowingIds(response.data);
      } catch (error) {
        console.error('Erro ao carregar a lista de seguidores: ', error);
      }
    };

    fetchFollowing();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      const token = localStorage.getItem('accessToken');

      try {
        if (!searchTerm.trim()) return;
        const response = await axios.get(
          `http://localhost:5000/search/users?query=${searchTerm}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log('Erro na busca: ', error);
      }
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <Header />
      <div className="flex flex-col items-center flex-1">
        <div className=" relative h-12 flex items-center  w-10/12  border-b-[1px] border-gray-300 mt-20 mb-6">
          <input
            className="bg-white font-montserrat text-xl outline-none text-black"
            type="text"
            placeholder="Buscar usuários"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ul className="flex flex-col md:flex-row items-center justify-center mb-2 mx-auto gap-1 max-h-80 w-80 md:w-full md:bg-purple-300 md:flex-wrap overflow-y-auto overflow-x-hidden py-1 rounded-md">
          {searchResults &&
            searchResults.map((user) => (
              <li
                key={user._id}
                className="flex w-full md:w-52 md:h-40 items-center bg-red-300"
              >
                <Link to={`/profile/${user._id}`} className="w-full">
                  <div className=" flex items-center w-full h-16 md:h-32 rounded-md gap-4 mx-1 bg-blue-400">
                    <img
                      className="flex size-12 md:size-14 md:mt-14 md:ml-2 rounded-full md:rounded object-cover"
                      src={user.profileImage ? user.profileImage : defaultImage}
                      alt="user"
                    ></img>
                    <div className="md:hidden flex flex-col h-12 justify-around ">
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1 text-black font-montserrat font-semibold text-sm">
                          {user.username}
                          {followingIds.includes(user._id) && (
                            <img src={isFollowing} className="size-3" />
                          )}
                        </span>
                      </div>
                      <span className="text-gray-400 font-montserrat text-xs md:hidden">
                        Lorem ipsum dolor sit amet consec.
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:flex">
                    <p className="text-black flex-grow font-montserrat font-semibold text-[10px]">
                      {user.username}
                    </p>

                    <span className="flex items-center justify-center w-12 h-8 rounded-full bg-black ">
                      <img src={visit} />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};
