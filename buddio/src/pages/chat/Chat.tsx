import { useEffect, useRef, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { api } from '../../services/api';
import { io, Socket } from 'socket.io-client';
import video from '../../assets/video.svg';
import videoLight from '../../assets/videoLight.svg';
import call from '../../assets/call.svg';
import callLight from '../../assets/callLight.svg';
import darkSend from '../../assets/darkSend.svg';
import lightSend from '../../assets/lightSend.svg';
import back from '../../assets/back.svg';
import clouds from '../../assets/clouds.png';
import night from '../../assets/night.png';
import ellipsis from '../../assets/ellipsis.svg';
import ellipsisLight from '../../assets/ellipsisLight.svg';

interface Message {
    senderId: string;
    message: string;
    timestamp: string;
}

interface ChatProps {
    darkTheme?: boolean;
    chatOtherPeopleId?: string;
    updateLastMessage?: (conversationId: string, lastMessage: string) => void;
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

export const Chat: React.FC<ChatProps> = ({ chatOtherPeopleId, darkTheme, updateLastMessage }) => {
    const receiverId = chatOtherPeopleId;
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectBackground, setSelectBackground] = useState<number | null>(
        null
    );
    const token = localStorage.getItem('accessToken');
    const chatBackground0 =
        'https://res.cloudinary.com/dkhosxear/image/upload/v1741732402/default-bg-chat_zxiyjf.jpg';
    const chatBackground1 =
        'https://res.cloudinary.com/dkhosxear/image/upload/v1741722431/blue-gradient-bg-chat_rorb5v.jpg';
    const chatBackground2 =
        'https://res.cloudinary.com/dkhosxear/image/upload/v1741722461/lines-bg-chat_dhgonx.jpg';
    const chatBackground3 =
        'https://res.cloudinary.com/dkhosxear/image/upload/v1741722416/camouflage-bg-chat_bzhue1.jpg';
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
    }, [token]);

    useEffect(() => {
        const newSocket = io('https://buddio-backend.onrender.com', {
            // Trocar pro endereço do servidor em produção
            query: { token },
            transports: ['websocket'],
        });

        setSocket(newSocket);

        if (receiverId) {
            const conversationId = conversationIdentifier;
            newSocket.emit('joinConversation', conversationId, () => {
                console.log('Entrou na conversa: ', conversationId);
            });
        }

        newSocket.on('receiveMessage', (message: Message) => {
            console.log('Data da mensagem socket:', message.timestamp);

            setChatMessages((prevMessages) => [...prevMessages, message]);
        });

        newSocket.on('updateOnlineStatus', (status) => {
            console.log('Status Online: ', status);

            setIsOnline(status.status === 'online');
        });

        newSocket.on('currentOnlineUsers', (onlineUsers) => {
            console.log('Usuários online:', [...onlineUsers]);
        });

        newSocket.on('userTyping', () => {
            setIsTyping(true);
        });

        newSocket.on('userStopTyping', () => {
            setIsTyping(false);
        });

        return () => {
            if (conversationIdentifier) {
                newSocket.emit('leaveConversation', conversationIdentifier);
                console.log('Saiu da conversa: ', conversationIdentifier);
            }
            newSocket.disconnect();
        };
    }, [token, conversationIdentifier]);

    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [receiverId, chatMessages]);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const idToUse = chatOtherPeopleId
                    ? chatOtherPeopleId
                    : receiverId;
                const conversationResponse = await api.post(
                    `/conversations/${idToUse}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const { conversationId, startedAt } = conversationResponse.data;

                setConversationIdentifier(conversationId);
                setChatStartedAt(startedAt);

                const fetchMessages = await api.get(
                    `/conversations/messages/${conversationId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(
                    'Data das mensagens API:',
                    fetchMessages.data[0]?.timestamp
                );

                setChatMessages(fetchMessages.data);
            } catch (error: any) {
                console.error('Erro ao buscar mensagens: ', error);
            }
        };

        const fetchUser = async () => {
            try {
                const idToUse = chatOtherPeopleId
                    ? chatOtherPeopleId
                    : receiverId;
                const user = await api.get(`/profile/${idToUse}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(user.data.user);
            } catch (error: any) {
                console.error('Erro ao buscar usuário: ', error);
            }
        };

        const fetchPreferences = async () => {
            try {
                const idToUse = chatOtherPeopleId
                    ? chatOtherPeopleId
                    : receiverId;
                const identifierResponse = await api.post(
                    `/conversations/${idToUse}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const { conversationId } = identifierResponse.data;
                const response = await api.get(
                    `/conversations/${conversationId}/preferences`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBackground(response.data.chatBackground || wallpapers[0]);
            } catch (error) {
                console.error('Erro ao buscar preferências: ', error);
            }
        };

        fetchUser();
        fetchConversation();
        fetchPreferences();
    }, [receiverId, token]);

    useEffect(() => {
        if(socket) {
            socket.on("receiveMessage", (message: Message) => {
               

                if(updateLastMessage && conversationIdentifier) {
                    updateLastMessage(conversationIdentifier, message.message)
                }
            });
        }
    }, [socket, updateLastMessage, conversationIdentifier]);

    const handleBack = () => {
        setTimeout(() => {
            setIsLoading(true);
            window.location.reload();
        }, 100);
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

            if(updateLastMessage && conversationIdentifier) {
                updateLastMessage(conversationIdentifier, newMessage)
            }
            setNewMessage("")

            const sendLastMessage = async () => {
                try {
                    await api.post(
                        `/conversations/lastMessage`,
                        {
                            conversationId: conversationIdentifier,
                            message: newMessage,
                        },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                } catch (error) {
                    console.error(
                        'Erro ao atualizar a ultima mensagem: ',
                        error
                    );
                }
            };
            sendLastMessage();

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
            await api.put(
                `/conversations/${conversationIdentifier}/chat-background`,
                { chatBackground },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            return window.location.reload();
        } catch (error: any) {
            console.error('Erro ao atualizar background: ', error.message);
        }
    };

    return (
        <div className="flex w-full flex-col h-full">
            {isLoading && (
                <div className="z-20 fixed flex items-center justify-center w-full h-full bg-white">
                    <div className="spinner"></div>
                </div>
            )}
            {activeMenu && (
                <div
                    className="absolute z-10  w-full h-full bg-black/60"
                    onClick={() => setActiveMenu(false)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className={`absolute z-10 top-14 right-10 xl:right-96 xl:mr-16 w-60 xl:w-2/4 h-80 xl:h-fit  ${darkTheme ? 'bg-black' : 'bg-white'} rounded-lg shadow-lg`}
                    >
                        <div
                            className="flex items-center justify-center bg-cover h-20 rounded-t-lg"
                            style={{
                                backgroundImage: `url(${
                                    darkTheme ? night : clouds
                                })`,
                            }}
                        />

                        <div className="flex flex-col items-center justify-center rounded-b-xl">
                            <div className="w-full h-px bg-slate-400" />
                            <p className={`font-montserrat ${darkTheme ? 'text-white' : 'text-black'} text-xs font-semibold justify-self-center mt-5 xl:text-lg`}>
                                Plano de fundo dessa conversa:
                            </p>
                            <div className="flex flex-col flex-grow gap-2 xl:mb-2">
                                <div className="flex justify-center gap-1 mt-3 h-36 xl:h-60 ">
                                    {wallpapers.map((wallpaper, index) => (
                                        <div
                                            key={index}
                                            className="relative cursor-pointer hover:filter hover:brightness-125"
                                            onClick={() => {
                                                setSelectBackground(index);
                                            }}
                                        >
                                            <img
                                                src={wallpaper}
                                                className="h-full rounded-xl max-w-12 xl:max-w-32 border-black hover:border hover:border-px"
                                            />
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
                                    className={`flex items-center justify-center xl:text-lg rounded-md mx-2 h-8 xl:h-14 focus:outline-none focus:ring-2  ${darkTheme? 'bg-[#292929] hover:bg-[#181818] text-white' : 'bg-[#f2f2f2] hover:bg-[#dadada]'} text-black font-semibold font-montserrat}`}
                                    onClick={() => {
                                        if (
                                            selectBackground !== null &&
                                            selectBackground !== undefined
                                        ) {
                                            updateChatBackground(
                                                wallpapers[selectBackground]
                                            );
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
                className={`w-full flex items-center justify-between  pr-4 py-4 border-b ${
                    darkTheme ? 'bg-black' : 'bg-white'
                } shadow-lg border-bottom border-white/20 backdrop-blur-md`}
            >
                <div className="flex items-center xl:ml-4">
                    <span
                        className="flex xl:hidden h-full"
                        onClick={handleBack}
                    >
                        <img src={back} className="flex" />
                    </span>
                    <div className="flex items-center">
                        <img
                            src={user?.profileImage}
                            className="size-12 rounded-2xl object-cover"
                        />
                    </div>
                    <div
                        className={`flex flex-col ${
                            darkTheme
                                ? 'text-white font-semibold'
                                : 'text-black font-bold'
                        } font-montserrat  px-2`}
                    >
                        <p>{user?.username}</p>

                        <p
                            className={`${
                                isOnline ? 'text-[#16a340]' : 'text-[#838383]'
                            }  
                           
                            text-xs font-bold font-montserrat`}
                        >
                            {isTyping
                                ? 'Digitando...'
                                : isOnline
                                ? 'Online'
                                : 'Offline'}
                        </p>
                    </div>
                </div>

                <div className="flex gap-4 items-center justify-center">
                    <span>
                        <img src={darkTheme ? video : videoLight} />
                    </span>
                    <span>
                        <img src={darkTheme ? call : callLight} />
                    </span>
                    <span onClick={() => setActiveMenu(!activeMenu)}>
                        <img src={darkTheme ? ellipsis : ellipsisLight} />
                    </span>
                </div>
            </div>

            {/* Mensagens */}

            <div
                className="flex-col h-full text-sm overflow-y-auto p-4 pb-16 pt-24 space-y-3 scrollbar-hide bg-cover bg-no-repeat"
                style={{
                    backgroundImage: `url(${background})`,
                }}
            >
                {chatMessages.map((msg, index) => {
                    const messageDate = formatDate(msg.timestamp);
                    const showDate =
                        messageDate !== lastDate ||
                        messageDate === chatStartedAt;
                    lastDate = messageDate;

                    return (
                        <div className="md:text-base lg:text-lg xl:text-sm">
                            {showDate && (
                                <div
                                    className={`${
                                        darkTheme
                                            ? 'bg-black/60 font-normal'
                                            : 'bg-white/60 text-black font-bold'
                                    } bg-flex mx-auto items-center  py-1 border border-gray-600 px-2 rounded-md w-fit justify-center text-center text-xs md:text-base  my-4`}
                                >
                                    {messageDate}
                                </div>
                            )}

                            <div
                                key={index}
                                className={`flex ${
                                    msg.senderId === myId
                                        ? 'justify-end'
                                        : 'justify-start'
                                }`}
                            >
                                <div
                                    className={`flex max-w-72  xl:max-w-96 px-4 py-2 gap-0 rounded-2xl break-words ${
                                        msg.senderId === myId
                                            ? 'bg-[#e0e0e0] text-[#363636] font-semibold rounded-tr-none'
                                            : 'bg-[#363636] text-[#e0e0e0] font-semibold rounded-tl-none'
                                    }`}
                                >
                                    <p className='w-11/12'>{msg.message}</p>

                                    <span
                                        className={`text-[10px] text-gray-500 flex self-end h-2`}
                                    >
                                        {new Date(
                                            msg.timestamp
                                        ).toLocaleTimeString([], {
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
            <div className="relative">
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
                            placeholder="Escrever..."
                            className={`flex-1 px-4 py-2 rounded-full w-full ${
                                darkTheme
                                    ? 'bg-black text-white'
                                    : 'bg-white text-black'
                            } border-none focus:outline-none`}
                        />
                    </div>

                    <button
                        onClick={handleSendMessage}
                        className={`${
                            darkTheme ? 'bg-black' : 'bg-white'
                        } p-3  rounded-full`}
                    >
                        <img src={`${darkTheme ? darkSend : lightSend}`} />
                    </button>
                </div>
            </div>
        </div>
    );
};
