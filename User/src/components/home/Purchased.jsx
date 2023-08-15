import {
  Box,
  Card,
  CardBody,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Purchased = () => {
  const toast = useToast();
  const [courses, setCourses] = useState([]);
  const [pidx, setPidx] = useState([]);

  const headers = {
    authorization: "Bearer " + localStorage.getItem("token"),
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/users/purchasedCourses", { headers })
      .then((res) => {
        setCourses(res.data.courses);
        setPidx(res.data.purchasedCourses);
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
  }, []);

  const purchasedCourses = courses?.filter((course) =>
    pidx.includes(course._id)
  );

  return (
    <Box bg={"gray.200"} height={"100vh"}>
      <Box textAlign="center" pt={4}>
        <Heading as="h1" size="xl" color="orange.700" marginBottom="2">
          Purchased Courses
        </Heading>
      </Box>
      {purchasedCourses?.length === 0 ? (
        <Box textAlign="center" mt={"200px"}>
          <Text fontSize="2xl" fontWeight="semibold" color="gray.600">
            No Purchased Courses
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
          {purchasedCourses?.map((course) => (
            <Box
              key={course._id}
              _hover={{
                transform: "scale(1.05)",
              }}
              transition="all 0.2s ease-in-out"
              margin="0 auto"
            >
              <Card
                size={"md"}
                maxW="sm"
                border={"1.5px groove"}
                borderRadius="lg"
                overflow="hidden"
              >
                <Image src={course.imageLink} alt={course.title} />

                <CardBody>
                  <Stack mt="0" spacing="1">
                    <Heading size="lg" fontWeight="semibold">
                      {course.title}
                    </Heading>

                    <Text
                      fontSize="md"
                      color="gray.600"
                      fontWeight="normal"
                      lineHeight="taller"
                    >
                      {course.description}
                    </Text>

                    <Text fontSize="md" fontWeight="bold" color="teal.500">
                      Price: ${course.price}
                    </Text>
                  </Stack>
                </CardBody>

                <Divider />
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Purchased;
