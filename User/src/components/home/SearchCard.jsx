import React from "react";
import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SearchCard = ({ course, purchasedCourses, cart }) => {
  const navigate = useNavigate();

  return (
    <Flex
      key={course._id}
      _hover={{
        transform: "scale(1.05)",
      }}
      transition="all 0.2s ease-in-out"
      border={"1px groove "}
      borderRadius="md"
      overflow="hidden"
      bg="white"
      alignItems="center"
      mb="4"
      p="2"
    >
      <Image src={course.imageLink} alt={course.title} w="30%" mr="3" />
      <Flex
        width={"60%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Heading size="md" fontWeight="semibold" mb="2" fontFamily="Georgia">
            {course.title}
          </Heading>
          <Text fontSize="md" color="gray.600" mb="2" fontFamily="Arial">
            Price: ${course.price}
          </Text>
        </Box>

        <Box>
          {purchasedCourses.includes(course?._id) ? (
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              Purchased
            </Button>
          ) : cart.some((c) => c._id === course._id) ? (
            <Button
              colorScheme="orange"
              size="sm"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              In Cart
            </Button>
          ) : (
            <Button
              variant="solid"
              colorScheme="teal"
              size="sm"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              Available
            </Button>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default SearchCard;
