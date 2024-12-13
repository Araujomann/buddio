import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import send from '../../assets/send.svg';
import back from '../../assets/back.svg';

interface Message {
    senderId: string;
    message: string;
    timestamp: string;
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

export const Chat: React.FC = () => {
    const { receiverId } = useParams<{ receiverId: string }>();
    const [newMessage, setNewMessage] = useState<string>('');
    const [chatMessages, setChatMessages] = useState<Message[]>([]);
    const [myId, setMyId] = useState<string>('');
    const [conversationId, setConversationId] = useState<string>('');
    const [user, setUser] = useState<User>();
    const [socket, setSocket] = useState<Socket | null>(null);

    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode<TokenPayload>(token);
            const loggedUserId = decodedToken.id;

            setMyId(loggedUserId);
        }
    }, []);

    console.log('receiverId: ', receiverId);
    console.log('myId: ', myId);

    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            query: { token },
            transports: ['websocket'] 
        },
    );
        setSocket(newSocket);

        newSocket.on('receiveMessage', (message: Message) => {
            setChatMessages((prevMessages) => [...prevMessages, message]);
        });
        return () => {
            newSocket.disconnect();
        };
    }, [token, receiverId]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const conversationResponse = await axios.post(
                    `http://localhost:5000/conversations/${receiverId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                    
                );

                console.log('conversationReponse: ', conversationResponse);
                const { conversationId } = conversationResponse.data;
                setConversationId(conversationId);


                const fetchMessages = await axios.get(
                    `http://localhost:5000/conversations/messages/${conversationId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log('fetchMessages: ', fetchMessages);
                setChatMessages(fetchMessages.data);
            } catch (error: any) {
                console.error('Erro ao buscar mensagens: ', error);
            }
        }

        const fetchUser = async () => {
            try {
                const user = await axios.get(
                    `http://localhost:5000/profile/${receiverId}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setUser(user.data.user);
            } catch (error: any) {
                console.error('Erro ao buscar usuário: ', error);
            }
        };
        fetchUser();
        fetchMessages();
    }, [receiverId, token]);

    const handleBack = () => {
        window.history.back();
    };
    const handleSendMessage = () => {
        if (socket && newMessage.trim() !== '') {
            const messageToSend = {
                conversationId, 
                senderId: myId,
                receiverId,
                message: newMessage,
                timestamp: new Date().toISOString(),
            };
            socket.emit('sendMessage', messageToSend);

            console.log('messageToSend: ', messageToSend);

            setChatMessages((prevMessages) => [
                ...prevMessages,
                { ...messageToSend },
            ]);
            setNewMessage('');
        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    }

    return (
        <div className="flex flex-col h-screen w-screen bg-[#F1F0F3]">
            {/* Header */}
            <div className="flex items-center justify-start py-4 border-b bg-gray-100/25 shadow-lg rounded-lg border border-white/20 backdrop-blur-md">
                <span className="flex h-full" onClick={handleBack}>
                    <img src={back} />
                </span>
                <div className="flex items-center h-fit ">
                    <img
                        src={user?.profileImage}
                        className="size-12 rounded-2xl"
                    />
                </div>
                <div className="flex flex-col text-black font-montserrat font-semibold px-2">
                    <p>{user?.username}</p>

                    <p className="text-[#16a340] text-xs font-bold font-montserrat">
                        {user?.bio}Online
                    </p>
                </div>
            </div>

            {/* Mensagens */}

            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
                {chatMessages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            msg.senderId === myId
                                ? 'justify-end'
                                : 'justify-start'
                        }`}
                    >
                        <div
                            className={`max-w-xs px-4 py-2 rounded-lg shadow ${
                                msg.senderId === 'userId'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 text-black'
                            }`}
                        >
                            <p>{msg.message}</p>
                            <span className="text-xs text-gray-500">
                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input de mensagem */}
            <div className="flex items-center border-t bg-white mx-4 my-6 rounded-lg">
                <input
                    type="text"
                    value={newMessage}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type message..."
                    className="flex-1 px-4 py-2  flex-grow border text-black bg-white border-none rounded-l-lg focus:outline-none cd ."
                />
                <button
                    onClick={handleSendMessage}
                    className="bg-white w-fit h-fit py-2 px-3 rounded-lg"
                >
                    <img src={send} className="" />
                </button>
            </div>
        </div>
    );
};
