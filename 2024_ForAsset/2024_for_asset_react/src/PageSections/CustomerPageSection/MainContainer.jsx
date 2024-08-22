import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SideBarContainer from "../../components/SideBarContainer";
import UserProfile from "../../components/UserProfile";
import logo from '../../images/logo.png';
import InformationContainer from "./InformationContainer";
import ChatContainer from "./ChatContainer";
import DeleteConfirmationModal from "../../components/DeleteConfirmationModal";

const Container = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    overflow: hidden; /* 스크롤 방지 */
`;

const Header = styled.div`
    display: flex;
    border-bottom: solid 1px #A5A5A5;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #FFF;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.img`
    height: 40px;
    margin-left: 20px; /* 로고를 오른쪽으로 이동하기 위한 여백 */
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
    flex: 1;
    width: 100%;
    //height: calc(100vh - 70px);
    //height: 100%;
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
    //position: relative;
`;

const SectionContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #F5F5F5;
    overflow-y: auto; /* 수직 스크롤 활성화 */
    overflow-x: hidden; /* 수평 스크롤 비활성화 */
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
    const [keyword, setKeyword] = useState(""); // 키워드 상태 추가
    const [showModal, setShowModal] = useState(false);
    const [indexToRemove, setIndexToRemove] = useState(null);

    useEffect(() => {
        // 초기 데이터를 JSON 파일에서 로드
        fetch('/api/chats')
            .then(response => response.json())
            .then(data => setChatData(Array.isArray(data) ? data : []))
            .catch(error => console.error('데이터 로드 중 오류:', error));
    }, []);

    const saveData = (data) => {
        // 데이터를 서버에 있는 JSON 파일로 저장
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
            report: ""
        };
        const updatedChatData = [newChat, ...chatData];
        setChatData(updatedChatData);
        setSelectedIndex(0);
        saveData(updatedChatData);
    };

    const handleRemoveChat = (index) => {
        const updatedChatData = chatData.filter((_, i) => i !== index);
        setChatData(updatedChatData);
        setSelectedIndex(null);
        saveData(updatedChatData);
    };

    const handleBookmarkToggle = (index) => {
        const updatedChatData = [...chatData];
        updatedChatData[index].bookmarked = !updatedChatData[index].bookmarked;
        setChatData(updatedChatData);
        saveData(updatedChatData);
    };

    const showDeleteModal = (index) => {
        setIndexToRemove(index);
        setShowModal(true);
        document.addEventListener('click', handleOutsideClick, true);
    };

    const confirmRemove = () => {
        handleRemoveChat(indexToRemove);
        setShowModal(false);
        setIndexToRemove(null);
        document.removeEventListener('click', handleOutsideClick, true);
    };

    const cancelRemove = () => {
        setShowModal(false);
        setIndexToRemove(null);
        document.removeEventListener('click', handleOutsideClick, true);
    };

    const handleOutsideClick = (event) => {
        if (showModal && !event.target.closest('.modal-content')) {
            cancelRemove();
        }
    };

    return (
        <Container onClick={() => {
            if (showModal) {
                cancelRemove();
            }
        }}>
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
                        <ChatContainer/>
                    </SectionContainer>
                    <VerticalDivider />
                    <SectionContainer>
                        <InformationContainer/>
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
