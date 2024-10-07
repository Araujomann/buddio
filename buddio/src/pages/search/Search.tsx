import { Header, Footer } from "../../components";
import close from "../../assets/grayClose.svg";
import { useState } from "react";

export const Search: React.FC = () => {

    const [inputValue, setImputValue] = useState<string>("");

    const handleCloseClick = () => {
        setImputValue("");
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setImputValue(e.target.value);
    }


    return (
        <>
            <Header />
            <div className="flex items-center justify-center bg-white h-60">
                <div className= " relative h-12 flex items-center  w-10/12  border-b-[1px] border-gray-300">
                    {inputValue && (
                    <span className="absolute right-0" onClick={handleCloseClick} >
                        <img src={close}  />
                    </span>
                    )}
                    <input
                        className="bg-white font-montserrat text-xl outline-none text-black"
                        type="text"
                        placeholder="Search"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};
