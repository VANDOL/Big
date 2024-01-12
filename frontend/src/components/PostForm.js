import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Textarea, Button, useToast, VStack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import useUser from "../lib/useUser"; // Import useUser hook
// 
function PostForm() {
    const navigate = useNavigate();
    const { pk } = useParams();
    const toast = useToast();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // const [file, setFile] = useState(null);
    const { user } = useUser();
    const [csrfToken, setCsrfToken] = useState("");
    const { isLoggedIn } = useUser(); // Use useUser hook to check login status
    const [file, setFile] = useState(null);
// csrf토큰 발급
    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/get-csrf-token/")
            .then((response) => {
                setCsrfToken(response.data.csrfToken);
            })
            .catch((error) => {
                console.error("CSRF 토큰을 가져오는 데 오류 발생:", error);
            });
    }, []);
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
// 로그인 후 게시글 작성 접근허가
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            toast({
                title: "권한 없음",
                description: "로그인 후 게시글을 작성할 수 있습니다.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
// 게시글 작성 폼
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (file) {
            formData.append("file", file); // Append file if it exists
        }
        formData.append("author", user.email);
// 작성요청 백엔드 전달
        axios
            .post("http://127.0.0.1:8000/board/posts/create/", formData, {
                headers: {
                    "X-CSRFToken": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            })
// 작성성공 메시지
            .then((response) => {
                if (response.status === 201) {
                    toast({
                        title: "게시글 작성 성공",
                        description: "게시글이 성공적으로 작성되었습니다.",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                    });
                    navigate("/new-board");
                } else {
                    toast({
                        title: "오류 발생",
                        description: "서버에서 오류가 발생했습니다.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            })
// 작성실패 메시지
            .catch((error) => {
                if (error.response && error.response.status === 400) {
                    toast({
                        title: "오류 발생",
                        description:
                            "올바른 파일 형식이 아닙니다.\nJPG, JPEG, PNG, GIF 파일만 허용됩니다.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                } else {
                    toast({
                        title: "오류 발생",
                        description: `오류가 발생했습니다: ${error.message}`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    });
                }
            });
    };
// 로그인 후 게시글 수정허가
    const handleUpdate = (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            toast({
                title: "권한 없음",
                description: "로그인 후 게시글을 업데이트할 수 있습니다.",
                status: "warning",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
// 게시글 수정 폼
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (file) {
            formData.append("file", file);
        }
// 수정요청 백엔드 전달
        axios
            .put(`http://127.0.0.1:8000/board/posts/${pk}/update/`, formData, {
                headers: {
                    "X-CSRFToken": csrfToken,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                toast({
                    title: "게시글 업데이트 성공",
                    description: "게시글이 성공적으로 업데이트되었습니다.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                });
                navigate("/new-board");
            })
            .catch((error) => {
                toast({
                    title: "오류 발생",
                    description: `오류가 발생했습니다: ${error.message}`,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            });
    };
// 게시글 css
    return (
        <VStack
            as="form"
            onSubmit={handleSubmit}
            spacing={4}
            align="stretch"
            m="4" // margin
            p="4" // padding
            bg="white" // background color
            boxShadow="md" // medium box shadow
            borderRadius="md" // medium border radius
            width={"1000px"}
            marginLeft={"auto"}
            marginRight={"auto"}
        >
            <Input
                placeholder="제목"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                size="md" // medium size
                variant="filled" // filled variant
            />
            <Textarea
                placeholder="내용"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                size="md"
                variant="filled"
                height={"500px"}
            />
            <Input
                type="file"
                onChange={handleFileChange}
                p="1" // padding
                borderColor="gray.200" // border color
                accept=".jpg, .jpeg, .png, .gif"
            />
            <Button
                colorScheme="blue"
                type="submit"
                size="lg" // large size
                width="full" // full width
            >
                게시
            </Button>
        </VStack>
    );
}

export default PostForm;
