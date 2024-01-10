import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaUserNinja, FaLock } from "react-icons/fa";
import SocialLogin from "./SocialLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  emailLogIn, // 'usernameLogIn' 대신 'emailLogIn'을 import
} from "../api";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IForm {
  email: string;
  password: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>();
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation(emailLogIn, {
    onSuccess: (status) => {
      if (status && !status.error) {
        toast({
          title: "Welcome back!",
          status: "success",
        });
        onClose();
        queryClient.refetchQueries(["me"]);
      } else {
        toast({
          title: "Login failed.",
          status: "error",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "An error occurred. Please try again later.",
        status: "error",
      });
    },
  });


  const onSubmit = ({ email, password }: IForm) => {
    mutation.mutate({ email, password });
  };  
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Log in</ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <InputGroup size={"md"}>
              <InputLeftElement
                children={<Box color="gray.500"><FaUserNinja /></Box>}
              />
              <Input
                isInvalid={Boolean(errors.email?.message)}
                {...register("email", {
                  required: "Please write a email",
                })}
                variant={"filled"}
                placeholder="Id"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement
                children={<Box color="gray.500"><FaLock /></Box>}
              />
              <Input
                isInvalid={Boolean(errors.password?.message)}
                {...register("password", {
                  required: "Please write a password",
                })}
                type="password"
                variant={"filled"}
                placeholder="Password"
              />
            </InputGroup>
          </VStack>
          {mutation.isError && (
            <Text color="red.500" textAlign={"center"} fontSize="sm">
              Email or Password is incorrect
            </Text>
          )}
          <Button
            isLoading={mutation.isLoading}
            type="submit"
            mt={4}
            colorScheme={"red"}
            w="100%"
            marginBottom={10}
          >
            Log in
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}