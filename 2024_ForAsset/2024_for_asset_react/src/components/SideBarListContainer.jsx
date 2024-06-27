import React from "react";
import styled from "styled-components";
import SidBarListComponent from "./SidBarListComponent";

const Container = styled.div`
    display: flex;
    justify-content: start;
    flex-direction: column;
`;

const SideBarListContainer = () => {
    return(
        <Container>
            <SidBarListComponent content={"교보생명약사공모주"}/>
            <SidBarListComponent content={"교보생명약사공모주"}/>
            <SidBarListComponent content={"교보생명약사공모주"}/>
            <SidBarListComponent content={"교보생명약사공모주"}/>
            <SidBarListComponent content={"교보생명약사공모주"}/>
            <SidBarListComponent content={"교보생명약사공모주"}/>
            <SidBarListComponent content={"교보생명약사공모주"}/>
        </Container>
    );
}

export default SideBarListContainer;