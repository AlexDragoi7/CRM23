import {
  Container,
  Heading,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Stack,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordDoNoMatch, setPasswordsDoNotMatch] = useState(false);
  const toast = useToast();

  const handlePassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmNewPassword(event.target.value);
    if (event.target.value === newPassword) {
      setPasswordsDoNotMatch(false);
    } else {
      setPasswordsDoNotMatch(true);
    }
  };

  const resetPassword = async () => {
    const config = {
      withCredentials: true,
    };
    const data = {
      new_password: newPassword,
    };
    axios
      .post(`http://localhost:3300/users/resetpassword`, data, config)
      .then(function (response) {
        console.log(response);
        if (response && response.status == 201) {
          //   localStorage.setItem("accessToken", response.data.accessToken);
          //   document.cookie = `token=${response.data.accessToken}`;
          //   router.push("/products");
        }
      })
      .catch(function (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Something went wrong. Please verify your information.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  return (
    <Container maxW="1000px" className="flex  flex-col items-center p-24">
      <Heading>Reset your password</Heading>
      <Card width="650px" className="m-8">
        <CardBody className={`flex flex-col items-left p-8`}>
          <FormControl className="mb-6">
            <FormLabel>New password</FormLabel>
            <Input
              value={newPassword}
              onChange={handlePassword}
              size="lg"
              type="password"
            />
          </FormControl>
          <FormControl isInvalid={passwordDoNoMatch} className="mb-6">
            <FormLabel>Confirm new password</FormLabel>
            <Input
              value={confirmNewPassword}
              onChange={handleConfirmPassword}
              size="lg"
              type="password"
            />
            <FormErrorMessage>Passwords do no match</FormErrorMessage>
          </FormControl>
          <Button colorScheme="blue" onClick={resetPassword}>
            Reset Password
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};
export default ResetPassword;
