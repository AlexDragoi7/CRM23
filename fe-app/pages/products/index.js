import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Heading,
  Button,
  HStack,
  Box,
  Text,
  SimpleGrid,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

import axios from "axios";
import Layout from "../layout";
import ProductList from "../components/products/ProductsList";

const Products = () => {
  console.log("page loaded");
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productIdToBeRevemoved, setProductIdToBeRemoved] = useState(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("accessToken");
  }

  const openDeleteModal = (productId) => {
    setProductIdToBeRemoved(productId);
    onOpen();
  };

  const getAllProducts = async () => {
    const config = {
      withCredentials: true,
    };
    await axios
      .get("http://localhost:3300/products", config)
      .then((response) => {
        console.log(response);
        if (response.data) {
          setProducts(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllCategories = async () => {
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

  const getMyProducts = async () => {
    const config = {
      withCredentials: true,
    };
    await axios
      .get("http://localhost:3300/products/myproducts", config)
      .then((response) => {
        console.log(response);
        if (response.data) {
          setMyProducts(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = async () => {
    const config = {
      withCredentials: true,
    };

    await axios
      .delete(
        `http://localhost:3300/products/${productIdToBeRevemoved}`,
        config
      )
      .then((response) => {
        console.log(response);
        getMyProducts();
        getAllProducts();
        onClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getProductCategoryName = (product_category_id) => {
    const categoryItem = categories.find(
      (category) => category.id === product_category_id
    );

    if (categoryItem) {
      return categoryItem.category_name;
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      getAllProducts();
      getMyProducts();
      getAllCategories();
    }
  }, [token]);

  return (
    <main className="min-h-screen p-24">
      <HStack mb="20" justifyContent="space-between" display="flex">
        <Box>
          <Heading size="xl">My Products</Heading>
        </Box>
        <Box>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => router.push("products/add")}
          >
            Add new product
          </Button>
        </Box>
      </HStack>

      <SimpleGrid columns={4} spacingX="40px" spacingY="20px">
        <ProductList
          products={myProducts}
          getProductCategoryName={getProductCategoryName}
          openDeleteModal={openDeleteModal}
        ></ProductList>
      </SimpleGrid>

      <HStack mb="20" mt="20" justifyContent="space-between" display="flex">
        <Box>
          <Heading size="xl">All Products</Heading>
        </Box>
      </HStack>

      <SimpleGrid columns={4} spacingX="40px" spacingY="20px">
        <ProductList
          products={products}
          getProductCategoryName={getProductCategoryName}
          openDeleteModal={openDeleteModal}
        ></ProductList>
      </SimpleGrid>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Are you sure you want to delete this product?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              This product will be deleted permanently. You cannot undo this
              action.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button colorScheme="red" variant="solid" onClick={deleteProduct}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </main>
  );
};

Products.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Products;
