import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: white;
    border-radius: 26px;
    padding: 20px;
`;

const MessagesContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 20px;
    background-color: #f9f9f9;
`;

const Message = styled.div`
    margin: 10px 0;
    padding: 10px;
    background-color: ${props => props.isUser ? '#e1ffc7' : '#ffffff'};
    border-radius: 10px;
    align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
`;

const InputContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #578EFA;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;

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

    useEffect(() => {
        const token = localStorage.getItem('token');

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
                    setMessages(prevMessages => [...prevMessages, JSON.parse(messageOutput.body)]);
                });
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
    }, [chatRoomId]);

    const sendMessage = () => {
        if (client && isConnected && message.trim() !== '') {
            console.log('Sending message:', message);
            client.publish({
                destination: `/app/chat.sendMessage`,
                body: JSON.stringify({ senderEmail: email, content: message })
            });
            setMessage('');
        } else {
            console.error('Unable to send message: Not connected or message is empty');
        }
    };

    return (
        <Container>
            <MessagesContainer>
                {messages.map((msg, index) => (
                    <Message key={index} isUser={msg.email === email}>
                        <strong>{msg.email}:</strong> {msg.content}
                    </Message>
                ))}
            </MessagesContainer>
            <InputContainer>
                <Input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <Button onClick={sendMessage} disabled={!isConnected || message.trim() === ''}>Send</Button>
            </InputContainer>
        </Container>
    );
};

export default WebSocketChat;
