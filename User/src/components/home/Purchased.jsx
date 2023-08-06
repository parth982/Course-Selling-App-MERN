import React, { useEffect, useState } from "react";
import {
  Box,
  CardBody,
  Card,
  Heading,
  Divider,
  Stack,
  Image,
  Text,
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

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
    <>
      {purchasedCourses?.length === 0 ? (
        <p>No courses Purchased</p>
      ) : (
        <SimpleGrid
          padding={10}
          width={"92%"}
          margin={"auto"}
          columns={{ base: "1", md: "2", lg: "3" }}
          spacingY={5}
          spacingX={5}
        >
          {purchasedCourses?.map((course) => (
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
              </Card>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default Purchased;
