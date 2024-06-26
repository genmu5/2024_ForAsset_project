import React, { useState } from "react";
import styled from "styled-components";
import SideBarListComponent from "./SideBarListComponent";

const Container = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
`;

const SideBarListContainer = ({ contents, selectedIndex, onItemClick }) => {
    return (
        <Container>
            {contents.map((content, index) => (
                <SideBarListComponent
                    key={index}
                    content={content}
                    isSelected={selectedIndex === index}
                    onClick={() => onItemClick(index)}
                />
            ))}
        </Container>
    );
}

export default SideBarListContainer;