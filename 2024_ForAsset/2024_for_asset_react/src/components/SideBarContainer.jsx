import React, { useState, useEffect } from "react";
import styled from "styled-components";
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
    width: 95%;
    justify-content: center;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 8px;
    font-size: 16px;
`;

const SideBarContainer = ({ mainTitle, ButtonBackGroundColor, chatData, onNewChatClick, onItemClick, onRemoveChat, onBookmarkToggle, selectedIndex }) => {
    const [showModal, setShowModal] = useState(false);
    const [indexToRemove, setIndexToRemove] = useState(null);
    const [menuOpenIndex, setMenuOpenIndex] = useState(null); // Current open menu index
    const [searchQuery, setSearchQuery] = useState("");

    const handleNewChatClick = () => {
        onNewChatClick();
    };

    const handleItemClick = (index) => {
        onItemClick(index);
    };

    const handleItemRemove = (index) => {
        setShowModal(true);
        setIndexToRemove(index);
    };

    const confirmRemove = () => {
        onRemoveChat(indexToRemove);
        setShowModal(false);
        setIndexToRemove(null);
        if (selectedIndex === indexToRemove) {
            onItemClick(null);
        } else if (selectedIndex > indexToRemove) {
            onItemClick(selectedIndex - 1);
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

    const filteredTitles = chatData.filter(chat =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    contents={filteredTitles}
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
