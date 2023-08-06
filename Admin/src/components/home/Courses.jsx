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
  localStorageManager,
} from "@chakra-ui/react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Courses = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  const headers = {
    authorization: "Bearer " + localStorage.getItem("token"),
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/courses/", { headers })
      .then((res) => setCourses(res.data.courses))
      .catch((err) => console.log(err.message));
  }, []);

  const delCourse = (courseId) => {
    axios
      .delete("http://localhost:4000/admin/courses/" + courseId, { headers })
      .then((res) => {
        setCourses((prevCourses) =>
          prevCourses.filter((c) => c._id !== courseId)
        );
        toast({
          title: "Course Deleted",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((err) => {
        toast({
          title: "Error Occurred!",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
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

                <CardFooter justifyContent={"space-between"}>
                  <Button
                    variant="solid"
                    colorScheme="green"
                    onClick={() => navigate(`/courses/${course._id}`)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="solid"
                    colorScheme="red"
                    onClick={() => delCourse(course._id)}
                  >
                    Delete
                  </Button>
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
