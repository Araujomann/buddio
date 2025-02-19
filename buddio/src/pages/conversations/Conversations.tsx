import { api } from '../../services/api';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import allPeoplesAnimation from '../../assets/allPeoples.json';
import FeedIcon from '../../assets/feedLight.svg';
import darkFeedIcon from '../../assets/feed.svg';
import ProfileIcon from '../../assets/profileLight.svg';
import darkProfileIcon from '../../assets/profile.svg';
import PostIcon from '../../assets/postLight.svg';
import darkPostIcon from '../../assets/post.svg';
import SearchIcon from '../../assets/searchLight.svg';
import darkSearchIcon from '../../assets/search.svg';
import messages from '../../assets/messagesLight.svg';
import darkMessages from '../../assets/messages.svg';
import buddioLogo from '../../assets/buddio-logo.jpg';
import withoutChat from '../../assets/withoutChatImage2.jpeg';
import invertWithoutChat from '../../assets/invertWithoutChatImage2.jpg';
import search from '../../assets/searchLight.svg';
import darkSearch from '../../assets/search.svg';
import { Chat } from '../chat';
import { SwitchS } from '../../components';

interface Props {
    switchTheme?: any;
}

interface TokenPayload {
    id: string;
}

export const Conversations: React.FC<Props> = ({ switchTheme }) => {
    const [searchResults, setSearchResults] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState<string>();
    const [searchedChat, setSearchedChat] = useState<boolean>(false);
    interface Conversation {
        _id: string;
        participants: { _id: string; profileImage: string; username: string }[];
        lastMessage: { text: string; timestamp: string };
    }
    
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [otherPeopleId, setOtherPeopleId] = useState<string>('');
    const [myId, setMyId] = useState<string>('');
    const [activeConversation, setActiveConversation] = useState<any>(null);
    const token = localStorage.getItem('accessToken');
    const [darkTheme, setDarkTheme] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('darkTheme');
        return savedTheme === 'dark';
    });

    useEffect(() => {
        if (token) {
            const decode = jwtDecode<TokenPayload>(token);
            setMyId(decode.id);
        }
    }, [token]);

    useEffect(() => {
        localStorage.setItem('darkTheme', darkTheme ? 'dark' : 'light');
    }, [darkTheme]);

    const createConversation = async (otherPeopleId: string) => {
        const objectTransform = (originalObject: any) => {
            const { conversationId, participants, ...restProps } =
                originalObject;

            const formatedConversation = {
                _id: conversationId,
                participants: participants.map((participantId: any) => ({
                    _id: participantId,
                })),
                ...restProps,
            };

            return formatedConversation;
        };
        try {
            const response = await api.post(
                `/conversations/${otherPeopleId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const conversation = response.data;
            const formatedConversation = objectTransform(conversation);
            console.log('Corpo da conversa: ', formatedConversation);

            if (activeConversation !== formatedConversation._id) {
                setActiveConversation(null);
                setTimeout(() => {
                    setActiveConversation(formatedConversation._id);
                    handleOtherPeopleId(formatedConversation);
                    fetchChat(formatedConversation._id);
                }, 0);
            }

            setActiveConversation(null);
            setTimeout(() => {
                setActiveConversation(formatedConversation._id);

                fetchChat(formatedConversation._id);
            }, 0);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const response = await api.get('/conversations', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setConversations(response.data);
            } catch (error) {
                return console.log(error);
            }
        };

        fetchConversations();
    }, []);

    const updateLastMessage = (conversationId: string, lastMessage: string) => {
        setConversations((prevConversations) => {
            const updatedConversations = prevConversations.map((conversation) => {
                if (conversation._id === conversationId) {
                    return {
                        ...conversation,
                        lastMessage: {
                            text: lastMessage,
                            timestamp: new Date().toISOString(),
                        },
                    };
                }
                return conversation;
            });
    
            // Reordena as conversas pela última mensagem
            return updatedConversations.sort((a, b) => {
                return (
                    new Date(b.lastMessage.timestamp).getTime() -
                    new Date(a.lastMessage.timestamp).getTime()
                );
            });
        });
    };

    const fetchChat = async (conversationId: String) => {
        try {
            await api.get(`/conversations/messages/${conversationId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleOtherPeopleId = (conversation: any) => {
        const otherParticipant = conversation.participants.find(
            (participant: any) => participant._id !== myId
        );
        if (otherParticipant) {
            setOtherPeopleId(otherParticipant._id);
            return otherParticipant._id;
        }
    };

    const searchFollows = async (e: any) => {
        const search = e.target.value;
        setSearchTerm(search);
        try {
            const response = await api.get(
                `/conversations/start-chat/${search}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSearchResults(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (activeConversation) {
            fetchChat(activeConversation);
        }
    }, [activeConversation]);

    return (
        <div className={`relative flex w-screen h-full`}>
            <div
                className={`hidden md:flex fixed w-28 h-full ${
                    darkTheme
                        ? 'bg-black border-[#505050]'
                        : 'bg-white border-[#EEEEEF]'
                } border-r-2  `}
            >
                <div className="absolute top-0 right-0 left-0 flex items-center justify-center  py-4">
                    <img src={buddioLogo} className="rounded-full size-16" />
                </div>
                <div className="flex flex-col h-full items-center justify-center  gap-9 w-full">
                    <Link to="/feed">
                        <div className="flex items-center gap-2 hover:relative hover:mr-4 transition-all hover:[filter:drop-shadow(3px_4px_3px_gray)]">
                            <span>
                                <img
                                    src={darkTheme ? darkFeedIcon : FeedIcon}
                                />
                            </span>
                        </div>
                    </Link>
                    <Link to="/conversations">
                        <div
                            className={`flex items-center gap-2 hover:mr-4 hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black`}
                        >
                            <span>
                                <img
                                    src={darkTheme ? darkMessages : messages}
                                />
                            </span>
                        </div>
                    </Link>
                    <Link to="/post" className="relative">
                        <div className="flex items-center hover:relative   gap-2 hover:mr-4   hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
                            <span>
                                <img
                                    src={darkTheme ? darkPostIcon : PostIcon}
                                    className="size-8"
                                />
                            </span>
                        </div>
                    </Link>
                    <Link to="/search">
                        <div className="flex items-center gap-2 hover:mr-4   hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
                            <span>
                                <img
                                    src={
                                        darkTheme ? darkSearchIcon : SearchIcon
                                    }
                                />
                            </span>
                        </div>
                    </Link>
                    <Link to={`/profile/${myId}`}>
                        <div className="flex items-center gap-2  hover:mr-4  hover:[filter:drop-shadow(3px_4px_3px_gray)] transition-all text-black">
                            <span>
                                <img
                                    src={
                                        darkTheme
                                            ? darkProfileIcon
                                            : ProfileIcon
                                    }
                                />
                            </span>
                        </div>
                    </Link>
                </div>
            </div>

            <div
                className={`flex md:ml-28  flex-col xl:w-1/5  w-full ${
                    darkTheme
                        ? 'bg-black border-[#505050]'
                        : 'bg-white  border-[#EEEEEF]'
                }  border-r-2`}
            >
                <div className="flex items-center justify-between h-20 pl-4 pr-4 font-montserrat">
                    <h1
                        className={`text-2xl font-bold ${
                            darkTheme ? ' text-white' : 'text-black'
                        }`}
                    >
                        Conversas
                    </h1>
                    <SwitchS
                        onClick={() => {
                            setDarkTheme(!darkTheme);
                            console.log(localStorage.getItem('darkTheme'));
                        }}
                        checked={darkTheme}
                        theme={switchTheme}
                    />
                </div>
                <div
                    className={`relative border-t-2  ${
                        darkTheme ? 'border-[#505050]' : 'border-[#EEEEEF]'
                    }  `}
                >
                    <div
                        className={`${
                            darkTheme
                                ? ' text-white border-[#505050]'
                                : 'text-black   border-[#e7eaeb] '
                        }  my-4 flex items-center justify-center h-12 border-2 mx-2 px-2 rounded-xl`}
                    >
                        <img
                            src={darkTheme ? darkSearch : search}
                            className="mr-2"
                        />

                        <input
                            type="text"
                            placeholder="Pesquisar"
                            onChange={searchFollows}
                            className={` ${
                                darkTheme
                                    ? ' text-white bg-black'
                                    : 'text-black bg-white  '
                            } w-full font-montserrat focus:outline-none`}
                        />
                    </div>
                    {searchResults && searchTerm && (
                        <div
                            className={` ${
                                darkTheme
                                    ? ' text-white bg-black border-[#505050]'
                                    : 'text-black bg-white'
                            } absolute ${
                                searchedChat ? 'hidden lg:block' : ''
                            } z-30 flex flex-col border py-4 rounded-lg p-2 inset-x-0 mx-4`}
                        >
                            <div
                                className={`${
                                    darkTheme
                                        ? ' text-white bg-black border border-[#505050] '
                                        : 'text-white bg-black'
                                } rounded-xl w-fit px-3 py-1 font-montserrat`}
                            >
                                All
                            </div>
                            <span className=" text-sm py-2 mt-1 font-montserrat">
                                People
                            </span>
                            {searchResults.length === 0 && (
                                <span className="text-sm text-center font-montserrat my-2">
                                    Nenhum resultado encontrado
                                </span>
                            )}
                            {searchResults.map((result: any) => (
                                <div
                                    key={result._id}
                                    className={`flex hover:mr-4  ${
                                        darkTheme
                                            ? 'hover:bg-black/90 hover:[filter:drop-shadow(3px_2px_4px_gray)]'
                                            : 'hover:bg-gray-100 hover:[filter:drop-shadow(3px_4px_3px_gray)]'
                                    } transition-all text-black py-2 px-2 w-full rounded-lg`}
                                    onClick={() => {
                                        createConversation(result._id);
                                        setSearchedChat(true);
                                    }}
                                >
                                    <img
                                        src={result.profileImage}
                                        className="size-12 rounded-full bg-blue-300"
                                    />
                                    <span
                                        className={` ${
                                            darkTheme
                                                ? ' text-white  '
                                                : 'text-black  '
                                        }  font-semibold ml-2`}
                                    >
                                        {result.username}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <span className="flex h-5 gap-2 ml-4 mb-1 ">
                    <Lottie animationData={allPeoplesAnimation} />
                    <p className="text-[#9b9da2] font-medium font-montserrat text-sm">
                        Todas as Mensagens
                    </p>
                </span>
                {conversations.map((conversation: any) => (
                    <div
                        key={conversation._id}
                        onClick={() => {
                            if (activeConversation !== conversation._id) {
                                setActiveConversation(null);
                                setTimeout(() => {
                                    setActiveConversation(conversation._id);
                                    handleOtherPeopleId(conversation);
                                    fetchChat(conversation._id);
                                }, 0);
                            }
                        }}
                        className={`flex border-b-2 py-2 mx-4 h-20 lg:h-28 xl:h-20  ${
                            darkTheme
                                ? 'text-white border-[#505050]'
                                : 'text-black border-[#e7eaeb]'
                        }`}
                    >
                        <div className="flex items-center justify-center ml-2 w-12 mr-2 lg:w-20 lg:h-20 xl:w-12 xl:h-12">
                            <img
                                src={
                                    conversation.participants.find(
                                        (participant: any) =>
                                            participant._id !== myId
                                    ).profileImage
                                }
                                className="w-12 h-12 lg:w-20 lg:h-20 xl:w-12 xl:h-12 rounded-full"
                            />
                        </div>
                        <div className="flex flex-col pt-2 w-10/12 ">
                            <span className="font-montserrat font-medium lg:text-[24px] xl:text-base">
                                {
                                    conversation.participants.find(
                                        (participant: any) =>
                                            participant._id !== myId
                                    ).username
                                }
                            </span>
                            <div
                                className={`font-montserrat ${
                                    darkTheme ? 'text-white' : 'text-black'
                                } text-sm truncate lg:text-lg xl:text-sm w-full overflow-hidden`}
                            >
                                {conversation.lastMessage.text}
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-start mr-1">
                            <span className="font-semibold text-[#9b9da2] text-xs py-1">
                                {new Date(
                                    conversation.lastMessage.timestamp
                                ).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            {activeConversation ? (
                <div className=" absolute inset-0 xl:static flex items-center flex-grow max-h-screen">
                    <Chat
                        chatOtherPeopleId={otherPeopleId}
                        darkTheme={darkTheme}
                        updateLastMessage={updateLastMessage}
                    />
                </div>
            ) : (
                <div className="hidden xl:flex flex-grow h-screen ">
                    <img
                        src={darkTheme ? invertWithoutChat : withoutChat}
                        className="flex w-full max-h-full "
                    />
                </div>
            )}
        </div>
    );
};
