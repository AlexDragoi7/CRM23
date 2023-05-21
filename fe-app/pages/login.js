import { Container,Heading, Button, Card, CardBody, FormControl, FormLabel, Input} from '@chakra-ui/react'

const Login = () => {
    return (
        <Container maxW="1000px" className="flex  flex-col items-center p-24">
        <Heading>Login</Heading>
        <Card width="650px" className='m-8'>
         <CardBody  className={`flex flex-col items-left p-8`}>
            <FormControl className='mb-6'>
                <FormLabel>Email address</FormLabel>
                <Input  size="lg" type='email'/>
            </FormControl>
            <FormControl className='mb-6'>
                <FormLabel>Password</FormLabel>
                <Input size="lg" type='password'/>
            </FormControl>
            <Button colorScheme='blue'>Login</Button>
         </CardBody>
        </Card>
      
       </Container>
    )
}

export default Login;