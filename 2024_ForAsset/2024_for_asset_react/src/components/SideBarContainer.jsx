import React, { useState } from "react";
import styled from "styled-components";
import TitleComponent from "./TitleComponent";
import NewChatButton from "./NewChatButton";
import SideBarListContainer from "./SideBarListContainer";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px; /* Adjusted width */
    height: 100%;
    background-color: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
`;

const FixedHeader = styled.div`
    flex-shrink: 0;
`;

const ContentContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto; /* Scrollable content */
    margin-top: 20px;
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 8px;
    font-size: 16px;
`;

const SideBarContainer = ({ mainTitle, ButtonBackGroundColor }) => {
    const [contents, setContents] = useState([
        { title: "Create Html Game Environment for Website", date: "2024.07.14" },
        { title: "Project Meeting Notes", date: "2024.07.14" },
        { title: "Client Feedback", date: "2024.07.14" },
        { title: "Weekly Report", date: "2024.07.14" },
        { title: "Budget Plan", date: "2024.07.14" },
    ]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [indexToRemove, setIndexToRemove] = useState(null);
    const [menuOpenIndex, setMenuOpenIndex] = useState(null); // 현재 열린 메뉴의 인덱스
    const [searchQuery, setSearchQuery] = useState("");

    const handleNewChatClick = () => {
        const newContents = [{ title: "New Report", date: new Date().toISOString().split('T')[0] }, ...contents]; // 새로운 항목을 맨 앞에 추가
        setContents(newContents);
        setSelectedIndex(0); // 새로 추가된 항목을 선택된 상태로 설정
    };

    const handleItemClick = (index) => {
        setSelectedIndex(index);
    };

    const handleItemRemove = (index) => {
        setShowModal(true);
        setIndexToRemove(index);
    };

    const confirmRemove = () => {
        const newContents = contents.filter((_, i) => i !== indexToRemove);
        setContents(newContents);
        setShowModal(false);
        setIndexToRemove(null);
        if (selectedIndex === indexToRemove) {
            setSelectedIndex(null);
        } else if (selectedIndex > indexToRemove) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    const cancelRemove = () => {
        setShowModal(false);
        setIndexToRemove(null);
    };

    const toggleMenu = (index) => {
        setMenuOpenIndex(index);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredContents = contents.filter(content =>
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.date.includes(searchQuery)
    );

    return (
        <Container onClick={(e) => e.stopPropagation()}>
            <FixedHeader>
                <TitleComponent mainTitle={mainTitle} />
                <SearchInput
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </FixedHeader>
            <FixedHeader>
                <NewChatButton ButtonBackGroundColor={ButtonBackGroundColor} onClick={handleNewChatClick} />
            </FixedHeader>
            <ContentContainer>
                <SideBarListContainer
                    contents={filteredContents}
                    selectedIndex={selectedIndex}
                    menuOpenIndex={menuOpenIndex}
                    onItemClick={handleItemClick}
                    onItemRemove={handleItemRemove}
                    onToggleMenu={toggleMenu}
                />
                {showModal && (
                    <DeleteConfirmationModal
                        onConfirm={confirmRemove}
                        onCancel={cancelRemove}
                    />
                )}
            </ContentContainer>
        </Container>
    );
}

export default SideBarContainer;