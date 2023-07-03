import {
  Container,
  Heading,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { validateEmail } from "../utils/index";

const ResetPassword = () => {
  const router = useRouter();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordDoNoMatch, setPasswordsDoNotMatch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handlePassword = (event) => {
    setNewPassword(event.target.value);
  };

  const handleEmailAddress = (event) => {
    setEmail(event.target.value);
    if (!validateEmail(event.target.value)) {
      setIsEmailInvalid(true);
    } else {
      setIsEmailInvalid(false);
    }
  };

  const handleConfirmPassword = (event) => {
    setConfirmNewPassword(event.target.value);
    if (event.target.value === newPassword) {
      setPasswordsDoNotMatch(false);
    } else {
      setPasswordsDoNotMatch(true);
    }
  };

  useEffect(() => {
    if (
      !isEmailInvalid &&
      email !== "" &&
      newPassword !== "" &&
      confirmNewPassword !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, newPassword, confirmNewPassword]);

  const resetPassword = async () => {
    const config = {
      withCredentials: true,
    };
    const data = {
      email: email,
      new_password: newPassword,
    };

    axios
      .patch(`http://localhost:3300/users/resetpassword`, data, config)
      .then(function (response) {
        if (response && response.status == 200) {
          toast({
            title: "Success",
            description: "Your password has been updated.",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
            onCloseComplete: () => {
              router.push("/login");
            },
          });
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
          <FormControl isInvalid={isEmailInvalid} className="mb-6">
            <FormLabel>Email</FormLabel>
            <Input
              value={email}
              onChange={handleEmailAddress}
              size="lg"
              type="email"
            />
          </FormControl>
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
          <Button
            isDisabled={isDisabled}
            colorScheme="blue"
            onClick={resetPassword}
          >
            Reset Password
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};
export default ResetPassword;
