import { BiRepost } from 'react-icons/bi';
import { LikeButton } from '../../components';

interface Props {
  img: string;
  author: string;
  postId: string;
  isLiked: boolean;
  likesCount: number;
  onLikeToggle: (postId: string, isLiked: boolean) => void;
}
export const  Post: React.FC<Props> = ({ img, author, postId, isLiked, likesCount, onLikeToggle }) => {
 
 
  return (
    <div className="bg-white pb-6">
      <img src={img} className="w-full h-fit" />
      <div className="flex justify-between p-4">
        <span className="text-black flex items-center font-montserrat text-xs font-bold">
          {author}
        </span>
        <div className="flex items-center justify-start gap-4">
          <LikeButton postId={postId} isLiked={isLiked} likesCount={likesCount} onLikeToggle={onLikeToggle} />
          <span>
            <BiRepost color="#AAAAAA" size={24} />
          </span>
        </div>
      </div>
    </div>
  );
};
