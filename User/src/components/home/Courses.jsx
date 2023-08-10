import { Box, Heading, SimpleGrid, Text, useToast } from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect } from "react";
import CartStore from "../../state/CartStore";
import CourseCard from "../global/CoursesCard";

const Courses = () => {
  const toast = useToast();
  const { cart, setCourses, courses, purchasedCourses, setPurchasedCourses } =
    CartStore();

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
    getAllCoursesInfo();
  }, []);

  return (
    <Box bg={"gray.200"} height={"100vh"}>
      <Box textAlign="center" pt={4}>
        <Heading as="h1" size="xl" color="orange.600" marginBottom="2">
          Available Courses
        </Heading>
      </Box>

      {courses?.length === 0 ? (
        <Box textAlign="center" mt={"200px"}>
          <Text fontSize="2xl" fontWeight="semibold" color="gray.600">
            No courses available
          </Text>
        </Box>
      ) : (
        <Box
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
          gap="20px"
          paddingX="60px"
          py={5}
          margin="0 auto"
        >
          {courses?.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              purchasedCourses={purchasedCourses}
              cart={cart}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Courses;
