import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalButton = styled.button`
    margin: 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #ddd;
    }
`;

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
    return (
        <ModalOverlay>
            <ModalContent className="modal-content" onClick={(e) => e.stopPropagation()}>
                <p>채팅 내역을 삭제하시겠습니까?</p>
                <ModalButton onClick={onConfirm}>네</ModalButton>
                <ModalButton onClick={onCancel}>아니요</ModalButton>
            </ModalContent>
        </ModalOverlay>
    );
}

export default DeleteConfirmationModal;
