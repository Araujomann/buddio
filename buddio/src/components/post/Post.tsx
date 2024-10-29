import { HiOutlineStar } from "react-icons/hi2";
import { BiRepost } from "react-icons/bi";

interface Props {
    img: string;
    author: string;
    user: string;
}
export const Post: React.FC<Props> = ({ img, author }) => {
    return (
        <div className="bg-white pb-6">
            <img src={img} className="w-full h-full" />
            <div className="flex justify-between p-4">
                <span className="text-black flex items-center font-montserrat text-xs font-bold">{author}</span>
                <div className="flex items-center gap-4">
                    <span>
                        <HiOutlineStar color="#AAAAAA" size={24} />
                    </span>
                    <span>
                        <BiRepost color="#AAAAAA" size={24}/>
                    </span>
                </div>
            </div>
        </div>
    );
};
