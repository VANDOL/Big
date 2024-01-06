import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Box, Button, Text, Heading, VStack } from '@chakra-ui/react';

function BulletinBoard() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/board/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <VStack spacing={4} align="stretch">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: '800px' }}>
          <div style={{ borderBottom: '2px solid #000', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>전체글보기</strong>
            </div>
            <div>
              <Link to="/create-post" style={{ border: '2px solid #000', padding: '5px 10px', borderRadius: '4px', color: '#000', textDecoration: 'none' }}>글쓰기</Link>
            </div>
          </div>
        </div>
        {posts.map(post => (
          <Link to={`/posts/${post.pk}`} key={post.pk} style={{ textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: '800px' }}>
            <div style={{ borderBottom: '1px solid #ddd', padding: '10px', display: 'flex', alignItems: 'center' }}>
              <div style={{ marginLeft: '10px', marginRight: '10px', minWidth: '50px', flex: '1' }}>
                <span style={{ fontSize: '16px' }}>•</span> {/* 중간 크기로 점 설정 */}
              </div>
              <div style={{ flex: '4', minWidth: '200px', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <strong>{post.fields.title}</strong>
              </div>
              <div style={{ flex: '2', minWidth: '100px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {post.fields.author}
              </div>
              <div style={{ flex: '3', minWidth: '150px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {new Date(post.fields.created_at).toLocaleDateString()} {/* 년 월 일만 표시 */}
              </div>
              <div style={{ flex: '1' }}>
                {post.fields.viewCount}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </VStack>
  );
}

export default BulletinBoard;