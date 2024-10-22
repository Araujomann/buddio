import { useEffect } from "react";
import axios from "axios";
import FeedIcon from "../../assets/feed.svg";
import ProfileIcon from "../../assets/profile.svg";
import PostIcon from "../../assets/post.svg";
import SearchIcon from "../../assets/search.svg";
import CloseIcon1 from "../../assets/close1.svg";
import buddioIcon from "../../assets/buddio-logo.jpg";
import logoutIcon from "../../assets/logout.svg";

import { Link } from "react-router-dom";

interface Props {
    handleClick: () => void;
}

export const Options: React.FC<Props> = ({ handleClick }) => {
    useEffect(() => {
        document.body.classList.add("no-scroll");

        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, []);


    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/auth/logout");

            localStorage.removeItem("accessToken");

            window.location.href = "/login"
        } catch (error) {

            console.error("Erro ao fazer o logout: ", error)
            
        }
    }

    return (
        <div className="absolute z-30 w-full h-full bg-black ">
            <div className="relative flex items-center h-14 justify-between w-screen p-4 bg-black">
            <img src={buddioIcon} className="rounded-full size-9"/>
                <span className="absolute right-4 " onClick={handleClick}>
                    <img src={CloseIcon1} />
                </span>
            </div>
            <section className="flex flex-col gap-4 p-4 border-b-[1px] border-gray-500 font-bold">
                <Link to="/feed">
                    <div className="flex items-center gap-2 text-white">
                        <span>
                            <img src={FeedIcon} />
                        </span>
                        FEED
                    </div>
                </Link>
                <Link to="/post">
                    <div className="flex items-center gap-2 text-white">
                        <span>
                            <img src={PostIcon} className="size-8" />
                        </span>
                        POST
                    </div>
                </Link>
                <Link to="/search">
                    <div className="flex items-center gap-2 text-white">
                        <span>
                            <img src={SearchIcon} />
                        </span>
                        SEARCH
                    </div>
                </Link>
                <Link to="/profile">
                    <div className="flex items-center gap-2 text-white" >
                        <span>
                            <img src={ProfileIcon} />
                        </span>
                        PROFILE
                    </div>
                </Link>
              
            </section>
            
            <div className="flex items-center gap-2 px-4 mt-4 font-bold " onClick={handleLogout}>
                <span>
                    <img src={logoutIcon} />
                </span>
                LOG OUT
            </div>
        </div>
    );
};
