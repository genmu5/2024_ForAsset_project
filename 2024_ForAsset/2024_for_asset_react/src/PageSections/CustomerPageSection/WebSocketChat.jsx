import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styled from 'styled-components';

// Styled components for styling the chat application
const Container = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    background-color: white;
    margin: 15px 10px;
    float: left;
    gap: 10px;
    overflow: hidden;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: scroll;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    border-radius: 13px;
`;

const MessageWrapper = styled.div`
    display: flex;
    margin: 10px;
    align-items: center;
    justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const MessageContent = styled.div`
    background-color: ${props => props.isUser ? 'rgba(44,71,146,0.17)' : '#ffffff'};
    border-radius: 10px;
    margin: 0 10px;
    padding: 10px;
    max-width: 60%;
    word-break: break-word;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-direction: ${props => props.isUser ? 'row-reverse' : 'row'};
    line-height: 1.5;
`;

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props => props.isUser ? '#578EFA' : '#cccccc'};
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
        if (!client) {
            const stompClient = new Client({
                webSocketFactory: () => new SockJS('http://localhost:8080/chat'), // SockJS를 사용한 WebSocket 팩토리
                connectHeaders: {
                    Authorization: `Bearer ${token}`, // 인증 헤더
                },
                debug: function (str) {
                    console.log(str); // 디버그 출력
                },
                reconnectDelay: 5000, // 재연결 지연 시간 (밀리초)
                onConnect: () => {
                    console.log('Connected');
                    setIsConnected(true); // 연결 상태 true로 설정

                    // 채팅방 토픽 구독
                    stompClient.subscribe(`/topic/chatroom/${chatRoomId}`, messageOutput => {
                        console.log('Message received:', messageOutput.body);
                        const newMessage = JSON.parse(messageOutput.body); // 수신된 메시지 파싱
                        setMessages(prevMessages => {
                            if (prevMessages.some(msg => msg.id === newMessage.id)) {
                                return prevMessages; // 중복 메시지 방지
                            }
                            return [...prevMessages, newMessage]; // 새 메시지를 상태에 추가
                        });
                    });

                    // 초기 인사 메시지 설정
                    setMessages([{ id: 'init', email: 'ChatGPT', content: '안녕하세요! 어떤 도움이 필요하세요?' }]);
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

            // 컴포넌트 언마운트 시 클라이언트 비활성화
            return () => {
                if (client !== null) {
                    client.deactivate();
                }
            };
        }
    }, [chatRoomId, client]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // 메시지 컨테이너 끝으로 자동 스크롤
    }, [messages]);

    const sendMessage = () => {
        if (client && isConnected && message.trim() !== '') {
            console.log('Sending message:', message);

            // 사용자의 메시지를 로컬 상태에 추가
            const userMessage = { id: Date.now(), email, content: message };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            // 메시지를 WebSocket 서버로 전송
            client.publish({
                destination: `/app/chat.sendMessage`,
                body: JSON.stringify({ senderEmail: email, content: message })
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
                    <MessageWrapper key={index} isUser={msg.email === email}>
                        {msg.email === email && (
                            <>
                                <MessageContent isUser={true}>
                                    <div>
                                        {msg.content}
                                    </div>
                                </MessageContent>
                                {/* Uncomment to display avatar */}
                                {/* <Avatar isUser={true} /> */}
                            </>
                        )}
                        {msg.email !== email && (
                            <>
                                {/* Uncomment to display avatar */}
                                {/* <Avatar isUser={false} /> */}
                                <MessageContent isUser={false}>
                                    <div>
                                        {msg.content}
                                    </div>
                                </MessageContent>
                            </>
                        )}
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
