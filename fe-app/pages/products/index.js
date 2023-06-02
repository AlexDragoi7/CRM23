
import {useRouter} from "next/navigation"
import { useEffect } from "react"
import axios from 'axios'

const Products = () => {
    const router = useRouter();
    let token;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        token = localStorage.getItem('accessToken')
    }
      
    const getAllProducts = async () => {
        const config = {
            withCredentials: true,
        };
        await axios.get("http://localhost:3300/products", config).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    const getAllCategories = async () => {
        const config = {
            withCredentials: true,
        };
        await axios.get("http://localhost:3300/categories", config).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(()=>{
        if(!token){
            router.push('/login')
        } else {
            getAllProducts()
            getAllCategories()
        }
    }, [token])

    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <p>Products page</p>
        </main>
    )
      
}
   

export default Products;
