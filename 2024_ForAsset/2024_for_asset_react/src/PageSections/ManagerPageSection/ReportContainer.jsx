import React from "react";
import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background-color: white;
    border-radius: 26px;
`;

const ReportContainer = ({ answer }) => {
    return (
        <Container>
            <TitleComponent title={"Report"} />
            {answer && (
                <div>
                    <p>답변:</p>
                    <p>{answer}</p>
                </div>
            )}
        </Container>
    );
}

export default ReportContainer;
