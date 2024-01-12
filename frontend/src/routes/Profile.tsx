import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, FormControl, FormLabel, Input, Heading, Button } from "@chakra-ui/react";


const Profile = () => {
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");  
  const [currentPassword, setCurrentPassword] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        console.log("Auth Token:", authToken);
        const response = await axios.get('http://127.0.0.1:8000/user/me', {
        headers: {
          'Authorization': `Token ${authToken}`
          },
        });
        setName(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    try {
      const authToken = localStorage.getItem("authToken");
      await axios.put('http://127.0.0.1:8000/user/change-password', 
        {
          old_password: oldPassword,
          new_password: newPassword
        }, 
        {
          headers: {
            'Authorization': `Token ${authToken}`
          }
        }
      );
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');

      alert("비밀번호가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error('비밀번호 변경 중 오류가 발생했습니다:', error);
      alert("비밀번호 변경에 실패했습니다.");
    }
  };
  
  const handlePasswordUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (!password || password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    try {
      await updatePassword(currentPassword, password);
    } catch (error) {
    }
  };

  return (
    <Box maxWidth="500px" margin="0 auto" p={5}>
      <Heading mb={5}>프로필</Heading>

      <FormControl mb={3}>
        <FormLabel>이름:</FormLabel>
        <Input type="text" value={name} isReadOnly />
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>이메일:</FormLabel>
        <Input type="email" value={email} isReadOnly />
      </FormControl>

      <Heading size="md" mt={10} mb={3}>비밀번호 변경</Heading>
      <form onSubmit={handlePasswordUpdate}>
        <FormControl mb={3}>
          <FormLabel>현재 비밀번호:</FormLabel>
          <Input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>새 비밀번호:</FormLabel>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <FormControl mb={3}>
          <FormLabel>비밀번호 확인:</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </FormControl>
        <Button colorScheme="teal" type="submit">비밀번호 변경</Button>
      </form>
    </Box>
  );
};

export default Profile;