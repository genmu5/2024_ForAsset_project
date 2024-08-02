import React, { useState } from "react";
import styled from "styled-components";
import SideBarContainer from "../../components/SideBarContainer";
import UserProfile from "../../components/UserProfile";
import logo from '../../images/logo.png'; // Import the logo image

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    overflow: hidden; /* Prevent scrolling */
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #FFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%; /* Full width */
    box-sizing: border-box; /* Include padding in width calculation */
`;

const Logo = styled.img`
    height: 40px;
    margin-left: 20px; /* Add margin to move the logo to the right */
`;

const HeaderRight = styled.div`
    display: flex;
    align-items: center;
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-left: 10px;
`;

const InnerContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 70px);
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

const ChatSection = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    border-radius: 10px;
    overflow-y: hidden;
    position: relative;
`;

const ChatContent = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
`;

const ChatMessage = styled.div`
    margin-bottom: 20px;
    padding: 10px;
    background-color: #FFF;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    background-color: #FFF;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 0;
    width: 100%; /* Full width */
    box-sizing: border-box; /* Include padding in width calculation */
`;

const ChatInput = styled.input`
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: 16px;
`;

const SendButton = styled.button`
    background-color: #4A4A4A;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #333;
    }
`;

const MainContainer = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim() === "") {
            alert("메시지를 입력하세요.");
            return;
        }

        setMessages([...messages, { text: message, type: "user" }]);
        setMessage("");

        // 서버로 메시지 보내기
        fetch(`http://localhost:8080/chat?message=${encodeURIComponent(message)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/plain'
            }
        })
            .then(response => response.text())
            .then(data => {
                setMessages((prevMessages) => [...prevMessages, { text: data, type: "bot" }]);
            })
            .catch(error => {
                console.error('Error submitting data:', error);
                setMessages((prevMessages) => [...prevMessages, { text: "서버에서 답변을 가져오는 중 오류가 발생했습니다.", type: "bot" }]);
            });
    };

    return (
        <Container>
            <Header>
                <Logo src={logo} alt="Logo" />
                <HeaderRight>
                    <UserProfile />
                    <Button>Log out</Button>
                    <Button>Help</Button>
                </HeaderRight>
            </Header>
            <InnerContainer>
                <SideBarContainer mainTitle={"ForAssetManager"} ButtonBackGroundColor={"#4A4A4A"} />
                <ChatSection>
                    <ChatContent>
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} style={{ alignSelf: msg.type === "user" ? "flex-end" : "flex-start" }}>
                                {msg.text}
                            </ChatMessage>
                        ))}
                    </ChatContent>
                    <Footer>
                        <ChatInput
                            type="text"
                            placeholder="What's in your mind?..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <SendButton onClick={handleSendMessage}>Send</SendButton>
                    </Footer>
                </ChatSection>
            </InnerContainer>
        </Container>
    );
}

export default MainContainer;
