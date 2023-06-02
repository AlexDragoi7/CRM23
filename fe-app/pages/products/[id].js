import {useRouter} from "next/navigation"
import { useEffect } from "react"

const ProductDetails = () => {
    const router = useRouter();
    let token;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        token = localStorage.getItem('accessToken')
      }
      console.log(token)

      useEffect(()=>{
        if(!token){
            router.push('/login')
        }
      }, [token])
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <p>Product page</p>
        </main>
    )
}

export default ProductDetails