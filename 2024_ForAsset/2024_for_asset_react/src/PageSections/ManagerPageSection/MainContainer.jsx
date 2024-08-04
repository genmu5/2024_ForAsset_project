import React, { useState, useEffect } from "react";
import styled from "styled-components";
import fs from 'fs';
import SideBarContainer from "../../components/SideBarContainer";
import UserProfile from "../../components/UserProfile";
import InformationContainer from "../ManagerPageSection/InformationContainer";
import ReportContainer from "../ManagerPageSection/ReportContainer";
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

const MainContent = styled.div`
    flex: 1;
    display: flex;
    background-color: #FFFFFF;
    border-radius: 10px;
    overflow-y: hidden;
    position: relative;
`;

const SectionContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden; /* Prevent horizontal scrolling */
`;

const VerticalDivider = styled.div`
    width: 1px;
    height: 100%;
    background-color: black;
`;

const MainContainer = () => {
    const [chatData, setChatData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [report, setReport] = useState("");
    const [message, setMessage] = useState("");

    const dataFilePath = './data/chatData.json';

    useEffect(() => {
        // Load initial data from JSON file
        if (fs.existsSync(dataFilePath)) {
            const data = fs.readFileSync(dataFilePath);
            setChatData(JSON.parse(data));
        }
    }, []);

    const saveData = () => {
        // Save data to JSON file
        fs.writeFileSync(dataFilePath, JSON.stringify(chatData, null, 2));
    };

    const handleSendMessage = () => {
        if (message.trim() === "") {
            alert("메시지를 입력하세요.");
            return;
        }

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
                const updatedChatData = [...chatData];
                updatedChatData[selectedIndex].messages.push({ text: message, type: "user" });
                updatedChatData[selectedIndex].messages.push({ text: data, type: "bot" });
                setChatData(updatedChatData);
                setReport(data); // Assume the report is the response for simplicity
                saveData();
            })
            .catch(error => {
                console.error('Error submitting data:', error);
                const updatedChatData = [...chatData];
                updatedChatData[selectedIndex].messages.push({ text: "서버에서 답변을 가져오는 중 오류가 발생했습니다.", type: "bot" });
                setChatData(updatedChatData);
                saveData();
            });
    };

    const handleTitleChange = (index, newTitle) => {
        const updatedChatData = [...chatData];
        updatedChatData[index].title = newTitle;
        setChatData(updatedChatData);
        saveData();
    };

    const handleComplete = () => {
        const updatedChatData = [...chatData];
        const currentChat = updatedChatData[selectedIndex];
        currentChat.report = `
        Title: ${currentChat.title}
        Fund Name: ${currentChat.fundName}
        Period: ${currentChat.period}
        `;
        setChatData(updatedChatData);
        setReport(currentChat.report);
        saveData();
    };

    const handleItemClick = (index) => {
        setSelectedIndex(index);
        setMessage("");
        const selectedChat = chatData[index];
        setReport(selectedChat.report || "");
    };

    const handleNewChatClick = () => {
        const newChat = {
            title: "New Report",
            fundName: "",
            period: "",
            messages: [],
            report: ""
        };
        const updatedChatData = [newChat, ...chatData];
        setChatData(updatedChatData);
        setSelectedIndex(0);
        saveData();
    };

    const handleRemoveChat = (index) => {
        const updatedChatData = chatData.filter((_, i) => i !== index);
        setChatData(updatedChatData);
        setSelectedIndex(null);
        saveData();
    };

    const handleBookmarkToggle = (index) => {
        const updatedChatData = [...chatData];
        updatedChatData[index].bookmarked = !updatedChatData[index].bookmarked;
        setChatData(updatedChatData);
        saveData();
    };

    return (
        <Container>
            <Header>
                <Logo src={logo} alt="Logo" />
                <HeaderRight>
                    <UserProfile />
                    <Button onClick={saveData}>Save</Button>
                    <Button>Log out</Button>
                    <Button>Help</Button>
                </HeaderRight>
            </Header>
            <InnerContainer>
                <SideBarContainer
                    mainTitle={"ForAssetManager"}
                    ButtonBackGroundColor={"#4A4A4A"}
                    chatData={chatData}
                    onNewChatClick={handleNewChatClick}
                    onItemClick={handleItemClick}
                    onRemoveChat={handleRemoveChat}
                    onBookmarkToggle={handleBookmarkToggle}
                    selectedIndex={selectedIndex}
                />
                <MainContent>
                    <SectionContainer>
                        {selectedIndex !== null && chatData[selectedIndex] && (
                            <InformationContainer
                                onSendMessage={handleSendMessage}
                                message={message}
                                setMessage={setMessage}
                                title={chatData[selectedIndex].title}
                                onTitleChange={(newTitle) => handleTitleChange(selectedIndex, newTitle)}
                                fundName={chatData[selectedIndex].fundName}
                                setFundName={(newFundName) => {
                                    const updatedChatData = [...chatData];
                                    updatedChatData[selectedIndex].fundName = newFundName;
                                    setChatData(updatedChatData);
                                    saveData();
                                }}
                                period={chatData[selectedIndex].period}
                                setPeriod={(newPeriod) => {
                                    const updatedChatData = [...chatData];
                                    updatedChatData[selectedIndex].period = newPeriod;
                                    setChatData(updatedChatData);
                                    saveData();
                                }}
                                onComplete={handleComplete}
                            />
                        )}
                    </SectionContainer>
                    <VerticalDivider />
                    <SectionContainer>
                        <ReportContainer answer={report} />
                    </SectionContainer>
                </MainContent>
            </InnerContainer>
        </Container>
    );
}

export default MainContainer;
