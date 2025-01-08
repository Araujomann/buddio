import { useEffect, useState } from 'react';
import { Post, Header } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import FeedIcon from '../../assets/feedLight.svg';
import ProfileIcon from '../../assets/profileLight.svg';
import PostIcon from '../../assets/postLight.svg';
import SearchIcon from '../../assets/searchLight.svg';
import buddioIcon from '../../assets/buddio-logo.jpg';
import logoutIcon from '../../assets/logoutLight.svg';
import messages from '../../assets/messagesLight.svg';
import empty from '../../assets/emptyFeed.json';
import Lottie from 'lottie-react';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface PostData {
  _id: string;
  user: {
    username: string;
  };
  imageUrl: string;
  isLiked: boolean;
  likesCount: number;
}

interface TokenPayload {
  id: string;
}

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [id, setId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const location = useLocation();

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      const decode = jwtDecode<TokenPayload>(token);
      setId(decode.id);
    }
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:5000/feed/posts',

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar posts: ', error);
        setIsLoading(false);

      }
    };

    fetchPosts();
  }, []);

  const toggleLike = async (postId: string) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.post(
        `http://localhost:5000/feed/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedPosts = posts.map((post) =>
        post._id === postId
          ? {
              ...post,
              isLiked: response.data.isLiked,
              likesCount: response.data.likesCount,
            }
          : post
      );

      setPosts(updatedPosts);
    } catch (error) {
      console.error('Erro ao curtir/descurtir post: ', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout');
      localStorage.removeItem('accessToken');

      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao fazer o logout: ', error);
    }
  };

  return (
    <>
      <div className="fixed z-50 md:hidden">
        <Header />
      </div>

      <div className="flex flex-col w-screen h-screen overflow-x-hidden">
        {isLoading && (
          <div className="fixed z-10 bg-white bg-opacity-75 overflow-hidden flex items-center h-full w-full   justify-center text-black">
            <div className="spinner"></div>
          </div>
        )}
        <div className="hidden lg:flex flex-how relative">
          <div className="hidden  lg:flex fixed flex-col border-black items-center left-0 top-0 bottom-0 bg-white w-60">
            <div className="relative flex px-5">
              <h1 className="text-black font-ptSans font-extrabold text-8xl">
                B
              </h1>

              <img
                src={buddioIcon}
                className="absolute rounded-full size-5 animate-spinSlow bottom-4 p-px bg-black right-0"
              />
            </div>

            <div className="flex flex-col mt-8 gap-4  w-40">
              <Link to="/feed">
                <div
                  className={`flex items-center gap-2 hover:relative mr-4 border-r-4  text-black ${
                    location.pathname === '/feed'
                      ? 'font-bold border-black border-r-4 [filter:drop-shadow(7px_4px_3px_gray)]'
                      : ''
                  }`}
                >
                  <span>
                    <img src={FeedIcon} />
                  </span>
                  FEED
                </div>
              </Link>
              <Link to="/conversations">
                <div className="flex items-center gap-2  hover:mr-4 hover:border-r-4   border-black  hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
                  <span>
                    <img src={messages} />
                  </span>
                  MESSAGES
                </div>
              </Link>
              <Link to="/post" className="relative">
                <div className="flex items-center hover:relative   gap-2 hover:mr-4 hover:border-r-4 border-black hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
                  <span>
                    <img src={PostIcon} className="size-8" />
                  </span>
                  POST
                </div>
              </Link>
              <Link to="/search">
                <div className="flex items-center gap-2 border-black hover:mr-4 hover:border-r-4  hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
                  <span>
                    <img src={SearchIcon} />
                  </span>
                  SEARCH
                </div>
              </Link>
              <Link to={`/profile/${id}`}>
                <div className="flex items-center gap-2 border-black hover:mr-4 hover:border-r-4  hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
                  <span>
                    <img src={ProfileIcon} />
                  </span>
                  PROFILE
                </div>
              </Link>
              <div
                className="flex items-center gap-2 hover:mr-4 border-black hover:pl-3 hover:border-l-4 hover:[filter:drop-shadow(-3px_4px_3px_gray)] transition-all pr-4 mt-4 font-semibold text-black"
                onClick={handleLogout}
              >
                <span>
                  <img src={logoutIcon} />
                </span>
                LOG OUT
              </div>
            </div>
            <div className="absolute z-40 bg-gray-300 h-screen w-px right-0" />
          </div>
        </div>

        <div className="relative z-40 flex flex-col items-center md:ml-40 md:pr-40 lg:ml-60 lg:pr-48 xl:ml-60 xl:pr-96 xl:pl-32 flex-1 overflow-y-auto">
          {posts.map((post, index) => (
            <Post
              key={post._id}
              author={post.user.username}
              img={post.imageUrl}
              postId={post._id}
              isLiked={post.isLiked}
              likesCount={post.likesCount}
              onLikeToggle={toggleLike}
              className={index === 0 ? 'mt-14 md:mt-8 ' : ''}
            />
          ))}
          {
          posts.length === 0 && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Lottie animationData={empty} />
            <p className="font-montserrat text-xl font-bold text-[#9b9da2]">
              No one has posted yet
            </p>
          </div>
          )}
        </div>
      </div>
    </>
  );
};
