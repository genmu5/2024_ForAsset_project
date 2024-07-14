import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TitleComponent from "./TitleComponent";
import NewChatButton from "./NewChatButton";
import SideBarListContainer from "./SideBarListContainer";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UserProfile from "./UserProfile";

const Container = styled.div`
    display: flex;
    width: 40%;
    height: 100%;
    border-radius: 26px;
    flex-direction: column;
    gap: 8px;
`;

const FixedHeader = styled.div`
    flex-shrink: 0;
`;

const ContentContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: auto; /* 스크롤 가능하도록 설정 */
`;

const SideBarContainer = ({ mainTitle, ButtonBackGroundColor }) => {
    const [contents, setContents] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [indexToRemove, setIndexToRemove] = useState(null);
    const [menuOpenIndex, setMenuOpenIndex] = useState(null); // 현재 열린 메뉴의 인덱스

    const handleNewChatClick = () => {
        const newContents = ["New Report", ...contents]; // 새로운 항목을 맨 앞에 추가
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

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuOpenIndex !== null) {
                setMenuOpenIndex(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpenIndex]);

    return (
        <Container onClick={(e) => e.stopPropagation()}>
            <FixedHeader>
                <TitleComponent mainTitle={mainTitle} />
            </FixedHeader>
            <FixedHeader>
                <NewChatButton ButtonBackGroundColor={ButtonBackGroundColor} onClick={handleNewChatClick} />
            </FixedHeader>
            <ContentContainer>
                <SideBarListContainer
                    contents={contents}
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
            <UserProfile />
        </Container>
    );
}

export default SideBarContainer;
