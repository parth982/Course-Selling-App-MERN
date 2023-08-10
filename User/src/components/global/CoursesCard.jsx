import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, purchasedCourses, cart }) => {
  const navigate = useNavigate();

  return (
    <Box
      key={course._id}
      _hover={{
        transform: "scale(1.05)",
      }}
      transition="all 0.2s ease-in-out"
      margin={"0 auto"}
    >
      <Card
        size={"md"}
        maxW="sm"
        borderRadius="lg"
        overflow="hidden"
        border={"1.5px groove"}
      >
        <Image src={course.imageLink} alt={course.title} />

        <CardBody>
          <Stack mt="0" spacing="1">
            <Heading size="lg" fontWeight="semibold">
              {course.title}
            </Heading>

            <Text fontSize="md" color="gray.600" fontWeight="normal">
              {course.description}
            </Text>

            <Text fontSize="md" fontWeight="bold" color="purple.400">
              Price: ${course.price}
            </Text>
          </Stack>
        </CardBody>

        <Divider />

        <CardFooter justifyContent="center" paddingY="2">
          {purchasedCourses.includes(course?._id) ? (
            <Button
              colorScheme="red"
              size="md"
              fontSize="md"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              Purchased
            </Button>
          ) : cart.some((c) => c._id === course._id) ? (
            <Button
              colorScheme="orange"
              size="md"
              fontSize="md"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              In Cart
            </Button>
          ) : (
            <Button
              variant="solid"
              colorScheme="teal"
              size="md"
              fontSize="md"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              Available
            </Button>
          )}
        </CardFooter>
      </Card>
    </Box>
  );
};

export default CourseCard;
