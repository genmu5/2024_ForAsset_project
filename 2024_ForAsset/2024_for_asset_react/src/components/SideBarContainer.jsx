import React, {useState} from "react";
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
            <FixedHeader>
                <TitleComponent mainTitle={mainTitle}/>
            </FixedHeader>
            <FixedHeader>
            <NewChatButton ButtonBackGroundColor={ButtonBackGroundColor} onClick={handleNewChatClick}/>
            </FixedHeader>
            <ContentContainer>
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
            </ContentContainer>
            <UserProfile />
        </Container>
    );
}

export default SideBarContainer;