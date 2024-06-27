import React from "react";
import styled from "styled-components";
import SideBarContainer from "../components/SideBarContainer";
import ChatContainer from "../PageSections/CustomerPageSection/ChatContainer";
import InformationContainer from "../PageSections/CustomerPageSection/InformationContainer";


const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const InnerContainer = styled.div`
    display: flex;
    width: calc(100vw - 80px); /* 100% width minus left and right margins */
    height: calc(100vh - 80px); /* 100% height minus top and bottom margins */
    margin: 20px;
    background-color: #578EFA;
    border-radius: 26px;
    gap: 20px;
    padding: 20px;
`;

const CustomerPage = () => {
    return(
        <Container>
            <InnerContainer>
                <SideBarContainer mainTitle={"ForAssetCustomer"} ButtonBackGroundColor={"#F08D86"}/>
                <ChatContainer/>
                <InformationContainer/>
            </InnerContainer>
        </Container>
    );
}

export default CustomerPage;