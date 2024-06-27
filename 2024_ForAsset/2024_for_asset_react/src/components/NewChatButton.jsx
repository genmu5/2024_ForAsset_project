import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 100%;
    height: 50px;
    cursor: pointer; // 마우스 커서를 포인터로 변경
    //    transition: transform 0.2s, box-shadow 0.2s;
    &:hover {
        transform: scale(1.005); // 스케일 - 마우스 커서가 닿았을 때 버튼 크기 조절
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 버튼 그림자
    }
`;

const NewChatButton = ({ButtonBackGroundColor, onClick }) => { //'+ New Chat' 버튼
    return(
        <Container
            style={{backgroundColor: ButtonBackGroundColor}}
            onClick={onClick}>
            <p style={{ fontSize: 18, textAlign: "left", color: "#fff" }}> + New Chat</p>
        </Container>
    );
}

export default NewChatButton;