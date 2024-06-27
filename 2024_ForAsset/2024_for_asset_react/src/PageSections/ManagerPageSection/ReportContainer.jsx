import React from "react";
import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";

const Container = styled.div`
    display: flex;
    width: 100%;
    background-color: white;
    border-radius: 26px;
`;

const ReportContainer = () => {
    return(
        <Container>
            <TitleComponent title={"Report"}/>
        </Container>
    );
}

export default ReportContainer;