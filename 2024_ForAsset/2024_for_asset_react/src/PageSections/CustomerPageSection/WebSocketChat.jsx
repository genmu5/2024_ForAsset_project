import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styled from 'styled-components';

// Styled components for styling the chat application
const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 15px 10px;
    gap: 10px;
    overflow: hidden;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: scroll;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    border-radius: 13px;
    padding: 10px;
`;

const MessageWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
    margin: 10px 0;
`;

const MessageContent = styled.div`
    background-color: ${props => props.isUser ? 'rgba(44,71,146,0.17)' : '#ffffff'};
    border-radius: 10px;
    padding: 10px;
    max-width: 60%;
    word-break: break-word;
    display: flex;
    align-items: center;
    line-height: 1.5;
`;

const InputContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    flex: 1;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 10px;
`;

const Button = styled.button`
    background-color: #578EFA;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 8px 15px;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const WebSocketChat = ({ email, chatRoomId }) => {
    const [client, setClient] = useState(null); // WebSocket 클라이언트 상태
    const [messages, setMessages] = useState([]); // 채팅 메시지 상태
    const [message, setMessage] = useState(''); // 현재 입력된 메시지 상태
    const [isConnected, setIsConnected] = useState(false); // 연결 상태 추적
    const messagesEndRef = useRef(null); // 메시지 컨테이너 끝을 추적하기 위한 ref

    useEffect(() => {
        const token = localStorage.getItem('token'); // 로컬 스토리지에서 토큰 가져오기
        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'), // '/ws' 경로로 연결
            connectHeaders: {
                Authorization: `Bearer ${token}`, // 인증 헤더
            },
            debug: (str) => console.log(str), // 디버그 출력
            reconnectDelay: 5000, // 재연결 지연 시간 (밀리초)
            onConnect: () => {
                console.log('Connected');
                setIsConnected(true); // 연결 상태 true로 설정

                // 채팅방 토픽 구독
                stompClient.subscribe(`/sub/chat/${chatRoomId}`, (messageOutput) => {
                    const newMessage = JSON.parse(messageOutput.body); // 수신된 메시지 파싱
                    setMessages(prevMessages => {
                        const updatedMessages = [...prevMessages, newMessage];
                        // ID를 기준으로 메시지를 정렬
                        updatedMessages.sort((a, b) => a.id - b.id);
                        return updatedMessages;
                    });
                });

                // 채팅 히스토리 불러오기
                stompClient.publish({
                    destination: `/pub/history`,
                    body: JSON.stringify({ channelId: chatRoomId })
                });
            },
            onDisconnect: () => {
                console.log('Disconnected');
                setIsConnected(false); // 연결 상태 false로 설정
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
                setIsConnected(false); // 연결 상태 false로 설정
            },
        });

        stompClient.activate(); // WebSocket 연결 활성화
        setClient(stompClient);

        return () => {
            if (stompClient) {
                stompClient.deactivate(); // 컴포넌트 언마운트 시 클라이언트 비활성화
            }
        };
    }, [chatRoomId]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // 메시지 컨테이너 끝으로 자동 스크롤
    }, [messages]);

    const sendMessage = () => {
        if (client && isConnected && message.trim()) {
            // 사용자의 메시지를 로컬 상태에 추가
            const userMessage = { type: 'chat', sender: email, channelId: chatRoomId, data: message };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            // 메시지를 WebSocket 서버로 전송
            client.publish({
                destination: `/pub/message`,
                body: JSON.stringify(userMessage)
            });

            setMessage(''); // 메시지 입력 필드 비우기
        } else {
            console.error('Unable to send message: Not connected or message is empty');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage(); // Enter 키를 누르면 메시지 전송
        }
    };

    return (
        <Container>
            <MessagesContainer>
                {messages.map((msg, index) => (
                    <MessageWrapper key={index} isUser={msg.sender === email}>
                        <MessageContent isUser={msg.sender === email}>
                            {msg.data}
                        </MessageContent>
                    </MessageWrapper>
                ))}
                <div ref={messagesEndRef} /> {/* 자동 스크롤을 위한 ref */}
            </MessagesContainer>
            <InputContainer>
                <Input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                />
                <Button onClick={sendMessage} disabled={!isConnected || message.trim() === ''}>Send</Button>
            </InputContainer>
        </Container>
    );
};

export default WebSocketChat;
