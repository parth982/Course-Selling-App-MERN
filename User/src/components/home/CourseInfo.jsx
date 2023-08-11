import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  Card,
  CardHeader,
  CardBody,
  Stack,
  StackDivider,
  ChakraProvider,
  extendTheme,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import CartStore from "../../state/CartStore";
import axios from "axios";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#007BFF",
      200: "#0056b3",
    },
  },
  fonts: {
    body: "Arial, sans-serif",
    heading: "Poppins, sans-serif",
  },
});

const App = () => {
  const { id } = useParams();

  const toast = useToast();
  const {
    cart,
    addToCart,
    setCourses,
    courses,
    purchasedCourses,
    setPurchasedCourses,
  } = CartStore();

  const course = courses.find((c) => c._id === id);

  const headers = {
    authorization: "Bearer " + localStorage.getItem("token"),
  };

  const getAllCoursesInfo = () => {
    axios
      .get("http://localhost:4000/users/purchasedCourses", { headers })
      .then((res) => {
        setCourses(res.data.courses);
        setPurchasedCourses(res.data.purchasedCourses);
      })
      .catch((err) =>
        toast({
          title: "Error Occurred!",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      );
  };

  const FunAddToCart = async (course) => {
    try {
      await addToCart(course);
    } catch (error) {
      alert("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    getAllCoursesInfo();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Center height="100vh">
        <Box
          mt={{ base: 10, md: "0" }}
          width={{ base: "90%", md: "800px" }}
          p="4"
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          justifyContent="space-evenly"
          borderRadius="lg"
          boxShadow="2xl"
          border="1px groove"
        >
          <Box
            mb={{ base: "4", md: "0" }}
            mr={{ base: "0", md: "30px", lg: "30px" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Center
              mb={{ base: "10px", md: "0" }}
              boxSize={{ base: "180px", md: "250px", lg: "250px" }}
              mx={{ base: "auto", md: "0" }}
              borderRadius="md"
              overflow="hidden"
            >
              <Image
                src={course?.imageLink}
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Center>
            <Heading mt="4" as="h1" fontSize={{ base: "2xl", md: "3xl" }}>
              {course?.title}
            </Heading>
            <Text fontSize={{ base: "sm", md: "md" }} my="2.5">
              {course?.description}
            </Text>

            {purchasedCourses.includes(course?._id) ? (
              <Button colorScheme="facebook" size="md">
                Purchased
              </Button>
            ) : cart.some((c) => c._id === course._id) ? (
              <Button colorScheme="orange" size="md">
                In Cart
              </Button>
            ) : (
              <Button
                variant="solid"
                colorScheme="whatsapp"
                size="md"
                onClick={() => FunAddToCart(course)}
              >
                Add to Cart
              </Button>
            )}
          </Box>
          <Box minWidth={{ base: "auto", md: "300px" }} color="white">
            <Card size="sm" bg="classy.100" borderRadius="md" boxShadow="lg">
              <CardHeader bg="lightcoral" borderRadius="md" py="4" mb={2}>
                <Heading as="h2" size="md" color="white">
                  Course Overview
                </Heading>
              </CardHeader>
              <CardBody bg="gray.300" px="4" py="3" borderRadius="md">
                <Stack
                  divider={<StackDivider borderColor="gray.200" />}
                  spacing="4"
                >
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Teaching: 20 hrs
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      View a summary of all your clients over the last month.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Quality of Content
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      View a summary of all your clients over the last month.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Beginner to Advanced
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      View a summary of all your clients over the last month.
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Practice Projects
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      View a summary of all your clients over the last month.
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
};

export default App;
