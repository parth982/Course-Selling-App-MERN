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

const CourseCard = ({ course, delCourse }) => {
  const navigate = useNavigate();

  return (
    <Box
      key={course._id}
      _hover={{
        transform: "scale(1.05)",
      }}
      transition="all 0.2s ease-in-out"
      margin="0 auto"
    >
      <Card
        size="md"
        maxW="sm"
        borderRadius="lg"
        border={"1.5px groove"}
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

        <CardFooter justifyContent="space-between" paddingY="2">
          <Button
            variant="solid"
            colorScheme="green"
            size="md"
            fontSize="md"
            onClick={() => navigate(`/courses/${course._id}`)}
          >
            Update
          </Button>
          <Button
            variant="solid"
            colorScheme="red"
            size="md"
            fontSize="md"
            onClick={() => delCourse(course._id)}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
};

export default CourseCard;
