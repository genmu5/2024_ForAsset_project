import React, {useState} from "react";
import styled from "styled-components";
import TitleComponent from "./TitleComponent";
import NewChatButton from "./NewChatButton";
import SideBarListContainer from "./SideBarListContainer";

const Container = styled.div`
    display: flex;
    width: 40%;
    height: 100%;
    border-radius: 26px;
    flex-direction: column;
    gap: 10px;
`;

const SideBarContainer = ({mainTitle, ButtonBackGroundColor}) => {
    const [contents, setContents] = useState([]);

    const handleNewChatClick = () => {
        setContents([...contents, "New Report"]);
    };

    return (
        <Container>
            <TitleComponent mainTitle={mainTitle}/>
            <NewChatButton ButtonBackGroundColor={ButtonBackGroundColor} onClick={handleNewChatClick}/>
            <SideBarListContainer contents={contents}/>
        </Container>
    );
}

export default SideBarContainer;