import React, { useState } from 'react';
import axios from 'axios';
import { Input, Textarea, Button, useToast, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
function getCsrfToken() {
    const csrfToken = document.cookie.split(';')
      .map(cookie => cookie.trim())
      .find(cookie => cookie.startsWith('csrftoken='));
    
    return csrfToken ? csrfToken.split('=')[1] : null;
}


function PostForm() {
    const navigate = useNavigate();
        const { pk } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const toast = useToast();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', file);

        axios.post('http://127.0.0.1:8000/board/posts/create/', formData, {
            headers: {
                'X-CSRFToken': getCsrfToken(),
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            toast({
                title: "게시글 작성 성공",
                description: "게시글이 성공적으로 작성되었습니다.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate('/new-board');
        }).catch(error => {
            toast({
                title: "오류 발생",
                description: `오류가 발생했습니다: ${error.message}`,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        });
    };
    const handleUpdate = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            formData.append('file', file);
        }
    
        axios.put(`http://127.0.0.1:8000/board/posts/${pk}/update/`, formData, {
            headers: {
                'X-CSRFToken': getCsrfToken(),
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            // 성공적으로 수정되었을 때의 로직
        }).catch(error => {
            // 오류 처리
        });
    };
    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={4}>
            <Input placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="내용" value={content} onChange={e => setContent(e.target.value)} />
            <Input type="file" p={1.5} onChange={e => setFile(e.target.files[0])} />
            <Button colorScheme="blue" type="submit">게시</Button>
        </VStack>
    );
}

export default PostForm;