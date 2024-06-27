import React from "react";
import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: white;
    border-radius: 26px;
`;

const ChatContainer = () => {
    return(
        <Container>
            <TitleComponent title={"Chat"}/>
        </Container>
    );
}

export default ChatContainer;