import { useEffect, useState } from 'react';
import { Post, Header } from '../../components';
import axios from 'axios';

interface PostData {
  _id: string;
  user: {
    username: string;
  };
  imageUrl: string;
  isLiked: boolean;
  likesCount: number;
}

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const token = localStorage.getItem('accessToken');

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

  return (
    <>
      <Header />

      <div className="flex flex-col w-screen h-screen overflow-x-hidden">
        {isLoading && (
          <div className="fixed z-10 bg-white bg-opacity-75 overflow-hidden flex items-center h-full w-full   justify-center text-black">
            <div className="spinner"></div>
          </div>
        )}
        <div className="flex flex-col items-center flex-1 overflow-y-auto"></div>
        {posts.map((post) => (
          <Post
            key={post._id}
            author={post.user.username}
            img={post.imageUrl}
            postId={post._id}
            isLiked={post.isLiked}
            likesCount={post.likesCount}
            onLikeToggle={toggleLike}
          />
        ))}
      </div>
    </>
  );
};
