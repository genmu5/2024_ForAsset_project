import React, { useState } from "react";
import HeaderComponent from "../components/HeaderComponent";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import KakaoIcon from "../images/kakao_icon.png";
import NaverIcon from "../images/naver_icon.png";
import GoogleIcon from "../images/google_icon.png";
import {useAuth} from "../security/AuthContext";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    height: 100vh;
    background-color: #F9FAFF;
`;

const ServiceTitle = styled.p`
    font-size: 30px;
    font-weight: bold;
    font-family: archivo;
    color: #7881F8;
    margin: 45px 0 30px 0;
`;

const Title = styled.p`
    font-size: 35px;
    font-weight: bold;
    font-family: noto;
    margin: 10px 0 10px 0;
`;

const SubTitle = styled.p`
    font-size: 18px;
    font-family: noto;
    margin: 10px 0 30px 0;
`;

const SignUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 560px;
    border-radius: 8px;
    border: solid 1px #D9D9D9;
    padding: 24px;
    background-color: white;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    width: 100%;
    gap: 10px;
    background-color: white;
`;

const RoleSelectionContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    gap: 20px;
`;

const RoleButton = styled.button`
    padding: 10px 20px;
    width: 100%;
    font-size: 16px;
    color: black;
    background-color: ${props => props.selected ? (props.role === 'USER' ? 'rgba(83, 113, 248, 0.5)' : 'rgba(83, 113, 248, 0.5)') : '#ccc'};
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-family: noto;

    &:hover {
        background-color: ${props => props.selected ? (props.role === 'USER' ? 'rgba(83, 113, 248, 0.5)' : 'rgba(83, 113, 248, 0.5)') : '#bbb'};
    }
`;

const InputTitle = styled.p`
    font-size: 16px;
    font-family: noto;
    padding-left: 3px;
    font-family: noto;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;
`;

const InputField = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: noto;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    color: white;
    background-color: #2C2C2C;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 220px;
    font-family: noto;
`;

const ErrorMessage = styled.p`
    color: red;
    font-family: noto;
    font-size: 14px;
    padding-left: 3px;
    font-family: noto;
`;

const SubmitButton = styled.button`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: ${props => props.disabled ? '#ccc' : '#2C2C2C'};
    padding: 13px 0;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    font-family: noto;
`;

const TextWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 25px 0;
`

const NavigateText = styled.p`
    margin: 50px 10px;
    font-family: noto;
    font-size: 15px;
    color: black;
    margin: 0 20px;
`;

const LoginIconWrapper = styled.div`
    display: flex;
    justify-content: center;    
    align-items: center;
    border-radius: 50px;
    border: solid 1px #ccc;
    font-size: 15px;
    gap: 20px;
    padding: 10px 150px;
    background-color: white;
    cursor: pointer;
    margin-bottom: 20px;
`;

const Icon = styled.img`
    width: 30px;
    height: 30px;
`;

const InputBox = ({ title, type = "text", placeholder, buttonText, onChange, onClick }) => {
    return (
        <InputContainer>
            <InputTitle>{title}</InputTitle>
            <InputWrapper>
                <InputField type={type} placeholder={placeholder} onChange={onChange} />
                {buttonText && <Button onClick={onClick}>{buttonText}</Button>}
            </InputWrapper>
        </InputContainer>
    );
};

const LoginPage = () => {

    const authContext = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("USER");

    const [errorMessage, setErrorMessage] = useState("");

    function handleSignIn() {
        const isSucceed = authContext.login(email, password);

        if (isSucceed && role === 'USER'){
            navigate('/customer');
        } else if(isSucceed && role === 'MANAGER'){
            navigate('/manager');
        } else {
            setErrorMessage('아이디나 비밀번호가 틀렸습니다.');
        }
    }

    function handleKakaoLogin() {
        window.location.href = "http://localhost:8080/api/v1/oauth2/kakao";
    }

    return (
        <Container>
            <HeaderComponent />
            <ServiceTitle>Artificial Intelligence For Asset</ServiceTitle>
            <Title>로그인</Title>
            <SubTitle>지금 회원가입하고 생성형 AI를 자산 운용에 사용해보세요 </SubTitle>
            <SignUpContainer>
                <RoleSelectionContainer>
                    <RoleButton role="USER" selected={role === "USER"} onClick={() => setRole("USER")}>
                        개인 로그인
                    </RoleButton>
                    <RoleButton role="MANAGER" selected={role === "MANAGER"} onClick={() => setRole("MANAGER")}>
                        기업 로그인
                    </RoleButton>
                </RoleSelectionContainer>
                <InputBox
                    title="이메일"
                    placeholder="이메일을 입력하세요"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputBox
                    title="비밀번호"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <ErrorMessage>{errorMessage}</ErrorMessage>
                <SubmitButton onClick={handleSignIn}>
                    로그인
                </SubmitButton>
            </SignUpContainer>
            <TextWrapper>
                <div style={{borderTop: '1px solid #ccc', width: '180px'}}></div>
                <NavigateText>회원이 아니라면?<span onClick={() => navigate('/signup')} style={{paddingLeft: '10px', cursor: 'pointer', textDecoration: 'underline', color: 'blue'}}>회원가입</span></NavigateText>
                <div style={{borderTop: '1px solid #ccc', width: '180px'}}></div>
            </TextWrapper>
            <LoginIconWrapper>
                <Icon src={KakaoIcon}/>
                <span style={{fontFamily: 'noto', width: '100px'}} onClick={handleKakaoLogin}>카카오로 로그인</span>
            </LoginIconWrapper>
            <LoginIconWrapper>
                <Icon src={NaverIcon}/>
                <span style={{fontFamily: 'noto', width: '100px'}}>네이버로 로그인</span>
            </LoginIconWrapper>
            <LoginIconWrapper>
                <Icon src={GoogleIcon}/>
                <span style={{fontFamily: 'noto', width: '100px'}}>구글로 로그인</span>
            </LoginIconWrapper>
        </Container>
    );
};

export default LoginPage;
