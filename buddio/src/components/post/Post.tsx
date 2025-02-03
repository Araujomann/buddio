import { BiRepost } from 'react-icons/bi';
import { LikeButton } from '../../components';
import Tooltip from '@mui/material/Tooltip';

interface Props {
    img: string;
    author: string;
    postId: string;
    isLiked: boolean;
    likesCount: number;
    className?: string;
    onLikeToggle: (postId: string, isLiked: boolean) => void;
}
export const Post: React.FC<Props> = ({
    img,
    author,
    postId,
    isLiked,
    likesCount,
    className,
    onLikeToggle,
}) => {
    return (
        <div className={`bg-white pb-6 w-full ${className} `}>
            <img src={img} className=" w-fit h-fit md:max-h-svh md:mx-auto" />
            <div className="flex justify-between p-4">
                <span className="text-black flex items-center font-montserrat text-xs font-bold">
                    {author}
                </span>
                <div className="flex items-center justify-start gap-4">
                    <LikeButton
                        postId={postId}
                        isLiked={isLiked}
                        likesCount={likesCount}
                        onLikeToggle={onLikeToggle}
                    />

                    <Tooltip title="Repostar" slotProps={{ popper: { modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -10], // Ajuste a distância aqui (X, Y)
        },
      },
    ]}}}>
                        <span className="block cursor-pointer">
                            <BiRepost color="#AAAAAA" size={24} />
                        </span>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
