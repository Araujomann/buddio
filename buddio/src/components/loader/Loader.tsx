import { CSSProperties } from "react";
import HashLoader from "react-spinners/HashLoader";

interface LoaderProps {
    loading: boolean;
}


const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export const Loader:React.FC<LoaderProps> = ({loading} ) => {
   
    if (!loading) {
        return null;
    }

    return (
        <div className="sweet-loading">

            <HashLoader
                color="black"
                loading={loading}
                cssOverride={override}
                size={90}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};
