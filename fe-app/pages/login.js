import { Container,Heading, Button, Card, CardBody, FormControl, FormLabel, Input} from '@chakra-ui/react'
import axios from 'axios';
import { useEffect, useState } from "react"
import { validateEmail } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react"

const Login = () => {
    const [emailAddress, setEmailAddress] = useState("")
    const [password, setPassword] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const [isEmailInvalid, setIsEmailInvalid] = useState(false)

    const router = useRouter();

    const handleEmailAddress = (event) => {
        setEmailAddress(event.target.value)
        if(!validateEmail(event.target.value)){
            setIsEmailInvalid(true)
        } else {
            setIsEmailInvalid(false)
        }
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    useEffect(()=>{
        if(!isEmailInvalid && emailAddress !== "" && password !== ""){
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [emailAddress, password])

    const login = () => {
        const data = {
            email: emailAddress,
            password: password
        }
        axios.post(`http://localhost:3300/users/login`, data)
          .then(function (response) {
            if(response && response.status == 201){
                localStorage.setItem('accessToken',response.data.accessToken )
                document.cookie=`token=${response.data.accessToken}`
                router.push('/products')
            }
          })
          .catch(function (error) {
            console.log(error);
          });
   }

    return (
        <Container maxW="1000px" className="flex  flex-col items-center p-24">
        <Heading>Login</Heading>
        <Card width="650px" className='m-8'>
         <CardBody  className={`flex flex-col items-left p-8`}>
            <FormControl isInvalid={isEmailInvalid} className='mb-6'>
                <FormLabel>Email address</FormLabel>
                <Input onChange={handleEmailAddress}  size="lg" type='email'/>
            </FormControl>
            <FormControl className='mb-6'>
                <FormLabel>Password</FormLabel>
                <Input onChange={handlePassword} size="lg" type='password'/>
            </FormControl>
            <Button colorScheme='blue' isDisabled={isDisabled} onClick={login}>Login</Button>
         </CardBody>
        </Card>
      
       </Container>
    )
}

export default Login;