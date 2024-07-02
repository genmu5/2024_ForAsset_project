import React, {useState} from "react";
import styled from "styled-components";
import TitleComponent from "./TitleComponent";
import NewChatButton from "./NewChatButton";
import SideBarListContainer from "./SideBarListContainer";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

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
    const [showModal, setShowModal] = useState(false);
    const [indexToRemove, setIndexToRemove] = useState(null);

    const handleNewChatClick = () => {
        const newContents = [...contents, "New Report"];
        setContents(newContents);
        setSelectedIndex(newContents.length - 1);
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

    return (
        <Container>
            <TitleComponent mainTitle={mainTitle}/>
            <NewChatButton ButtonBackGroundColor={ButtonBackGroundColor} onClick={handleNewChatClick}/>
            <SideBarListContainer
                contents={contents}
                selectedIndex={selectedIndex}
                onItemClick={handleItemClick}
                onItemRemove={handleItemRemove}
            />
            {showModal && (
                <DeleteConfirmationModal
                    onConfirm={confirmRemove}
                    onCancel={cancelRemove}
                />
            )}
        </Container>
    );
}

export default SideBarContainer;