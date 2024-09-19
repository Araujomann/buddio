import { Post } from "../../components";
import { Header } from "../../components";
export const Feed:React.FC = () => {
  return (
    <>
    <Header />
    <div className="flex flex-col mt-14">
      <Post img="https://imgs.search.brave.com/cnCnOhurKBTEKadKr9YkZG66Id-TNc8HAkdDxV11rJs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9ncmF0/aXNvZ3JhcGh5LmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/My8xMC9ncmF0aXNv/Z3JhcGh5LXB1bXBr/aW4tc2NhcmVjcm93/LTgwMHg1MjUuanBn" author="alice1df" />
      <Post img="https://images.unsplash.com/photo-1723569575972-e669a0917cd8?q=80&w=812&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" author="davilayyi1i" />
      <Post img="https://images.unsplash.com/photo-1726608708346-165c730d3f30?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8" author="bambu33" />
      <Post img="https://images.unsplash.com/photo-1726486896376-4d1340e2f672?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyN3x8fGVufDB8fHx8fA%3D%3D" author="xerinboxx" />
    </div>
    </>
  )
}
