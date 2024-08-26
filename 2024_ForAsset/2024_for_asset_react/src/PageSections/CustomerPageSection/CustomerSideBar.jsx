import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    overflow-y: auto;
`;

const ChatList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ChatItem = styled.li`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    background-color: ${props => props.isSelected ? '#f0f0f0' : '#ffffff'};
    &:hover {
        background-color: #e0e0e0;
    }
`;

const NewChatButton = styled.button`
    margin-top: 10px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background-color: #45a049;
    }
`;

const CustomerSideBar = ({ chatData, onSelectChat, onNewChat, selectedChatId }) => {
    return (
        <Container>
            <ChatList>
                {chatData.map((chat) => (
                    <ChatItem
                        key={chat.id}
                        onClick={() => onSelectChat(chat)}
                        isSelected={selectedChatId === chat.id}
                    >
                        {chat.title}
                    </ChatItem>
                ))}
            </ChatList>
            <NewChatButton onClick={onNewChat}>New Chat</NewChatButton>
        </Container>
    );
};

export default CustomerSideBar;