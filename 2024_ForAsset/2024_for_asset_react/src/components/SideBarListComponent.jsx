import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import bookmark_filled_star from "../images/bookmark_filled_star.png";
import bookmark_empty_star from "../images/bookmark_empty_star.png";
import more_icon from "../images/more_icon.png";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 14px;
    border-radius: 10px;
    width: 100%;
    height: 40px;
    background-color: ${props => (props.isSelected || props.isMenuOpen ? "#F0F0F0" : "transparent")};
    cursor: pointer;
    position: relative;
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

const Menu = styled.div`
    display: ${props => (props.show ? "block" : "none")};
    position: absolute;
    top: 40px;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    z-index: 1;
`;

const MenuItem = styled.div`
    padding: 10px;
    cursor: pointer;
    &:hover {
        background: #eee;
    }
`;

const Text = styled.p`
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    color: #333;
`;

const SideBarListComponent = ({ content, isSelected, isMenuOpen, onClick, onRemove, onToggleMenu, onBookmarkToggle }) => {
    const componentRef = useRef(null);
    const [showModal, setShowModal] = useState(false);

    const handleBookmarkClick = (e) => {
        e.stopPropagation();
        onBookmarkToggle();
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        onToggleMenu();
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        onRemove();
        setShowModal(false); // 모듈창 닫기
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                onToggleMenu(null);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen, onToggleMenu]);

    return (
        <Container ref={componentRef}>
            <ListContainer isSelected={isSelected} isMenuOpen={isMenuOpen} onClick={onClick}>
                <Icon
                    src={content.bookmarked ? bookmark_filled_star : bookmark_empty_star}
                    onClick={handleBookmarkClick}
                    alt={"bookmark"}
                />
                <Text>{content.title}</Text>
                <MoreIcon onClick={toggleMenu} src={more_icon} alt={"more_icon"} />
                <Menu show={isMenuOpen}>
                    <MenuItem onClick={handleRemoveClick}>내역 삭제</MenuItem>
                </Menu>
            </ListContainer>
            {showModal && <DeleteConfirmationModal onConfirm={handleRemoveClick} onCancel={() => setShowModal(false)} />}
        </Container>
    );
}

export default SideBarListComponent;
