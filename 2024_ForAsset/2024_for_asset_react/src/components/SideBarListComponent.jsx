import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import bookmark_filled_star from "../images/bookmark_filled_star.png"; // 북마크 필드 스타 아이콘 이미지
import bookmark_empty_star from "../images/bookmark_empty_star.png"; // 북마크 빈 별 아이콘 이미지
import more_icon from "../images/more_icon.png"; // 가로 점 3개 아이콘 이미지

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
    background-color: ${props => (props.isSelected || props.isMenuOpen ? "#172855" : "transparent")}; // 선택된 항목과 메뉴가 열린 항목의 배경색 변경
    cursor: pointer;
    position: relative; // 메뉴 위치를 위해 추가
`;

const Icon = styled.img`
    width: 23px;
    height: 23px;
    filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(180deg) brightness(100%) contrast(100%);
    cursor: pointer; // 마우스 커서를 포인터로 변경
    &:hover {
        transform: scale(1.01); // 스케일 - 마우스 커서가 닿았을 때 버튼 크기 조절
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); // 버튼 그림자
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
    font-size: 18px;
    font-style: normal;
    font-weight: bold;
    text-align: left;
    color: #fff;
`;

const iconStyle = {
    color: 'red'
};

const SideBarListComponent = ({ content, isSelected, isMenuOpen, onClick, onRemove, onToggleMenu }) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const componentRef = useRef(null);

    const handleBookmarkClick = (e) => {
        e.stopPropagation();
        setIsBookmarked(!isBookmarked);
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        onToggleMenu();
    };

    const handleRemoveClick = (e) => {
        e.stopPropagation();
        onRemove();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                onToggleMenu(null); // 메뉴를 닫습니다.
            }
        };

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside, true);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [isMenuOpen, onToggleMenu]);

    return (
        <Container ref={componentRef}>
            <ListContainer isSelected={isSelected} isMenuOpen={isMenuOpen} onClick={onClick}>
                <Icon
                    src={isBookmarked ? bookmark_filled_star : bookmark_empty_star}
                    onClick={handleBookmarkClick}
                    alt={"bookmark"}
                />
                <Text isSelected={isSelected} isMenuOpen={isMenuOpen}>{content}</Text>
                <MoreIcon onClick={toggleMenu} src={more_icon} alt={"more_icon"} />
                <Menu show={isMenuOpen}>
                    <MenuItem onClick={handleRemoveClick}>내역 삭제</MenuItem>
                    <MenuItem onClick={(e) => { e.stopPropagation(); /* TODO: 제목 수정 기능 추가 */ }}>제목 수정</MenuItem>
                </Menu>
            </ListContainer>
        </Container>
    );
}

export default SideBarListComponent;
