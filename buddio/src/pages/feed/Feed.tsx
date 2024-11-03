import { useEffect, useState } from "react";
import { Post, Header } from "../../components";
import axios from "axios";

export const Feed: React.FC = () => {
    const [posts, setPosts] = useState<(typeof Post)[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/feed/posts"
                );
                const data = response.data;
                console.log("Resposta da requisição: ", data);
                setPosts(data);
            } catch (error) {
                console.error("Erro ao buscar posts: ", error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <>
            <Header />
            <div className="flex flex-col mt-14">
                {posts.map((post, index) => (
                    <Post key={index} author={post.user.username} img={post.imageUrl} />
                ))}
            </div>
        </>
    );
};
