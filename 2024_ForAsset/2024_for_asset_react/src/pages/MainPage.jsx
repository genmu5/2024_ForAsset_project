import React, { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import styled from "styled-components";
import customerImage from "../images/main_customer_image.png";
import managerImage from "../images/main_manager_image.png";
import {useAuth} from "../security/AuthContext";
import {useNavigate} from "react-router-dom";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    background-color: #F9FAFF;
`;

const MainSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1400px;
    gap: 20px;
    padding-bottom: 70px;
`;

const Title = styled.p`
    padding: 70px 0 30px 0;
    font-family: archivo;
    font-size: 55px;
    font-weight: bold;
`;

const SubTitle = styled.p`
    padding: 0 0 50px 0;
    font-family: noto;
    font-size: 30px;
`;

const MemberContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 60px;
`;

const MemberBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 35px;
    gap: 20px;
    border-radius: 18px;
    font-family: noto;
    background-color: ${props => props.isCustomer ? 'rgba(83, 113, 248, 0.5)' : 'rgba(157, 123, 197, 0.5)'};
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2); 
`;


const MemberText = styled.p`
    font-family: noto;
    font-weight: bold;
    font-size: 26px;
    color: ${props => props.isCustomer ? '#002EFF' : '#6E29FF'};
`;

const SubText = styled.p`
    font-family: noto;
    font-size: 18px;
    font-weight: bold;
    line-height: 1.5;
    color: #000E50;
    width: 360px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
`;

const ImageWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 10px 20px;
    border-radius: 100px;
`;

const Image = styled.img`
    width: 160px;
    height: 120px;
`;

const Button = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 12px 17px;
    background-color: #5661F6;
    border-radius: 30px;
    color: white;
    font-size: 15px;
    cursor: pointer;
`;

const GuideSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
    align-items: center;
    border-top: solid 1px #A5A5A5;
    background-color: rgba(244, 244, 244, 0.5);
`;

const GuideText = styled.p`
    font-family: noto;
    font-weight: bold;
    font-size: 35px;
    color: #7881F8;
    margin: 50px 0 30px 0;
`;

const GuideSubTitle = styled.p`
    font-family: noto;
    font-weight: bold;
    font-size: 25px;
    margin: 0 0 40px 0;
`;

const AccordionContainer = styled.div`
    margin-bottom: 50px;
`;

const Accordion = styled.div`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    width: 1060px;
`;

const AccordionHeader = styled.div`
    padding: 15px 20px;
    font-family: noto;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f0f0f0;
    border-radius: 8px;
`;

const AccordionContent = styled.div`
    padding: 20px;
    font-family: noto;
    font-size: 16px;
    display: ${props => (props.isOpen ? "block" : "none")};
`;

const AccordionItem = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Accordion>
            <AccordionHeader onClick={() => setIsOpen(!isOpen)}>
                {title}
                <span>{isOpen ? "-" : "+"}</span>
            </AccordionHeader>
            <AccordionContent isOpen={isOpen}>
                <div>{content}</div>
            </AccordionContent>
        </Accordion>
    );
};

const MainPage = () => {

    const authContext = useAuth();
    const navigate = useNavigate();

    return(
        <Container>
            <HeaderComponent />
            <MainSection>
                <Title>Artificial Intelligence  For  Asset</Title>
                <SubTitle>생성형 AI를 통해 구현된 챗봇을 마음껏 활용해보세요!</SubTitle>
                <MemberContainer>
                    <MemberBox isCustomer={true}>
                        <MemberText isCustomer={true}>
                            개인 회원
                        </MemberText>
                        <SubText>
                            챗봇 AI가 복잡한 금융 데이터를 분석하여 핵심 정보를 추출하고, 이를 이해하기 쉽게 요약하여 제공합니다.
                        </SubText>
                        <ButtonWrapper>
                            {authContext.isAuthenticated
                                && <Button onClick={() => navigate('/customer')}>개인회원 화면으로</Button> }
                            {!authContext.isAuthenticated
                                && <Button onClick={() => navigate('/login')}>개인회원 로그인</Button> }
                            <ImageWrapper>
                                <Image src={customerImage}/>
                            </ImageWrapper>
                        </ButtonWrapper>
                    </MemberBox>
                    <MemberBox isCustomer={false}>
                        <MemberText isCustomer={false}>
                            기업 회원
                        </MemberText>
                        <SubText>
                            생성형 AI를 활용해 자산운용보고서 작성 시 운용보고와 향후 운용계획 부분을 자동 생성하여 업무의 부담을 줄여줍니다.
                        </SubText>
                        <ButtonWrapper>
                            {authContext.isAuthenticated
                                && <Button onClick={() => navigate('/manager')}>기업회원 화면으로</Button> }
                            {!authContext.isAuthenticated
                                && <Button onClick={() => navigate('/login')}>기업회원 로그인</Button> }
                            <ImageWrapper>
                                <Image src={managerImage}/>
                            </ImageWrapper>
                        </ButtonWrapper>
                    </MemberBox>
                </MemberContainer>
            </MainSection>
            <GuideSection>
                <GuideText>Service Guide</GuideText>
                <GuideSubTitle>AIFA 이용 방법을 알려드립니다</GuideSubTitle>
                <AccordionContainer>
                    <AccordionItem
                        title="개인 회원 가이드"
                        content={<div>개인 회원을 위한 가이드는 다음과 같습니다. 첫째, 로그인 후 챗봇을 통해 필요한 정보를 요청하세요. 둘째, 챗봇이 제공하는 분석 결과를 검토하세요.</div>}
                    />
                    <AccordionItem
                        title="기업 회원 가이드"
                        content={<div>기업 회원을 위한 가이드는 다음과 같습니다. 첫째, 로그인 후 자산운용보고서 작성을 시작하세요. 둘째, 생성형 AI가 자동으로 생성한 보고서를 검토하고 수정하세요.</div>}
                    />
                </AccordionContainer>
            </GuideSection>
        </Container>
    );
}

export default MainPage;
