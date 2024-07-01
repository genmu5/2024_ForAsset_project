import React from "react";
import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";
import WebSocketChat from "./WebSocketChat";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    border-radius: 26px;
`;

const ChatContainer = () => {
    const email = "testemail";
    const chatRoomId = 1;

    return (
        <Container>
            <TitleComponent title={"Chat"} />
            <WebSocketChat email={email} chatRoomId={chatRoomId} />
        </Container>
    );
};

export default ChatContainer;
