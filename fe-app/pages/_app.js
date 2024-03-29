import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
// import Layout from "./layout";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
