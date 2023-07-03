import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Textarea,
  Button,
} from "@chakra-ui/react";
import Layout from "../layout";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function ProductDetails({ id }) {
  const router = useRouter();
  const toast = useToast();

  const [product, setProduct] = useState({});
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");

  let token;

  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("accessToken");
  }

  const handleProductName = (event) => {
    setProductName(event.target.value);
  };

  const handleProductDescription = (event) => {
    setProductDescription(event.target.value);
  };

  const handleProductQuantity = (valueString) => {
    setProductQuantity(Number(valueString));
  };

  const getProductData = async () => {
    const config = {
      withCredentials: true,
    };

    await axios
      .get(`http://localhost:3300/products/${id}`, config)
      .then((response) => {
        if (response.data) {
          setProduct(response.data);
          setProductName(response.data.product_name);
          setProductDescription(response.data.product_description);
          setProductQuantity(response.data.product_quantity);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const saveProductData = async () => {
    const config = {
      withCredentials: true,
    };
    const data = {
      product_name: productName,
      product_description: productDescription,
      product_quantity: productQuantity,
    };

    axios
      .patch(`http://localhost:3300/products/${id}`, data, config)
      .then(function (response) {
        console.log(response);
        getProductData();
        toast({
          title: "Product updated",
          description: "Your product has been updated",
          status: "success",
          position: "top-right",
          duration: 5000,
          isClosable: true,
        });
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

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      getProductData();
    }
  }, [token]);

  return (
    <main className="min-h-screen p-24">
      <Box
        backgroundColor="white"
        maxW="3xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        pt="20"
        pb="20"
        pl="10"
        pr="10"
      >
        <Heading size="xl" mb="6">
          {product.product_name}
        </Heading>
        <FormControl mb="8">
          <FormLabel>Product name</FormLabel>
          <Input value={productName} onChange={handleProductName} type="text" />
        </FormControl>
        <FormControl mb="8">
          <FormLabel>Quantity</FormLabel>
          <NumberInput
            value={productQuantity}
            onChange={handleProductQuantity}
            max={50}
            min={10}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl mb="8">
          <FormLabel>Description</FormLabel>
          <Textarea
            value={productDescription}
            onChange={handleProductDescription}
            size="sm"
          ></Textarea>
        </FormControl>
        <Button
          mr="6"
          variant="outline"
          colorScheme="blue"
          onClick={() => router.push("/products")}
        >
          {" "}
          Cancel
        </Button>
        <Button variant="solid" colorScheme="blue" onClick={saveProductData}>
          {" "}
          Save
        </Button>
      </Box>
    </main>
  );
}

ProductDetails.getInitialProps = ({ query: { id } }) => {
  return { id };
};

ProductDetails.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};
