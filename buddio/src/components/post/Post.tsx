import { BiRepost } from "react-icons/bi";
import { LikeButton } from "../../components";

interface Props {
    img: string;
    author: string;
    postId: string;
}
export const Post: React.FC<Props> = ({ img, author, postId }) => {
    return (
        <div className="bg-white pb-6">
            <img src={img} className="w-full h-full" />
            <div className="flex justify-between p-4">
                <span className="text-black flex items-center font-montserrat text-xs font-bold">{author}</span>
                <div className="flex items-center gap-4">
                   <LikeButton postId={postId}/>
                    <span>
                        <BiRepost color="#AAAAAA" size={24}/>
                    </span>
                </div>
            </div>
        </div>
    );
};
