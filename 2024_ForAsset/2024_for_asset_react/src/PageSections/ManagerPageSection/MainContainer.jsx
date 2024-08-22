import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideBarContainer from "../../components/SideBarContainer";
import UserProfile from "../../components/UserProfile";
import InformationContainer from "../ManagerPageSection/InformationContainer";
import ReportTemplate from "./ReportTemplate";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";
import logo from '../../images/logo.png';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    overflow: hidden;
`;

const Header = styled.div`
    display: flex;
    border-bottom: solid 1px #A5A5A5;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #FFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    box-sizing: border-box;
`;

const Logo = styled.img`
    height: 40px;
    margin-left: 20px;
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
    overflow-x: hidden;
`;

const VerticalDivider = styled.div`
    width: 1px;
    height: 100%;
    background-color: black;
`;

const MainContainer = () => {
    const [chatData, setChatData] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [reportData, setReportData] = useState(null);
    const [message, setMessage] = useState("");
    const [keyword, setKeyword] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [indexToRemove, setIndexToRemove] = useState(null);

    useEffect(() => {
        fetch('/api/chats')
            .then(response => response.json())
            .then(data => setChatData(Array.isArray(data) ? data : []))
            .catch(error => console.error('데이터 로드 중 오류:', error));
    }, []);

    const saveData = (data) => {
        fetch('/api/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.error('데이터 저장 중 오류:', error));
    };

    const handleSendMessage = () => {
        if (message.trim() === "") {
            alert("메시지를 입력하세요.");
            return;
        }

        setMessage("");

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
                saveData(updatedChatData);
            })
            .catch(error => {
                console.error('데이터 전송 중 오류:', error);
                const updatedChatData = [...chatData];
                updatedChatData[selectedIndex].messages.push({ text: "서버에서 답변을 가져오는 중 오류가 발생했습니다.", type: "bot" });
                setChatData(updatedChatData);
                saveData(updatedChatData);
            });
    };

    const handleTitleChange = (index, newTitle) => {
        const updatedChatData = [...chatData];
        updatedChatData[index] = {
            ...updatedChatData[index],
            title: newTitle,
        };
        setChatData(updatedChatData);
        saveData(updatedChatData);
    };

    const handleComplete = (fundName, period) => {
        if (!fundName || !period) {
            alert("펀드명과 운용 기간을 입력하세요.");
            return;
        }

        fetch(`http://localhost:8080/api/fund-report?fundName=${encodeURIComponent(fundName)}&operationPeriod=${encodeURIComponent(period)}`)
            .then(response => response.json())
            .then(data => setReportData(data))
            .catch(error => console.error('리포트 데이터 로드 중 오류:', error));
    };

    const handleItemClick = (index) => {
        setSelectedIndex(index);
        setMessage("");
        const selectedChat = chatData[index];
        setReportData(null);
        if (selectedChat.fundName && selectedChat.period) {
            fetch(`/api/fund-report?fundName=${encodeURIComponent(selectedChat.fundName)}&operationPeriod=${encodeURIComponent(selectedChat.period)}`)
                .then(response => response.json())
                .then(data => setReportData(data))
                .catch(error => console.error('리포트 데이터 로드 중 오류:', error));
        }
    };

    const handleNewChatClick = () => {
        const newChat = {
            title: "New Report",
            fundName: "",
            period: "",
            messages: [],
            bookmarked: false,
        };
        const updatedChatData = [newChat, ...chatData];
        setChatData(updatedChatData);
        setSelectedIndex(0);
        saveData(updatedChatData);
    };

    const handleRemoveChat = (index) => {
        const updatedChatData = chatData.filter((_, i) => i !== index);
        setChatData(updatedChatData);
        if (selectedIndex === index) {
            setSelectedIndex(null);
        } else if (selectedIndex > index) {
            setSelectedIndex(selectedIndex - 1);
        }
        saveData(updatedChatData);
    };

    const handleBookmarkToggle = (index) => {
        const updatedChatData = [...chatData];
        updatedChatData[index] = {
            ...updatedChatData[index],
            bookmarked: !updatedChatData[index].bookmarked,
        };
        setChatData(updatedChatData);
        saveData(updatedChatData);
    };

    const showDeleteModal = (index) => {
        setIndexToRemove(index);
        setShowModal(true);
    };

    const confirmRemove = () => {
        handleRemoveChat(indexToRemove);
        setShowModal(false);
        setIndexToRemove(null);
    };

    const cancelRemove = () => {
        setShowModal(false);
        setIndexToRemove(null);
    };

    return (
        <Container>
            <Header>
                <Logo src={logo} alt="Logo" />
                <HeaderRight>
                    <UserProfile />
                    <Button>로그아웃</Button>
                    <Button>도움말</Button>
                </HeaderRight>
            </Header>
            <InnerContainer>
                <SideBarContainer
                    mainTitle={"ForAssetManager"}
                    ButtonBackGroundColor={"#4A4A4A"}
                    chatData={chatData}
                    onNewChatClick={handleNewChatClick}
                    onItemClick={handleItemClick}
                    onRemoveChat={showDeleteModal}
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
                                    saveData(updatedChatData);
                                }}
                                period={chatData[selectedIndex].period}
                                setPeriod={(newPeriod) => {
                                    const updatedChatData = [...chatData];
                                    updatedChatData[selectedIndex].period = newPeriod;
                                    setChatData(updatedChatData);
                                    saveData(updatedChatData);
                                }}
                                keyword={keyword}
                                setKeyword={setKeyword}
                                onComplete={handleComplete}
                            />
                        )}
                    </SectionContainer>
                    <VerticalDivider />
                    <SectionContainer>
                        {selectedIndex !== null && chatData[selectedIndex] && reportData && (
                            <ReportTemplate
                                data={reportData}
                                templateId={selectedIndex + 1}
                            />
                        )}
                    </SectionContainer>
                </MainContent>
            </InnerContainer>
            {showModal && (
                <DeleteConfirmationModal
                    onConfirm={confirmRemove}
                    onCancel={cancelRemove}
                />
            )}
        </Container>
    );
};

export default MainContainer;
