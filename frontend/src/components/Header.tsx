import { FcMindMap } from "react-icons/fc";
import { FaMoon, FaSun } from "react-icons/fa";
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  LightMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  ToastId,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import useUser from "../lib/useUser";
import { logOut } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Text } from "@chakra-ui/react";
import React, { useState } from 'react';
import { BsChatDots } from 'react-icons/bs';
import ChatBot from '../routes/ChatBot';
import '../css/Header.css'
import HeaderImage from '../img/Header_img/Header_img.png' 
import HeaderImage2 from '../img/Header_img/Header_img2.png' 

//로그인 상태에서만 챗봇 이용허가
const ChatbotIcon =  ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [showChat, setShowChat] = useState(false);

  const handleChatIconClick = () => {
    if (isLoggedIn) {
      setShowChat(!showChat);
    } else {
      alert('로그인이 필요한 서비스입니다. 로그인해주세요.');
    }
  };
  // 챗봇 UI
  return (
    <>
      <Box position="fixed" bottom="90px" right="50px" style={{ display: showChat ? 'block' : 'none',}}>
        <ChatBot />
      </Box>
      <IconButton
        icon={<BsChatDots />}
        colorScheme="teal"
        borderRadius="full"
        size="lg"
        aria-label="챗봇 열기"
        onClick={handleChatIconClick}
        position="fixed" // 아이콘 버튼을 고정 위치에 두기
        bottom="50px" // 아이콘 버튼의 위치 조정
        right="50px"
      />
    </>
  );
};

//로그인, 회원가입 창, 게시판 링크 & 로그인 상태에서만 게시판 접근허용
export default function Header() {
  const { userLoading, isLoggedIn, user } = useUser();
  const {
    isOpen: isLoginOpen,
    onClose: onLoginClose,
    onOpen: onLoginOpen,
  } = useDisclosure();
  const {
    isOpen: isSignUpOpen,
    onClose: onSignUpClose,
    onOpen: onSignUpOpen,
  } = useDisclosure();
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("red.500", "red.200");
  const Icon = useColorModeValue(FaMoon, FaSun);
  const toast = useToast();
  const queryClient = useQueryClient();
  const toastId = useRef<ToastId>();
  const mutation = useMutation(logOut, {
    onMutate: () => {
      toastId.current = toast({
        title: "Login out...",
        description: "이용해 주셔서 감사합니다.",
        status: "loading",
        duration: 10000,
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      if (toastId.current) {
        queryClient.refetchQueries(["me"]);
        toast.update(toastId.current, {
          status: "success",
          title: "Done!",
          description: "See you later!",
        });
      }
    },
  });
  const onLogOut = async () => {
    mutation.mutate();
  };

  const handleBoardClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isLoggedIn) {
      alert('게시판을 사용하기 위해서는 로그인이 필요합니다.');
      event.preventDefault();
      return;
    }
  };

  return (
    <Stack
      justifyContent={"space-between"}
      alignItems="center"
      py={5}
      px={40}
      direction={{
        sm: "column",
        md: "row",
      }}
      spacing={{
        sm: 4,
        md: 0,
      }}
      borderBottomWidth={1}
      zIndex={50}
    >
     <div className="ring">
      <div className="ring2"></div>
      <Box color={logoColor}>
        <Link to={"/"}>
          <HStack>
            <img src={HeaderImage} alt='icon' width={"40"} height={"40"} />
            {/* <Text color="#0A66C2" fontSize="lg">요식이지</Text> */}
            
            <img className="m-side" src={HeaderImage2} alt="" />
          </HStack>
        </Link>
      </Box>
      <div className="ring3"></div>
      <div className="ring4"></div>
    </div>

      <HStack spacing={1}>      
        <Link to="/new-board" onClick={handleBoardClick} style={{marginRight:"20px"}}>게시판</Link>

        {!userLoading ? (
          !isLoggedIn ? (
            <>
              <Button onClick={onLoginOpen}>Log in</Button>
              <LightMode>
                <Link to="/signup">
                  <Button onClick={onSignUpOpen} colorScheme={"red"}>
                    Sign up
                  </Button>
                </Link>
              </LightMode>
            </>
          ) : (
            <Menu>
              <MenuButton>
                <Avatar name={user?.name} src={user?.avatar} size={"md"} />
              </MenuButton>
              <MenuList>
                <Link to="/profile">
                  <MenuItem>Profile</MenuItem>
                </Link>
                <MenuItem onClick={onLogOut}>Log out</MenuItem>
              </MenuList>
            </Menu>
          )
        ) : null}
      </HStack>

      <LoginModal isOpen={isLoginOpen} onClose={onLoginClose} />
      {/* 챗봇 아이콘 컴포넌트 추가 */}
      <ChatbotIcon isLoggedIn={isLoggedIn} />
    </Stack>
  );
}