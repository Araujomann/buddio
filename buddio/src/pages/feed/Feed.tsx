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
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchPosts = async () => {
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
      } catch (error) {
        console.error('Erro ao buscar posts: ', error);
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
      <div className="flex flex-col mt-14">
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
