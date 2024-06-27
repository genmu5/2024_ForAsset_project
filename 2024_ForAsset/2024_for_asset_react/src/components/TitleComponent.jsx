import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 80px;
    border-bottom: solid #D4D4D4;
    justify-content: center;
    align-items: center;
`;

const TitleComponent = ({title, mainTitle}) => {
    return(
        <Container>
            {title && <h1 style={{fontSize: "35px", fontWeight: "bold", color: "gray"}}>{title}</h1>}
            {mainTitle && <h1 style={{fontSize: "35px", fontWeight: "bold", color: "white"}}>{mainTitle}</h1>}
        </Container>
    );
}

export default TitleComponent;