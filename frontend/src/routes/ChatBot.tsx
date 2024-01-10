import React, { useState, useEffect, useRef } from 'react';
import { VStack, Box, Input, Button, Flex } from '@chakra-ui/react';

interface Message {
  text: string;
  isUser: boolean;
}

function getCookie(name: string): string | null {
  let cookieValue: string | null = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const csrftoken = getCookie('csrftoken');
const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const sendMessage = async () => {
    if (input.trim()) {
      const userInput = input;
      setInput('');
      setMessages(prevMessages => [...prevMessages, { text: userInput, isUser: true }]);

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      if (csrftoken) {
        headers['X-CSRFToken'] = csrftoken;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/chatbot/response', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ message: userInput }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const responseData = await response.json();
        setMessages(prevMessages => [...prevMessages, { text: responseData.response, isUser: false }]);
      } catch (error) {
        console.error('Error sending message to chatbot:', error);
        setMessages(prevMessages => [...prevMessages, { text: '챗봇 연결에 실패했습니다.', isUser: false }]);
      }
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      border="1px solid lightgray"
      borderRadius="10px"
      overflow="hidden"
      padding="10px"
      position="relative"
      backgroundColor={'white'}
    >
      <VStack>
        <Box
          overflowY="auto"
          minHeight="300px"
          maxHeight="500px"
          width="500px"
          backgroundColor="gray.100"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none', 
          }}
        >
    {messages.map((msg, index) => (
      <Flex
        key={index}
        flexDirection="column"
        alignItems={msg.isUser ? 'flex-end' : 'flex-start'}
        p={2}
        m={1}
        maxWidth="90%"
      >
        {msg.isUser && (
          <Box fontSize="sm" color="gray.600">
          사용자
          </Box>
        )}
        {!msg.isUser && (
          <Box fontSize="sm" color="gray.600">
          챗 봇
          </Box>
        )}
        <Box
          display="flex"
          justifyContent={msg.isUser ? 'flex-end' : 'flex-start'}
          width="100%"
        >
          <span
            style={{
              backgroundColor: msg.isUser ? 'teal' : '#0A66C2',
              color: msg.isUser ? 'white' : 'white',
              borderRadius: 'lg',
              padding: '0.5rem',
              width: 'fit-content',
            }}
          >
            {msg.text}
          </span>
        </Box>
      </Flex>
    ))}
          <div ref={bottomRef} />
        </Box>
        <Flex>
          <Input
            placeholder="메시지를 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            width="400px"
            bg="gray.100"
          />
          <Button onClick={sendMessage}>보내기</Button>
        </Flex>
      </VStack>
    </Box>

  );
};

export default ChatBot;