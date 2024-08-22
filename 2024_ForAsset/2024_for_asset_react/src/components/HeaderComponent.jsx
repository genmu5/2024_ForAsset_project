import React from "react";
import styled from "styled-components";
import logo from "../images/logo.png";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../security/AuthContext";

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    border-bottom: solid 1px #A5A5A5;
    font-family: noto;
    background-color: white;
`;

const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1760px;
`;

const Icon = styled.img`
    width: 50px;
    height: 50px;
`;

const NavigationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const TextWrapper = styled.div`
    display: flex;
    gap: 10px;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 12px;
    cursor: pointer;
`;

const Button = styled.div`
    width: 80px;
    text-align: center;
    border-radius: 8px;
    padding: 8px 0 8px 0;
    font-size: 13px;
    background-color: ${props => props.isLogin ? '#E3E3E3' : '#2C2C2C' };
    color: ${props => props.isLogin ? 'black' : 'white'};
    border: ${props => props.isLogin ? '#767676 solid 1px' : ''};
`;


const HeaderComponent = () => {

    const authContext = useAuth();
    const navigate = useNavigate();

    const LoginClickHandler = () =>{
        navigate('/login');
    };

    const SignUpClickHandler = () =>{
        navigate('/signup');
    };

    const LogOutClickHandler = () =>{
        authContext.logout();
        alert('로그아웃 되었습니다.')
        navigate('/');
    };

    return(
        <Container>
            <NavWrapper>
                <Icon src={logo} onClick={() => navigate('/')}/>
                <NavigationWrapper>
                    <TextWrapper>
                        <p>개인회원</p>
                        <p>기업회원</p>
                        <p>도움말</p>
                    </TextWrapper>
                    {!authContext.isAuthenticated &&
                        <ButtonWrapper>
                            <Button isLogin={true} onClick={LoginClickHandler}>로그인</Button>
                            <Button isLogin={false} onClick={SignUpClickHandler}>회원가입</Button>
                        </ButtonWrapper>}
                    {authContext.isAuthenticated &&
                        <ButtonWrapper>
                            <Button isLogin={false} onClick={LogOutClickHandler}>로그아웃</Button>
                        </ButtonWrapper>}
                </NavigationWrapper>
            </NavWrapper>
        </Container>
    )
};

export default HeaderComponent;