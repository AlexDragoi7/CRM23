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
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import Layout from "../layout";

import axios from "axios";
import { useToast } from "@chakra-ui/react";

const AddProduct = () => {
  const router = useRouter();
  const toast = useToast();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [isDescriptionInvalid, setIsDescriptionInvalid] = useState(false);
  const [isProductNameInvalid, setIsProductNameInvalid] = useState(false);

  let token;

  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("accessToken");
  }

  const handleProductName = (event) => {
    setProductName(event.target.value);
    if (event.target.value.length <= 255) {
      setIsProductNameInvalid(false);
    } else {
      setIsProductNameInvalid(true);
    }
  };

  const handleProductDescription = (event) => {
    setProductDescription(event.target.value);
    if (event.target.value.length <= 255) {
      setIsDescriptionInvalid(false);
    } else {
      setIsDescriptionInvalid(true);
    }
  };

  const handleProductQuantity = (valueString) => {
    console.log(Number(valueString));
    setProductQuantity(Number(valueString));
  };

  const handleCategorySelection = (event) => {
    setCategoryId(Number(event.target.value));
  };

  const getCatergories = async () => {
    const config = {
      withCredentials: true,
    };
    await axios
      .get("http://localhost:3300/categories", config)
      .then((response) => {
        if (response.data) {
          setCategories(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewProduct = async () => {
    const config = {
      withCredentials: true,
    };

    const data = {
      product_name: productName,
      product_description: productDescription,
      product_quantity: productQuantity,
      category_id: categoryId,
    };

    axios
      .post(`http://localhost:3300/products`, data, config)
      .then(function (response) {
        if (response.data.id) {
          toast({
            title: "Product created",
            description: "Your product has been created",
            status: "success",
            position: "top-right",
            duration: 5000,
            isClosable: true,
          });
          router.push("/products");
        }
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
      getCatergories();
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
          Add new product
        </Heading>
        <FormControl isInvalid={isProductNameInvalid} mb="8">
          <FormLabel>Product name</FormLabel>
          <Input value={productName} onChange={handleProductName} type="text" />
          <FormErrorMessage>
            Product name length (max 255) exceeded.
          </FormErrorMessage>
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
        <FormControl isInvalid={isDescriptionInvalid} mb="8">
          <FormLabel>Description</FormLabel>
          <Textarea
            value={productDescription}
            onChange={handleProductDescription}
            size="sm"
          ></Textarea>
          <FormErrorMessage>
            Description length (max 255) exceeded.
          </FormErrorMessage>
        </FormControl>

        <FormControl mb="8">
          <FormLabel>Category</FormLabel>
          <Select
            placeholder="Select category"
            value={categoryId}
            onChange={handleCategorySelection}
          >
            {categories.map((category, key) => (
              <option value={category.id} key={key}>
                {category.category_name}
              </option>
            ))}
          </Select>
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
        <Button variant="solid" colorScheme="blue" onClick={addNewProduct}>
          {" "}
          Save
        </Button>
      </Box>
    </main>
  );
};

AddProduct.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default AddProduct;
