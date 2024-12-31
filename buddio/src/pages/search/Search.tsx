import { Header, Footer } from '../../components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import withoutImage from '../../assets/withoutPhoto.png';
import axios from 'axios';
import isFollowing from '../../assets/following.svg';
import visit from '../../assets/visit.svg';

interface Post {
  imageUrl: string;
}

interface User {
  _id: string;
  username: string;
  profileImage: string;
  posts?: Post[];
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
        console.log('response Results: ', response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.log('Erro na busca: ', error);
      }
    };

    handleSearch();
  }, [searchTerm]);

  return (
    <div className="flex flex-col w-screen h-screen md:overflow-x-hidden">
      <div className="relative z-30">
        <Header />
      </div>
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

        <ul className="flex flex-col md:px-20 md:flex-row items-center justify-center mb-2 mx-auto gap-1 max-h-80 md:max-h-full md:overflow-y-hidden w-80 md:w-full md:flex-wrap overflow-y-auto overflow-x-hidden py-1 rounded-md">
          {searchResults &&
            searchResults.map((user) => (
              <li
                key={user._id}
                className="flex w-full md:w-60 md:h-48 items-center"
              >
                <Link to={`/profile/${user._id}`} className="w-full">
                  <div className="md:relative flex items-center w-full h-16 md:h-32 rounded-md gap-4 mx-1 ">
                    <img
                      className="md:absolute z-20  [filter:drop-shadow(7px_-1px_6px_black)] flex size-12 md:size-20 md:mt-14 rounded-full object-cover"
                      src={user.profileImage ? user.profileImage : withoutImage}
                      alt="user"
                    ></img>

                    {user.posts && user.posts.length > 0 ? (
                      <>
                        <img
                          src={
                            user.posts[0].imageUrl
                              ? user.posts[0].imageUrl
                              : withoutImage
                          }
                          className="hidden md:block absolute z-10 max-w-24 bottom-3 left-12"
                        />
                        {user.posts.length > 1 ? (
                          <img
                            src={
                              user.posts[1].imageUrl
                                ? user.posts[1].imageUrl
                                : withoutImage
                            }
                            className="hidden md:block absolute max-w-20 left-28"
                          />
                        ) : (
                          <img
                            src={withoutImage}
                            className="hidden md:block absolute max-w-20 left-28"
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <img
                          src={withoutImage}
                          className="hidden md:block absolute z-10 max-w-24 bottom-3 left-12"
                        />
                        <img
                          src={withoutImage}
                          className="hidden md:block absolute max-w-20 left-28"
                        />
                      </>
                    )}

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
                  <div className="hidden md:flex md:pl-2 md:pr-6 ">
                    <p className="text-black flex items-center flex-grow font-montserrat font-semibold text-[12px] ">
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
