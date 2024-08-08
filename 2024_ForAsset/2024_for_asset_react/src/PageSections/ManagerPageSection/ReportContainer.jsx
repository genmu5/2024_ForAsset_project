import React from "react";
import styled from "styled-components";

const Container = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
    overflow-x: hidden; /* Prevent horizontal scrolling */
`;

const HTMLContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const ReportContainer = ({ reportHtml }) => {
    return (
        <Container>
            <HTMLContainer dangerouslySetInnerHTML={{ __html: reportHtml }} />
        </Container>
    );
};

export default ReportContainer;
