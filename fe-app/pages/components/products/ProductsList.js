import {
  Heading,
  Button,
  Card,
  CardBody,
  Stack,
  Text,
  Image,
  ButtonGroup,
  Divider,
  CardFooter,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProductList = ({
  products,
  openDeleteModal,
  getProductCategoryName,
  userProducts,
}) => {
  const router = useRouter();
  let userID;
  if (typeof window !== "undefined") {
    userID = localStorage.getItem("userId");
  }

  let productsList = [];

  if (userProducts) {
    productsList = products;
  } else {
    productsList = products.filter(
      (product) => product.user_id !== Number(userID)
    );
  }

  return (
    <>
      {productsList.map((product, key) => (
        <Card maxW="sm" mb="6" key={key}>
          <CardBody>
            <Image
              src="https://alloutco.com/wp-content/uploads/2020/12/product-placeholder.jpg"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Stack mt="6" spacing="3">
              <Heading size="md">{product.product_name}</Heading>
              <Text>{product.product_description}</Text>
              <Text color="grey.700" fontSize="md">
                Quantity: {product.product_quantity}
              </Text>
              <Text color="grey.700" fontSize="md">
                Category: {getProductCategoryName(product.category_id)}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing="2">
              <Button
                isDisabled={product.user_id !== Number(userID)}
                variant="outline"
                colorScheme="blue"
                onClick={() => router.push(`/products/${product.id}`)}
              >
                Edit
              </Button>
              <Button
                isDisabled={product.user_id !== Number(userID)}
                variant="solid"
                colorScheme="red"
                onClick={() => openDeleteModal(product.id)}
              >
                Delete
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProductList;
