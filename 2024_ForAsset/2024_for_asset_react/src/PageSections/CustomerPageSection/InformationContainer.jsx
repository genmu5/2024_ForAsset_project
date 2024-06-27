import React from "react";
import styled from "styled-components";
import TitleComponent from "../../components/TitleComponent";

const Container = styled.div`
    display: flex;
    width: 60%;
    background-color: white;
    border-radius: 26px;
`;

const InformationContainer = () => {
    return(
        <Container>
            <TitleComponent title={"Info"}/>
        </Container>
    );
}

export default InformationContainer