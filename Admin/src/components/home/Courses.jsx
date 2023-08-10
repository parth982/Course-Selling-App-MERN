import { Box, Heading, SimpleGrid, Text, useToast } from "@chakra-ui/react";

import axios from "axios";
import React, { useEffect } from "react";
import CartStore from "../../state/CartStore";
import CourseCard from "../global/CourseCard";

const Courses = () => {
  const toast = useToast();
  const { courses, setCourses } = CartStore();

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
        setCourses(courses.filter((c) => c._id !== courseId));
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
    <Box bg={"gray.200"} height={"100vh"}>
      <Box textAlign="center" pt={4}>
        <Heading as="h1" size="xl" color="orange.600" marginBottom="2">
          Uploaded Courses
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
        >
          {courses?.map((course) => (
            <CourseCard
              key={course._id}
              course={course}
              delCourse={delCourse}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Courses;
