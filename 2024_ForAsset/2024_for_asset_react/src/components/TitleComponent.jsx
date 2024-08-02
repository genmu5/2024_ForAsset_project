import React from "react";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: center;
    align-items: center;
`;

const TitleComponent = ({ title, mainTitle }) => {
    return (
        <Container>
            {/*{title && <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "gray" }}>{title}</h1>}*/}
            {/*{mainTitle && <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#4A4A4A" }}>{mainTitle}</h1>}*/}
        </Container>
    );
}

export default TitleComponent;
