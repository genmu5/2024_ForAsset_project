import React from "react";
import styled from "styled-components";
import message_icon from "../images/message_icon.png";
import trash_icon from "../images/trash_icon.png";

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 2px;
`;

const ListContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 14px;
    border-radius: 10px;
    width: 100%;
    height: 33px;
    background-color: ${props => (props.isSelected ? "#172855" : "transparent")}; // 선택된 항목의 배경색 변경
    color: ${props => (props.isSelected ? "#fff" : "#000")}; // 선택된 항목의 글자색 변경
    cursor: pointer;
`;

const Icon = styled.img`
    width: 20px;
    height: 20px;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%);
    cursor: pointer; // 마우스 커서를 포인터로 변경
    &:hover {
        transform: scale(1.008); // 스케일 - 마우스 커서가 닿았을 때 버튼 크기 조절
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 버튼 그림자
    }
`;

const Text = styled.p`
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    text-align: left;
    color: #fff;
`;

const SideBarListComponent = ({ content, isSelected, onClick }) => {
    return (
        <Container>
            <ListContainer isSelected={isSelected} onClick={onClick}>
                <Icon src={message_icon} alt={"message_icon"} />
                <Text>{content}</Text>
                <Icon src={trash_icon} alt={"trash_icon"} />
            </ListContainer>
        </Container>
    );
}

export default SideBarListComponent;
