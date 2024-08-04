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
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 10px;
    margin-bottom: 8px;
    font-size: 16px;
`;

const SideBarContainer = ({ mainTitle, ButtonBackGroundColor }) => {
    const [contents, setContents] = useState([
        "Create Html Game Environment for Website",
        "Project Meeting Notes",
        "Client Feedback",
        "Weekly Report",
        "Budget Plan"
    ]);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [indexToRemove, setIndexToRemove] = useState(null);
    const [menuOpenIndex, setMenuOpenIndex] = useState(null); // Current open menu index
    const [searchQuery, setSearchQuery] = useState("");

    const handleNewChatClick = () => {
        const newContents = ["New Report", ...contents]; // Add new item at the front
        setContents(newContents);
        setSelectedIndex(0); // Set the newly added item as selected
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
        content.toLowerCase().includes(searchQuery.toLowerCase())
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
