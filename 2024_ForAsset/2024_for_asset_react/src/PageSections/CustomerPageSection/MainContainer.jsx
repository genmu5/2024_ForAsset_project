import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import HeaderComponent from "../../components/HeaderComponent";
import CustomerSideBar from "./CustomerSideBar";
import ChatContainer from "./ChatContainer";
import InformationContainer from "./InformationContainer";
import { useAuth } from "../../security/AuthContext";

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
    background-color: #F5F5F5;
    overflow-y: auto;
    overflow-x: hidden;
`;

const VerticalDivider = styled.div`
    width: 1px;
    height: 100%;
    background-color: black;
`;

const MainContainer = () => {
    const authContext = useAuth();

    const [chatData, setChatData] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchChatHistory = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get('/api/chat-history', {
                    headers: {
                        Authorization: token
                    }
                });
                setChatData(response.data);
            } catch (error) {
                console.error("Failed to fetch chat history:", error);
            }
        };

        fetchChatHistory();
    }, [authContext.isAuthenticated]);

    const handleSelectChat = async (chat) => {
        setSelectedChat(chat);

        // 먼저 메시지를 초기화합니다.
        setMessages([]);

        const token = localStorage.getItem("token");

        try {
            const response = await axios.get(`/api/chat-room/${chat.id}/messages`, {
                headers: {
                    Authorization: token
                }
            });
            setMessages(response.data);
        } catch (error) {
            console.error("Failed to fetch chat messages:", error);
        }
    };

    const handleNewChat = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.post('/api/new-chat', {}, {
                headers: {
                    Authorization: token
                }
            });
            setChatData([...chatData, response.data]);
        } catch (error) {
            console.error("Failed to create new chat:", error);
        }
    };

    return (
        <Container>
            <HeaderComponent />
            <InnerContainer>
                <CustomerSideBar
                    chatData={chatData}
                    onSelectChat={handleSelectChat}
                    onNewChat={handleNewChat}
                    selectedChatId={selectedChat ? selectedChat.id : null}
                />
                <MainContent>
                    <SectionContainer>
                        {selectedChat ? (
                            <ChatContainer chatRoom={selectedChat} messages={messages} />
                        ) : (
                            <div>Select a chat to view messages</div>
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
