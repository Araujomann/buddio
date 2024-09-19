import { Button } from "../button";
export const Footer: React.FC = () => {
    return (
        <div className="pt-10 flex flex-col gap-10 px-10">
            <h2 className="font-montserrat">Buddio</h2>
            <div className="flex flex-col gap-4">
            <Button
                color="white"
                textColor="black"
                onClick={() => console.log("clicked")}
                text="JOIN FOR FREE"
            />
            <Button
                color="black"
                textColor="white"
                onClick={() => console.log("clicked")}
                text="SIGN IN"
                borderColor="white"
            />

            </div>
            <section className="flex flex-col gap-3">
                <h2 className="font-bold text-lg">COMPANY</h2>
                <ul className="flex flex-col gap-2 font-montserrat text-white">
                    <li>About</li>
                    <li>Blog</li>
                    <li>Jobs</li>
                </ul>
            </section>
            <section className="flex flex-col gap-3">
                <h2 className="font-bold text-lg">COMMUNITY</h2>
                <ul className="flex flex-col gap-2 font-montserrat text-white">
                    <li>Learn</li>
                    <li>Forum</li>
                </ul>
            </section>
            <section>
                <ul className="flex flex-col text-[#c0c0c0] font-montserrat font-bold text-xs gap-2">
                    <li>Terms of use</li>
                    <li>Privacy Policy</li>
                </ul>
            </section>

            <p className="font-montserrat text-sm text-[#c0c0c0]">
                copyright 2024 Buddio. All rights reserved{" "}
            </p>
        </div>
    );
};
