import { useEffect, useState } from 'react';
import { Post, Header } from '../../components';
import axios from 'axios';

interface PostData {
  _id: string;
  imageUrl: string;
  user: {
    username: string;
  };
}
export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feed/posts');
        const data = response.data;
        setPosts(data);
      } catch (error) {
        console.error('Erro ao buscar posts: ', error);
      }
    };
    console.log('token: ', localStorage.getItem('token'));
    fetchPosts();
  }, []);

  console.log('Posts: ', posts);
  return (
    <>
      <Header />
      <div className="flex flex-col mt-14">
        {posts.map((post, index) => (
          <Post
            key={index}
            author={post.user.username}
            img={post.imageUrl}
            postId={post._id}
          />
        ))}
      </div>
    </>
  );
};
