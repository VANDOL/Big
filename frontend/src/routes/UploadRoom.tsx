import {
    Box,
    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    VStack,
  } from "@chakra-ui/react";
  import { FaBed, FaMoneyBill, FaToilet, FaUsb } from "react-icons/fa";
import useHostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";

export default function UploadRoom() {
  useHostOnlyPage();
  return (
    <ProtectedPage>
      <Box
        pb={40}
        mt={10}
        px={{
          base: 10,
          lg: 40,
        }}
      >
        <Container>
          <Heading textAlign={"center"}>Upload Room</Heading>
          <VStack spacing={5} as="form" mt={5}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input required type="text" />
              <FormHelperText>Write the name of your room.</FormHelperText>
            </FormControl>
          </VStack>
        </Container>
      </Box>
    </ProtectedPage>
  );
}