import {
  Container,
  Heading,
  Button,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { validateEmail } from "@/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

const Signup = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [userFullName, setUserFullName] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  const toast = useToast();
  const router = useRouter();

  const handleEmailAddress = (event) => {
    setEmailAddress(event.target.value);
    if (!validateEmail(event.target.value)) {
      setIsEmailInvalid(true);
    } else {
      setIsEmailInvalid(false);
    }
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleUserFullName = (event) => {
    setUserFullName(event.target.value);
  };

  useEffect(() => {
    if (
      !isEmailInvalid &&
      emailAddress !== "" &&
      password !== "" &&
      userFullName !== ""
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [emailAddress, password, userFullName]);

  const signup = () => {
    const data = {
      email: emailAddress,
      password: password,
      user_name: userFullName,
    };
    axios
      .post(`http://localhost:3300/users/signup`, data)
      .then(function (response) {
        console.log(response);
        toast({
          title: "Account created",
          description: "Your account has been created",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
        if (response && response.status == 201) {
          router.push("/login");
        }
      })
      .catch(function (error) {
        console.error(error);
        toast({
          title: "Error",
          description: "Please verify your information.",
          status: "error",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  return (
    <Container maxW="1000px" className="flex  flex-col items-center p-24">
      <Heading>Signup</Heading>
      <Card width="650px" className="m-8">
        <CardBody className={`flex flex-col items-left p-8`}>
          <FormControl className="mb-6">
            <FormLabel>Full Name</FormLabel>
            <Input onChange={handleUserFullName} size="lg" />
          </FormControl>
          <FormControl isInvalid={isEmailInvalid} className="mb-6">
            <FormLabel>Email address</FormLabel>
            <Input onChange={handleEmailAddress} size="lg" type="email" />
          </FormControl>
          <FormControl className="mb-6">
            <FormLabel>Password</FormLabel>
            <Input onChange={handlePassword} size="lg" type="password" />
          </FormControl>
          <Button colorScheme="blue" isDisabled={isDisabled} onClick={signup}>
            Signup
          </Button>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Signup;
