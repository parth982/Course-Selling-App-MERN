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
import React, { useEffect, useState } from "react";

const Courses = () => {
  const toast = useToast();
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);

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
    // Fetch initial data
    getAllCoursesInfo();
    // Set interval to fetch data every 3 seconds
    const interval = setInterval(getAllCoursesInfo, 1000);
    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const buyCourse = (courseId) => {
    const originalPurchasedCourse = [...purchasedCourses];
    setPurchasedCourses([...purchasedCourses, courseId]);
    axios
      .put("http://localhost:4000/users/courses/" + courseId, {}, { headers })
      .then((res) => {
        toast({
          title: "Course Purchased!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        setPurchasedCourses(originalPurchasedCourse);
      });
  };

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
            <Box key={course._id}>
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

                <CardFooter>
                  {purchasedCourses.includes(course._id) ? (
                    <Box
                      color={"white"}
                      bg={"blue"}
                      p={"6px 6px"}
                      borderRadius={"14px"}
                    >
                      Already Purchased
                    </Box>
                  ) : (
                    <Button
                      variant="solid"
                      colorScheme="whatsapp"
                      onClick={() => buyCourse(course._id)}
                    >
                      Purchase
                    </Button>
                  )}

                  <Box>{/* STATUS if Bought or Not */}</Box>
                </CardFooter>
              </Card>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default Courses;
