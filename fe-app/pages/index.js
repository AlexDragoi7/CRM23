import { Heading, Button, Card, CardBody} from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
     <Heading>Welcome to your Dashboard</Heading>
     <Card className='m-8'>
      <CardBody  className={`flex flex-col items-left p-8`}>
        <p className='mb-6'>To access your dashboard and manage all your products, you must login</p>
        <Button colorScheme='blue' onClick={()=> router.push('/login')}>Login</Button>
        <p className='mt-6'>If you don't have an account already, you can create your account <Link className='signup-link' href={'/signup'}>here</Link>.</p>
        
      </CardBody>
     </Card>
   
    </main>
  )
}
