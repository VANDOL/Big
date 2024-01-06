import { Heading, Spinner, Text, useToast, VStack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { githubLogIn } from "../api";

export default function GithubConfirm() {
  const { search } = useLocation();
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const confirmLogin = async () => {
    const params = new URLSearchParams(search);
    const code = params.get("code");
    if (code) {
      const status = await githubLogIn(code);
      if (status === 200) {
        toast({
          status: "success",
          title: "Welcome!",
          position: "bottom-right",
          description: "반갑습니다!",
        });
        queryClient.refetchQueries(["me"]);
        navigate("/");
      }
    }
  };
  useEffect(() => {
    confirmLogin();
  }, []);
  return (
    <VStack justifyContent={"center"} mt={40}>
      <Heading>로그인 중...</Heading>
      <Text>잠시만 기다려 주세요.</Text>
      <Spinner size="lg" />
    </VStack>
  );
}