import {
  Box,
  CardBody,
  Card,
  Heading,
  Divider,
  CardFooter,
  Stack,
  Image,
  Text,
  Center,
  Button,
  SimpleGrid,
  useToast,
} from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect } from "react";
import CartStore from "../../state/CartStore";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const toast = useToast();
  const { setCourses, courses, purchasedCourses, setPurchasedCourses } =
    CartStore();

  const navigate = useNavigate();

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
          title: "Error Occured!",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      );
  };

  useEffect(() => {
    setInterval(() => getAllCoursesInfo(), 1000);
  }, []);

  return (
    <>
      {courses?.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <SimpleGrid
          padding={10}
          width={"92%"}
          margin={"auto"}
          columns={{ base: "1", md: "2", lg: "3" }}
          spacingY={5}
          spacingX={5}
        >
          {courses?.map((course) => (
            <Box
              key={course._id}
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              <Card maxW="sm" border={"1px solid"}>
                <CardBody>
                  <Center>
                    <Image src={course.imageLink} boxSize="150px" />
                  </Center>
                  <Stack mt="6" spacing="3">
                    <Heading size="md">Title: {course.title}</Heading>
                    <Heading size="sm">
                      Description: {course.description}
                    </Heading>
                    <Text>Price: {course.price}</Text>
                  </Stack>
                </CardBody>

                <Divider />

                {/* <CardFooter justifyContent={"center"}>
                  {purchasedCourses.includes(course._id) ? (
                    <Box
                      color={"white"}
                      bg={"blue"}
                      p={"6px 10px"}
                      borderRadius={"14px"}
                    >
                      Already Purchased
                    </Box>
                  ) : cart.some((c) => c._id === course._id) ? (
                    <Box
                      color={"white"}
                      bg={"orange"}
                      p={"6px 10px"}
                      borderRadius={"14px"}
                    >
                      In Cart
                    </Box>
                  ) : (
                    <Button
                      variant="solid"
                      colorScheme="whatsapp"
                      onClick={() => FunAddToCart(course)}
                    >
                      Purchase
                    </Button>
                  )}

                </CardFooter> */}
              </Card>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default Courses;
