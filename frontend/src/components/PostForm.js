import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Textarea, Button, useToast, VStack } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCsrfToken } from '../api';

function PostForm() {
    const navigate = useNavigate();
    const { pk } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const [file, setFile] = useState(null);
    const [csrfToken, setCsrfToken] = useState('');

    const toast = useToast();

    // useEffect를 사용하여 컴포넌트가 렌더링될 때 한 번만 CSRF 토큰을 가져오도록 설정합니다.
    useEffect(() => {
        // CSRF 토큰을 가져오는 API 요청
        axios.get('http://127.0.0.1:8000/api/get-csrf-token/')
            .then(response => {
                setCsrfToken(response.data.csrfToken);
            })
            .catch(error => {
                console.error('CSRF 토큰을 가져오는 데 오류 발생:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        // formData.append('file', file);

        axios.post('http://127.0.0.1:8000/board/posts/create/', formData, {
            headers: {
                'X-CSRFToken': csrfToken, // CSRF 토큰 추가
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
        // if (file) {
        //     formData.append('file', file);
        // }
    
        axios.put(`http://127.0.0.1:8000/board/posts/${pk}/update/`, formData, {
            headers: {
                'X-CSRFToken':  getCsrfToken(), // CSRF 토큰 추가
                'Content-Type': 'multipart/form-data'
            }
            .then(response => {
                toast({
                    title: "게시글 업데이트 성공",
                    description: "게시글이 성공적으로 업데이트되었습니다.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate('/new-board'); // 업데이트 성공 시 페이지 이동
            })
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

    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={4}>
            <Input placeholder="제목" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="내용" value={content} onChange={e => setContent(e.target.value)} />
            {/* <Input type="file" p={1.5} onChange={e => setFile(e.target.files[0])} /> */}
            <Button colorScheme="blue" type="submit">게시</Button>
        </VStack>
    );
}

export default PostForm;