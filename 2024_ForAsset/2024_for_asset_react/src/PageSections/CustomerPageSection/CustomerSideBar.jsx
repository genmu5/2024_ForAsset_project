import React, { useState } from "react";
import styled from "styled-components";
import more_icon from "../../images/more_icon.png";
import CustomerDeleteConfirmationModal from "./CustomerDeleteConfirmationModal";  // 모달 컴포넌트 임포트

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    background-color: #F9FAFF;
    padding: 20px;
`;

const ChatList = styled.ul`
    list-style: none;
    padding: 0;
    margin-top: 20px;
    overflow-y: auto;
`;

const ChatListContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    position: relative;
`;

const ChatItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    width: 100%;
    cursor: pointer;
    background-color: ${props => props.isSelected ? '#f0f0f0' : '#ffffff'};
    &:hover {
        background-color: #e0e0e0;
    }
`;

const Menu = styled.div`
    display: ${props => (props.show ? "block" : "none")};
    position: absolute;
    top: 40px;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
`;

const MenuItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background: #eee;
    }
`;

const SearchInput = styled.input`
    width: 95%;
    justify-content: center;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 8px;
    font-size: 16px;
`;

const NewChatButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 45px;
    //background-color: #4A4A4A;
    background-color: rgba(83, 113, 248, 0.5);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    &:hover {
        transform: scale(1.01); 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    }
`;

const Icon = styled.img`
    width: 23px;
    height: 23px;
    cursor: pointer;
    &:hover {
        transform: scale(1.01); 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    }
`;

const MoreIcon = styled(Icon)`
    margin-left: auto;
`;

const CustomerSideBar = ({ chatData, onSelectChat, onNewChat, selectedChatId, setChatData }) => {
    const [menuOpenIndex, setMenuOpenIndex] = useState(null);
    const [showModal, setShowModal] = useState(false); // 모달 창 표시 여부 상태
    const [chatToDelete, setChatToDelete] = useState(null); // 삭제할 채팅 저장
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태 추가

    const toggleMenu = (e, index) => {
        e.stopPropagation();
        setMenuOpenIndex(index === menuOpenIndex ? null : index);
    };

    const handleDelete = (chatId) => {
        setChatToDelete(chatId); // 삭제할 채팅 설정
        setShowModal(true); // 모달 창 표시
        setMenuOpenIndex(null); // 메뉴 닫기
    };

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem('token'); // 토큰 가져오기
        try {
            const response = await fetch(`/api/chat-room/${chatToDelete}`, {
                method: 'DELETE',
                headers: {
                    Authorization: token,
                },
            });

            if (response.ok) {
                console.log(`Chat with ID ${chatToDelete} deleted successfully.`);
                setChatData(chatData.filter(chat => chat.id !== chatToDelete)); // 삭제된 항목을 로컬 상태에서 제거
            } else {
                console.error("Failed to delete chat");
            }
        } catch (error) {
            console.error("Error deleting chat:", error);
        }

        setShowModal(false); // 모달 창 닫기
    };

    const handleCancelDelete = () => {
        setShowModal(false); // 모달 창 닫기
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value); // 검색어 상태 업데이트
    };

    const filteredChats = chatData.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase()) // 검색어로 필터링
    );

    return (
        <Container>
            <div>
                <SearchInput
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange} // 검색어 입력 핸들러 추가
                />
                <NewChatButton onClick={onNewChat}>
                    <p style={{fontSize: 18, textAlign: "left", color: "#fff"}}>+ New Chat</p>
                </NewChatButton>
            </div>
            <ChatList>
                {filteredChats.map((chat, index) => (
                    <ChatListContainer key={chat.id}>
                        <ChatItem
                            onClick={() => onSelectChat(chat)}
                            isSelected={selectedChatId === chat.id}
                        >
                            {chat.title}
                            <MoreIcon
                                onClick={(e) => toggleMenu(e, index)}
                                src={more_icon}
                                alt={"more_icon"}
                            />
                        </ChatItem>
                        {menuOpenIndex === index && (
                            <Menu show={true}>
                                <MenuItem onClick={() => handleDelete(chat.id)}>내역 삭제</MenuItem>
                            </Menu>
                        )}
                    </ChatListContainer>
                ))}
            </ChatList>
            {showModal && (
                <CustomerDeleteConfirmationModal
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </Container>
    );
};

export default CustomerSideBar;
