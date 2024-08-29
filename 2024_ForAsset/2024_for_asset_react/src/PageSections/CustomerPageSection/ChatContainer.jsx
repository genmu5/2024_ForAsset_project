import React, { useState, useEffect} from "react";
import styled from "styled-components";
import WebSocketChat from "./WebSocketChat";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-right: 10px;
    background-color: #F9FAFF;
`;

const TitleInput = styled.input`
    height: 24px;
    font-size: 18px;
    padding: 5px;
    margin: 20px 0 10px 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    text-align: center;
    &:focus {
        outline: none;
    }
`;

const ChatContainer = ({ chatRoom, messages, onTitleChange }) => {
    const [title, setTitle] = useState(chatRoom.title);

    useEffect(() => {
        setTitle(chatRoom.title);
    }, [chatRoom]);

    const handleTitleBlur = () => {
        if (title !== chatRoom.title) {
            onTitleChange(chatRoom.id, title);
        }
    };

    return (
        <Container>
            <TitleInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handleTitleBlur}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleTitleBlur();
                    }
                }}
            />
            <WebSocketChat email={chatRoom.sender} chatRoomId={chatRoom.id} initialMessages={messages} />
        </Container>
    );
};

export default ChatContainer;
