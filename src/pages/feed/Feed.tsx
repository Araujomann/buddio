import { useEffect, useState } from 'react';
import { Post, Header } from '../../components';

import empty from '../../assets/emptyFeed.json';
import Lottie from 'lottie-react';
import { api } from '../../services/api';

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
    const [page, setPage] = useState<number>(1);
    const [hasNextPage, setHasNextPage] = useState<boolean>(true);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchPosts = async () => {
            if (!hasNextPage) return;
            setIsLoading(true);
            try {
                const response = await api.get(
                    `/feed/posts?page=${page}&limit=10`,

                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = response.data;
                setPosts((prevPosts) => [...prevPosts, ...data.posts]);
                setHasNextPage(data.pagination.hasNextPage);
                setIsLoading(false);
            } catch (error) {
                console.error('Erro ao buscar posts: ', error);
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isLoading) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );

        const target = document.querySelector("#scroll-sentinel")
        if(target) observer.observe(target);
    
        return () => observer.disconnect()
    }, [hasNextPage, isLoading]);

    const toggleLike = async (postId: string) => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await api.post(
                `/feed/posts/${postId}/like`,
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
            <div className="fixed z-50">
                <Header />
            </div>

            <div className="flex flex-col w-screen h-screen overflow-x-hidden">
                {isLoading && (
                    <div className="fixed z-10 bg-white bg-opacity-75 overflow-hidden flex items-center h-full w-full   justify-center text-black">
                        <div className="spinner"></div>
                    </div>
                )}

                <div className="relative z-40 flex flex-col items-center md:ml-56 md:pr-40 lg:ml-60 lg:pr-48 xl:ml-60 xl:pr-96 xl:pl-32 flex-1 overflow-y-auto">
                    {posts.length > 0 ? (
                        <>
                        { posts.map((post, index) => (
                             <Post
                                 key={post._id}
                                 author={post.user?.username} //gambis
                                 img={post.imageUrl}
                                 postId={post._id}
                                 isLiked={post.isLiked}
                                 likesCount={post.likesCount}
                                 onLikeToggle={toggleLike}
                                 className={index === 0 ? 'mt-14 md:mt-8 ' : ''}
                             />
                         ))}
                            <div id="scroll-sentinel" className="h-10" />
                        </>
                    ) : (
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
