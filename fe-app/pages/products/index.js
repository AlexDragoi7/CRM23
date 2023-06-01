import {useRouter} from "next/navigation"

const Products = () => {
    const token = localStorage.getItem('accessToken')
    if(!token){
        router.push('/404')
    }
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <p>Products page</p>
        </main>
    )
}

export default Products;