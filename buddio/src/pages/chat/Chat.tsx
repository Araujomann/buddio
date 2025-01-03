import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { SwitchS } from '../../components';
import darkSend from '../../assets/darkSend.svg';
import lightSend from '../../assets/lightSend.svg';
import back from '../../assets/back.svg';
import clouds from '../../assets/clouds.png';
import night from '../../assets/night.png';

import ellipsis from '../../assets/ellipsis.svg';

interface Message {
  senderId: string;
  message: string;
  timestamp: string;
}

interface ChatProps {
  switchTheme: any;
}

interface User {
  _id: string;
  username: string;
  email: string;
  bio?: string;
  profileImage: string;
}

interface TokenPayload {
  id: string;
}

export const Chat: React.FC<ChatProps> = ({ switchTheme }) => {
  const { receiverId } = useParams<{ receiverId: string }>();
  const [newMessage, setNewMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [myId, setMyId] = useState<string>('');
  const [conversationIdentifier, setConversationIdentifier] =
    useState<string>();
  const [chatStartedAt, setChatStartedAt] = useState<string>('');
  const [user, setUser] = useState<User>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<boolean>(false);
  const [darkTheme, setDarkTheme] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('darkTheme');
    return savedTheme === 'dark';
  });
  const [selectBackground, setSelectBackground] = useState<number | null>(null);
  const token = localStorage.getItem('accessToken');
  const chatBackground0 =
    'https://res.cloudinary.com/dkhosxear/image/upload/v1734727962/chatbackground0_lal1zo.png';
  const chatBackground1 =
    'https://res.cloudinary.com/dkhosxear/image/upload/v1734727951/chatBackground1_cqe7ox.png';
  const chatBackground2 =
    'https://res.cloudinary.com/dkhosxear/image/upload/v1734727951/chatBackground2_zoxaxl.png';
  const chatBackground3 =
    'https://res.cloudinary.com/dkhosxear/image/upload/v1734727950/chatbackground3_yf1rfa.png';
  const wallpapers = [
    chatBackground0,
    chatBackground1,
    chatBackground2,
    chatBackground3,
  ];
  const [background, setBackground] = useState<string>(wallpapers[0]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<TokenPayload>(token);
      const loggedUserId = decodedToken.id;

      setMyId(loggedUserId);
    }
  }, []);

  useEffect(() => {
    const newSocket = io('http://localhost:5000', {
      query: { token },
      transports: ['websocket'],
    });

    setSocket(newSocket);

    newSocket.on('receiveMessage', (message: Message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on('userOnline', () => {
      setIsOnline(true);
    });

    newSocket.on('userOffline', () => {
      setIsOnline(false);
    });

    newSocket.on('userTyping', () => {
      setIsTyping(true);
    });

    newSocket.on('userStopTyping', () => {
      setIsTyping(false);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [token, receiverId]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [receiverId, chatMessages]);

  useEffect(() => {
    localStorage.setItem('darkTheme', darkTheme ? 'dark' : 'light');
  }, [darkTheme]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const conversationResponse = await axios.post(
          `http://localhost:5000/conversations/${receiverId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const { conversationId, startedAt } = conversationResponse.data;
        console.log(conversationId);

        setConversationIdentifier(conversationId);
        setChatStartedAt(startedAt);

        const fetchMessages = await axios.get(
          `http://localhost:5000/conversations/messages/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setChatMessages(fetchMessages.data);
      } catch (error: any) {
        console.error('Erro ao buscar mensagens: ', error);
      }
    };

    const fetchUser = async () => {
      try {
        const user = await axios.get(
          `http://localhost:5000/profile/${receiverId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setUser(user.data.user);
      } catch (error: any) {
        console.error('Erro ao buscar usuário: ', error);
      }
    };

    const fetchPreferences = async () => {
      try {
        const identifierResponse = await axios.post(
          `http://localhost:5000/conversations/${receiverId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        const { conversationId } = identifierResponse.data;
        const response = await axios.get(
          `http://localhost:5000/conversations/${conversationId}/preferences`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setBackground(response.data.chatBackground);
      } catch (error) {
        console.error('Erro ao buscar preferências: ', error);
      }
    };

    fetchUser();
    fetchMessages();
    fetchPreferences();
  }, [receiverId, token]);

  const handleBack = () => {
    window.history.back();
  };

  const handleSendMessage = () => {
    if (socket && newMessage.trim() !== '') {
      const messageToSend = {
        conversationId: conversationIdentifier,
        senderId: myId,
        receiverId,
        message: newMessage,
        timestamp: new Date().toISOString(),
      };
      socket.emit('sendMessage', messageToSend);

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { ...messageToSend },
      ]);
      setNewMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const isToday = (dateString: string) => {
    const today = new Date();
    const date = new Date(dateString);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(dateString)) return 'Hoje';

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    return new Date(date).toLocaleDateString(undefined, options);
  };

  let lastDate: string | null = null;

  const updateChatBackground = async (chatBackground: string) => {
    if (background === chatBackground) return;
    try {
      await axios.put(
        `http://localhost:5000/conversations/${conversationIdentifier}/chat-background`,
        { chatBackground },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return window.location.reload();
    } catch (error: any) {
      console.error('Erro ao atualizar background: ', error.message);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen">
      {activeMenu && (
        <div
          className="absolute z-10 w-full h-full bg-black/60"
          onClick={() => setActiveMenu(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute z-10 top-14 right-10 w-60 h-80 bg-[#383838] rounded-lg shadow-lg"
          >
            <div
              className="flex items-center justify-center bg-cover h-20 rounded-t-lg"
              style={{
                backgroundImage: `url(${darkTheme ? night : clouds})`,
              }}
            >
              <SwitchS
                onClick={() => {
                  setDarkTheme(!darkTheme);
                  console.log(localStorage.getItem('darkTheme'));
                }}
                checked={darkTheme}
                theme={switchTheme}
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-full h-px bg-slate-200" />
              <p className="font-montserrat text-xs font-semibold justify-self-center mt-5">
                Plano de fundo dessa conversa:
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex justify-center gap-1 mt-3 h-36">
                  {wallpapers.map((wallpaper, index) => (
                    <div
                      key={index}
                      className="relative cursor-pointer hover:filter hover:brightness-125"
                      onClick={() => {
                        setSelectBackground(index);
                      }}
                    >
                      <img src={wallpaper} className="h-full rounded-xl" />
                      {wallpapers[index] === background ||
                        (selectBackground === index && (
                          <div className="absolute bottom-1 right-1 bg-white rounded-full p-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-green-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        ))}
                    </div>
                  ))}
                </div>

                <button
                  className="flex items-center justify-center rounded-md hover:ring-0 hover:outline-none mx-2 h-8 bg-[#292929] hover:bg-[#181818]"
                  onClick={() => {
                    if (
                      selectBackground !== null &&
                      selectBackground !== undefined
                    ) {
                      updateChatBackground(wallpapers[selectBackground]);
                    }
                  }}
                >
                  Aplicar plano de fundo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div
        className={`absolute w-full flex items-center justify-between  pr-4 py-4 border-b ${
          darkTheme ? 'bg-black/60' : 'bg-white/40'
        } shadow-lg border-bottom border-white/20 backdrop-blur-md`}
      >
        <div className="flex items-center">
          <span className="flex h-full" onClick={handleBack}>
            <img src={back} />
          </span>
          <div className="flex items-center">
            <img
              src={user?.profileImage}
              className="size-12 rounded-2xl object-cover"
            />
          </div>
          <div
            className={`flex flex-col ${
              darkTheme ? 'text-white font-semibold' : 'text-black font-bold'
            } font-montserrat  px-2`}
          >
            <p>{user?.username}</p>

            <p
              className={`${isOnline ? 'text-[#16a340]' : 'text-[#838383]'}  
                           
                            text-xs font-bold font-montserrat`}
            >
              {isTyping ? 'Digitando...' : isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <span className="" onClick={() => setActiveMenu(!activeMenu)}>
          <img src={ellipsis} />
        </span>
      </div>

      {/* Mensagens */}

      <div
        className="flex-col h-full text-sm overflow-y-auto p-4 pb-16 pt-24 space-y-3 scrollbar-hide w-screen bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        {chatMessages.map((msg, index) => {
          const messageDate = formatDate(msg.timestamp);
          const showDate =
            messageDate !== lastDate || messageDate === chatStartedAt;
          lastDate = messageDate;

          return (
            <div>
              {showDate && (
                <div
                  className={`${
                    darkTheme
                      ? 'bg-black/60 font-normal'
                      : 'bg-white/60 text-black font-bold'
                  } bg-flex mx-auto items-center  py-1 border border-gray-600 px-2 rounded-md w-fit justify-center text-center text-xs  my-4`}
                >
                  {messageDate}
                </div>
              )}

              <div
                key={index}
                className={`flex ${
                  msg.senderId === myId ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-72 px-4 py-2 gap-0 rounded-2xl break-word  ${
                    msg.senderId === myId
                      ? 'bg-[#e0e0e0] text-[#363636] font-semibold rounded-tr-none'
                      : 'bg-[#363636] text-[#e0e0e0] font-semibold rounded-tl-none'
                  }`}
                >
                  <p>{msg.message}</p>

                  <span
                    className={`text-[10px] text-gray-500 flex self-end h-2 `}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      {/* Input de mensagem */}
      <div className="absolute bottom-3 w-full flex items-center gap-2 px-2">
        <div
          className={`w-full flex items-center ${
            darkTheme ? 'bg-black' : 'bg-white'
          }  p-1 rounded-full`}
        >
          <input
            type="text"
            value={newMessage}
            onKeyDown={handleKeyDown}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message..."
            className={`flex-1 px-4 py-2 rounded-full w-full ${
              darkTheme ? 'bg-black' : 'bg-white'
            } border-none focus:outline-none`}
          />
        </div>

        <button
          onClick={handleSendMessage}
          className={`${darkTheme ? 'bg-black' : 'bg-white'} p-3 rounded-full`}
        >
          <img src={`${darkTheme ? darkSend : lightSend}`} />
        </button>
      </div>
    </div>
  );
};
