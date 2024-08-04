import React from "react";
import styled from "styled-components";
import SideBarListComponent from "./SideBarListComponent";

const Container = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
`;

const SideBarListContainer = ({ contents, selectedIndex, menuOpenIndex, onItemClick, onItemRemove, onToggleMenu, onBookmarkToggle }) => {
    return (
        <Container>
            {contents.map((content, index) => (
                <SideBarListComponent
                    key={index}
                    content={content}
                    isSelected={selectedIndex === index}
                    isMenuOpen={menuOpenIndex === index}
                    onClick={() => onItemClick(index)}
                    onRemove={() => onItemRemove(index)}
                    onToggleMenu={() => onToggleMenu(index)}
                    onBookmarkToggle={() => onBookmarkToggle(index)}
                />
            ))}
        </Container>
    );
}

export default SideBarListContainer;
