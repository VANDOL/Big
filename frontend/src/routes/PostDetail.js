import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Textarea,
  VStack
} from '@chakra-ui/react';
import { getCsrfToken } from '../api';
import useUser from '../lib/useUser'; 
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function PostDetail() {
  const { pk } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [file, setFile] = useState(null); 
  const headers = {
    'X-CSRFToken': getCsrfToken(),
  };
  const { user } = useUser();
  
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/board/posts/${pk}/`)
      .then((response) => {
        setPost(response.data);
        setEditedTitle(response.data.title);
        setEditedContent(response.data.content);
        setFile(response.data.imgfile_url);
      });
  }, [pk]);

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    const updatedData = {
      title: editedTitle,
      content: editedContent,
      file:file,
    };
    
    const formData = new FormData();
    formData.append('title', editedTitle);
    formData.append('content', editedContent);
    if (file) {
      formData.append('file', file);
    }
    console.log(pk)

    axios.post(`http://127.0.0.1:8000/board/posts/${pk}/update/`, formData, {
        headers: {
            'X-CSRFToken': getCsrfToken(),
            'Content-Type': 'multipart/form-data',
        }
    })
      .then((response) => {
        setPost(response.data);
        setEditMode(false);
        navigate('/new-board'); 
      })
      .catch((error) => {
        console.error('게시글 수정 오류:', error);
        alert('게시글을 수정하는 중 오류가 발생했습니다.');
      });
  };

  return (
    <Container maxW="container.xl" py={5}>

      {editMode ? (
        <VStack spacing={4}>
          <Input
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            placeholder="제목"
          />
          <Textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            placeholder="내용"
            minHeight="300px"
          />
          <Input type="file" onChange={handleFileChange} accept=".jpg, .jpeg, .png, .gif" />
          <Flex justify="flex-end" w="full">
            <Button colorScheme="blue" onClick={handleSave}>저장</Button>
          </Flex>
          
        </VStack>
      ) : (
        <Flex direction="column" align="stretch" w="60%" m="auto">
          <Box borderWidth="1px" borderRadius="md" p={3} mb={4}>
            <Heading fontSize="xl" mb={2}>{post?.title}</Heading>
            <Text fontSize="sm" color="gray.600">
              작성자: {post?.author_username}
            </Text>
          </Box>
          <Box borderWidth="1px" borderRadius="md" p={3} minHeight="1000px" maxHeight="1200px" overflowY="auto" textAlign={'center'} >
            {file && (
                <img 
                    src={`http://127.0.0.1:8000/${file}`} 
                    alt="Post Image" 
                    style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' , marginTop:'20px'}}
                />
            )}
            <Text mt={"20px"}>{post?.content}</Text>
          </Box>
          
          <Flex justify="flex-end" mt={4}>
            {user && user.username === post?.author_username && (
              <>
                <Button colorScheme="green" onClick={handleEdit} mr={2}>수정</Button>
                <Button colorScheme="red" onClick={() => {
              axios.delete(`http://127.0.0.1:8000/board/posts/${pk}/delete/`, { headers })
              .then(() => {
                navigate('/new-board');
              })
              .catch((error) => {
                console.error('게시글 삭제 오류:', error);
              });
                }}>
                  삭제
                </Button>
              </>
            )}
          </Flex>
        </Flex>
      )}
    </Container>
  );
}

export default PostDetail;