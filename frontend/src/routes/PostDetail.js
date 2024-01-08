import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Link,
  Button,
  Input
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function PostDetail() {
  const { pk } = useParams();
  const [post, setPost] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/board/posts/${pk}/`).then((response) => {
      setPost(response.data);
      setEditedTitle(response.data.title);
      setEditedContent(response.data.content);
    });
  }, [pk]);

  const handleEdit = () => {
    if (post && post.authorId && currentUser.id === post.authorId) {
      setEditMode(true);
    } else {
      alert('수정 권한이 없습니다.');
    }
  };

  const handleDelete = () => {
    if (post && currentUser.id === post.authorId) {
      axios.delete(`http://127.0.0.1:8000/board/posts/${pk}/delete/`)
        .then(() => {
          alert('게시글이 삭제되었습니다.');
          navigate('/new-board'); // 삭제 후 게시판 페이지로 리디렉트
        })
        .catch((error) => {
          console.error('Error deleting post:', error);
          alert('게시글을 삭제하는 중 오류가 발생했습니다.');
        });
    } else {
      alert('삭제 권한이 없습니다.');
    }
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSave = () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }
    

    axios.put(`http://127.0.0.1:8000/board/posts/${pk}/update/`, {
      title: editedTitle,
      content: editedContent
    })
      .then((response) => {
        setPost(response.data);
        setEditMode(false);
        navigate('/new-board');
      })
      .catch((error) => {
        console.error('Error updating post:', error);
        alert('게시글을 수정하는 중 오류가 발생했습니다.'); // 사용자에게 오류 통지
      });
  };

  return (
    <Container>
      {editMode ? (
        // 편집 모드 UI
        <>
          <Input 
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <Input 
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            multiline
          />
          <Input type="file" onChange={handleFileChange} />
          <Button onClick={handleSave}>저장</Button>
        </>
      ) : (
        // 일반 보기 모드 UI
        <Box>
          <Flex>
            <Heading>{post?.title}</Heading>
            <Text>{post?.content}</Text>
            {currentUser.id === post?.authorId && (
              <>
                <Button onClick={handleEdit}>수정</Button>
                <Button colorScheme="red" onClick={handleDelete}>삭제</Button>
              </>
            )}
          </Flex>
        </Box>
      )}
    </Container>
  );
}

export default PostDetail;