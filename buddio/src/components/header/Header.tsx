import { HiMiniBars2 } from "react-icons/hi2";
import { useState } from "react";
import { Options } from "../options/Options";
import buddioIcon from "../../assets/buddio-logo.jpg";

export const Header: React.FC = () => {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const handleClick = () => {
      setIsOptionsOpen(!isOptionsOpen);
    };

    return (
      <>
      {isOptionsOpen && <Options handleClick={handleClick} />}
        <div className="flex z-20 fixed font-montserrat items-center justify-between h-14 bg-black w-full px-4">
            <img src={buddioIcon} className="rounded-full size-9"/>
            <span onClick={handleClick}>
                <HiMiniBars2 size={30} />
            </span>
        </div>
      </>
    );
};