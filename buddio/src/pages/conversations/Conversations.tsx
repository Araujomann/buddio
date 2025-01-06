import axios from 'axios';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import allPeoplesAnimation from '../../assets/allPeoples.json';
import FeedIcon from '../../assets/feedLight.svg';
import ProfileIcon from '../../assets/profileLight.svg';
import PostIcon from '../../assets/postLight.svg';
import SearchIcon from '../../assets/searchLight.svg';
import logoutIcon from '../../assets/logoutLight.svg';
import messages from '../../assets/messagesLight.svg';
import buddioLogo from '../../assets/buddio-logo.jpg';
import withoutChat from '../../assets/withoutChatImage2.jpeg';
import search from '../../assets/searchLight.svg';

interface TokenPayload {
  id: string;
}



export const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [myId, setMyId] = useState<string>('');

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (token) {
      const decode = jwtDecode<TokenPayload>(token);
      setMyId(decode.id);
    }
  }, [token]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/conversations',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConversations(response.data);
      } catch (error) {
        return console.log(error);
      }
    };

    fetchConversations();
  }, []);

  console.log(conversations);

  return (
    <div className="flex w-screen h-full bg-[#f3f3f3]">
      <div className="fixed w-28 h-full bg-white border-r-2 border-[#EEEEEF] ">
        <div className="absolute top-0 right-0 left-0 flex items-center justify-center  py-4">
          <img src={buddioLogo} className="rounded-full size-16" />
        </div>
        <div className="flex flex-col h-full items-center justify-center  gap-9 w-full">
          <Link to="/feed">
            <div className="flex items-center gap-2 hover:relative hover:mr-4 transition-all">
              <span>
                <img src={FeedIcon} />
              </span>
            </div>
          </Link>
          <Link to="/conversations">
            <div
              className={`flex items-center gap-2  hover:mr-4  ${
                location.pathname === '/conversations'
                  ? 'font-bold  [filter:drop-shadow(7px_4px_3px_gray)]'
                  : ''
              }   hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black`}
            >
              <span>
                <img src={messages} />
              </span>
            </div>
          </Link>
          <Link to="/post" className="relative">
            <div className="flex items-center hover:relative   gap-2 hover:mr-4   hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
              <span>
                <img src={PostIcon} className="size-8" />
              </span>
            </div>
          </Link>
          <Link to="/search">
            <div className="flex items-center gap-2 hover:mr-4   hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
              <span>
                <img src={SearchIcon} />
              </span>
            </div>
          </Link>
          <Link to={`/profile/${myId}`}>
            <div className="flex items-center gap-2  hover:mr-4  hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
              <span>
                <img src={ProfileIcon} />
              </span>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex ml-28  flex-col w-1/5 bg-white border-r-2 border-[#EEEEEF]">
        <div className="flex items-center h-20 pl-4 font-montserrat">
          <h1 className=" text-2xl font-bold text-black">Conversas</h1>
        </div>
        <div className="border-t-2 border-[#EEEEEF]">
          <div className="bg-white  my-4 flex items-center justify-center h-12 border-2 mx-2 px-2 rounded-xl">
            <img src={search} className="mr-2" />

            <input
              type="text"
              placeholder="Pesquisar"
              className="bg-white border-[#e7eaeb]  text-black w-full font-montserrat focus:outline-none"
            />
          </div>
        </div>
        <span className="flex h-6 gap-2 ml-4 mb-1">
          <Lottie animationData={allPeoplesAnimation} />
          <p className="text-[#9b9da2] font-medium">Todas as Mensagens</p>
        </span>
        {conversations.map((conversation: any) => (
          <div
            key={conversation.id}
            onClick={() => {console.log(conversation.id)}}
            className="flex  border-b-2 py-2 mx-4 h-18 border-[#e7eaeb] text-black "
          >
            <div className="flex items-center justify-center w-12 mr-2">
              <img
                src={
                  conversation.participants.find(
                    (participant: any) => participant._id !== myId
                  ).profileImage
                }
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="flex flex-col ">
              <span className="font-montserrat font-medium">
                { conversation.participants.find(
                    (participant: any) => participant._id !== myId
                  ).username}
              </span>
              <span className="font-montserrat text-black text-sm truncate w-44 ">
                {conversation.lastMessage.text}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-grow h-screen items-center justify-center">
        <img src={withoutChat} className="flex w-full max-h-full " />
      </div>
    </div>
  );
};
