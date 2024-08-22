import React from "react";
import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";
import WebSocketChat from "./WebSocketChat";

const Container = styled.div`
    display: flex;
    height: 100%;
`;

const ChatContainer = () => {
    const email = "asd";
    const chatRoomId = 2;

    return (
        <Container>
            {/*<TitleComponent title={"Chat"} />*/}
            <WebSocketChat email={email} chatRoomId={chatRoomId} />
        </Container>
    );
};

export default ChatContainer;
