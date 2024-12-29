import { Header, Footer } from '../../components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import defaultImage from '../../assets/profilePlaceHolder.png';
import axios from 'axios';
import isFollowing from '../../assets/following.svg';

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
          },
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
          },
        );
        setSearchResults(response.data);
      } catch (error) {
        console.log('Erro na busca: ', error);
      }
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <div className='flex flex-col w-screen h-screen'>
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

        <ul className="flex flex-col items-center mb-2 mx-auto gap-1 max-h-80 w-80 overflow-y-auto overflow-x-hidden py-1 rounded-md">
          {searchResults &&
            searchResults.map((user) => (
              <li key={user._id} className="flex w-full items-center">
                <Link to={`/profile/${user._id}`} className="w-full">
                  <div className=" flex items-center w-full h-16 rounded-md gap-4 mx-1">
                    <img
                      className="flex size-12 rounded-full object-cover"
                      src={user.profileImage ? user.profileImage : defaultImage}
                      alt="user"
                    ></img>
                    <div className="flex flex-col  h-12justify-around">
                      <div className="flex justify-between">
                        <span className="flex items-center gap-1 text-black font-montserrat font-semibold text-sm">
                          {user.username}
                          {followingIds.includes(user._id) && (
                            <img src={isFollowing} className="size-3" />
                          )}
                        </span>
                      </div>
                      <span className="text-gray-400 font-montserrat  text-xs">
                        Lorem ipsum dolor sit amet consec.
                      </span>
                    </div>
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
