import React, { useState, useEffect } from "react";
import styled from "styled-components";
import HeaderComponent from "../../components/HeaderComponent";
import CustomerSideBar from "./CustomerSideBar";
import ChatContainer from "./ChatContainer";
import InformationContainer from "./InformationContainer";
import { useAuth } from "../../security/AuthContext";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    overflow: hidden;
`;

const InnerContainer = styled.div`
    display: flex;
    flex: 1;
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const MainContent = styled.div`
    flex: 1;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 10px;
    overflow-y: hidden;
`;

const SectionContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-y: auto;
`;

const VerticalDivider = styled.div`
    width: 1px;
    height: 100%;
    background-color: black;
`;

const MainContainer = () => {
    const authContext = useAuth();

    const [chatData, setChatData] = useState([]); // 초기 상태를 빈 배열로 설정
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [client, setClient] = useState(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await fetch('/api/chat-history', {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    }
                });
                const data = await response.json();

                if (Array.isArray(data)) {  // 데이터를 배열로 받았는지 확인
                    setChatData(data);
                } else {
                    console.error("Unexpected data format:", data);
                    setChatData([]); // 데이터가 배열이 아닐 경우 빈 배열로 설정
                }
            } catch (error) {
                console.error("Failed to fetch chat history:", error);
                setChatData([]); // 에러 발생 시 빈 배열로 설정
            }
        };

        fetchChatHistory();
    }, [authContext.isAuthenticated]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            debug: (str) => console.log(str),
            reconnectDelay: 5000,
            onConnect: () => {
                console.log('Connected');
                setClient(stompClient);
            },
            onDisconnect: () => {
                console.log('Disconnected');
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
        });

        stompClient.activate();

        return () => {
            if (stompClient) {
                stompClient.deactivate();
            }
        };
    }, []);

    const handleSelectChat = async (chat) => {
        setSelectedChat(chat);
        setMessages([]);

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`/api/chat-room/${chat.id}/messages`, {
                method: 'GET',
                headers: {
                    Authorization: token
                }
            });
            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error("Failed to fetch chat messages:", error);
        }
    };

    const handleNewChat = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('/api/new-chat', {
                method: 'POST',
                headers: {
                    Authorization: token
                }
            });

            const newChatRoom = await response.json();

            setChatData([...chatData, newChatRoom]);
            setSelectedChat(newChatRoom);

            try {
                const messageResponse = await fetch(`/api/chat-room/${newChatRoom.id}/messages`, {
                    method: 'GET',
                    headers: {
                        Authorization: token
                    }
                });
                const messageData = await messageResponse.json();
                setMessages(messageData);
            } catch (messageError) {
                console.error("Failed to fetch chat messages:", messageError);
            }

        } catch (error) {
            console.error("Failed to create new chat:", error);
        }
    };

    const handleTitleChange = async (chatRoomId, newTitle) => {
        if (client) {

            setChatData(prevChatData =>
                prevChatData.map(chat =>
                    chat.id === chatRoomId ? { ...chat, title: newTitle } : chat
                )
            );

            if (selectedChat && selectedChat.id === chatRoomId) {
                setSelectedChat({ ...selectedChat, title: newTitle });
            }
        }
    };

    return (
        <Container>
            <HeaderComponent />
            <InnerContainer>
                <CustomerSideBar
                    chatData={chatData}
                    setChatData={setChatData}
                    onSelectChat={handleSelectChat}
                    onNewChat={handleNewChat}
                    selectedChatId={selectedChat ? selectedChat.id : null}
                />
                <MainContent>
                    <SectionContainer>
                        {selectedChat ? (
                            <ChatContainer
                                chatRoom={selectedChat}
                                messages={messages}
                                onTitleChange={handleTitleChange}
                            />
                        ) : (
                            <div style={{display: "flex", height: "100%", width: "100%", alignItems: "center", justifyContent: "center"}}>
                                채팅 내역을 선택하거나, 새로운 채팅을 시작하세요.
                            </div>
                        )}
                    </SectionContainer>
                    <VerticalDivider />
                    <SectionContainer>
                        <InformationContainer />
                    </SectionContainer>
                </MainContent>
            </InnerContainer>
        </Container>
    );
};

export default MainContainer;
