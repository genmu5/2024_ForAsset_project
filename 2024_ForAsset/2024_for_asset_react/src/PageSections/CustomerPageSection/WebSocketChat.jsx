import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styled from 'styled-components';

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
    const [client, setClient] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!client) {
            const stompClient = new Client({
                webSocketFactory: () => new SockJS('http://localhost:8080/chat'),
                connectHeaders: {
                    Authorization: `Bearer ${token}`,
                },
                debug: function (str) {
                    console.log(str);
                },
                reconnectDelay: 5000,
                onConnect: () => {
                    console.log('Connected');
                    setIsConnected(true);

                    stompClient.subscribe(`/topic/chatroom/${chatRoomId}`, messageOutput => {
                        console.log('Message received:', messageOutput.body);
                        const newMessage = JSON.parse(messageOutput.body);
                        setMessages(prevMessages => {
                            if (prevMessages.some(msg => msg.id === newMessage.id)) {
                                return prevMessages;
                            }
                            return [...prevMessages, newMessage];
                        });
                    });

                    // 초기 메시지 설정
                    setMessages([{ id: 'init', email: 'ChatGPT', content: '안녕하세요! 어떤 도움이 필요하세요?' }]);
                },
                onDisconnect: () => {
                    console.log('Disconnected');
                    setIsConnected(false);
                },
                onStompError: (frame) => {
                    console.error('Broker reported error: ' + frame.headers['message']);
                    console.error('Additional details: ' + frame.body);
                    setIsConnected(false);
                },
            });

            stompClient.activate();
            setClient(stompClient);

            return () => {
                if (client !== null) {
                    client.deactivate();
                }
            };
        }
    }, [chatRoomId, client]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (client && isConnected && message.trim() !== '') {
            console.log('Sending message:', message);

            // 내 메시지를 로컬 상태에 추가
            const userMessage = { id: Date.now(), email, content: message };
            setMessages(prevMessages => [...prevMessages, userMessage]);

            client.publish({
                destination: `/app/chat.sendMessage`,
                body: JSON.stringify({ senderEmail: email, content: message })
            });
            setMessage('');
        } else {
            console.error('Unable to send message: Not connected or message is empty');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
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
                                {/* <Avatar isUser={true} /> */}
                            </>
                        )}
                        {msg.email !== email && (
                            <>
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
                <div ref={messagesEndRef} />
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