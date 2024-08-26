import React from "react";
import styled from "styled-components";
import WebSocketChat from "./WebSocketChat";

const Container = styled.div`
    display: flex;
    height: 100%;
`;

const ChatContainer = ({ chatRoom, messages }) => {
    return (
        <Container>
            <WebSocketChat email={chatRoom.sender} chatRoomId={chatRoom.id} initialMessages={messages} />
        </Container>
    );
};

export default ChatContainer;