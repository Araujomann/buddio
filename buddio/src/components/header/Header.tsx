import { HiMiniBars2 } from "react-icons/hi2";


export const Header:React.FC = () => {
  return (
    <div className="flex z-20 fixed font-montserrat items-center justify-between h-14 bg-black w-full px-4">
        <h2>Buddio</h2>
        <HiMiniBars2 size={30} />

    </div>
  )
}
