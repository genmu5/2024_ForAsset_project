import React, { useState } from "react";
import styled from "styled-components";
import SideBarListComponent from "./SideBarListComponent";
import NewChatButton from "./NewChatButton";

const Container = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
`;

const SideBarListContainer = () => {
    const [contents, setContents] = useState([
        { id: 1, title: "New Report" },
    ]);

    const addNewChat = () => {
        const newId = contents.length ? contents[contents.length - 1].id + 1 : 1;
        setContents([...contents, { id: newId, title: "New Report" }]);
    };

    return (
        <Container>
            {contents.map((content) => (
                <SideBarListComponent key={content.id} content={content.title} />
            ))}
        </Container>
    );
}

export default SideBarListContainer;