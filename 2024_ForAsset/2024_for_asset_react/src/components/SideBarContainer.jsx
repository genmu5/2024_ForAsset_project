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
    gap: 8px;
`;

const SideBarContainer = ({mainTitle, ButtonBackGroundColor}) => {
    const [contents, setContents] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleNewChatClick = () => {
        const newContents = [...contents, "New Report"];
        setContents(newContents);
        setSelectedIndex(newContents.length - 1);
    };

    const handleItemClick = (index) => {
        setSelectedIndex(index);
    };

    return (
        <Container>
            <TitleComponent mainTitle={mainTitle}/>
            <NewChatButton ButtonBackGroundColor={ButtonBackGroundColor} onClick={handleNewChatClick}/>
            <SideBarListContainer
                contents={contents}
                selectedIndex={selectedIndex}
                onItemClick={handleItemClick}
            />
        </Container>
    );
}

export default SideBarContainer;