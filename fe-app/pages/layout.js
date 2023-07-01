import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter;
  console.log(router.pathName);
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
