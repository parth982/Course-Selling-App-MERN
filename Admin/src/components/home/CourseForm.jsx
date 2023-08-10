import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CourseForm = ({
  titleText,
  submitButtonText,
  onSubmit,
  initialValues,
}) => {
  const [title, setTitle] = useState(initialValues.title || "");
  const [description, setDescription] = useState(
    initialValues.description || ""
  );
  const [price, setPrice] = useState(initialValues.price || 0);
  const [image, setImage] = useState(initialValues.imageLink || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, price: +price, imageLink: image });
    e.target.reset();
  };

  const isAddCourse = titleText === "Add Course";

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bg={isAddCourse ? "gray.100" : "gray.200"}
    >
      <Card
        width={{ base: "90%", sm: "80%", md: "600px" }}
        borderRadius="lg"
        overflow="hidden"
      >
        <CardHeader
          bg={isAddCourse ? "teal.500" : "purple.500"}
          color="white"
          py={5}
          textAlign="center"
          fontWeight="bold"
        >
          <Heading>{isAddCourse ? "Add New Course" : "Update Course"}</Heading>
        </CardHeader>

        <CardBody py={8} px={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl width="100%" isRequired>
                <FormLabel fontSize="lg" fontWeight="semibold">
                  Title
                </FormLabel>
                <Input
                  id="title"
                  placeholder="Enter the title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FormControl>
              <FormControl width="100%" isRequired>
                <FormLabel fontSize="lg" fontWeight="semibold">
                  Description
                </FormLabel>
                <Input
                  id="description"
                  placeholder="Enter the description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl width="100%" isRequired>
                <FormLabel fontSize="lg" fontWeight="semibold">
                  Price
                </FormLabel>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter the price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </FormControl>
              <FormControl width="100%" isRequired>
                <FormLabel fontSize="lg" fontWeight="semibold">
                  Image Link
                </FormLabel>
                <Input
                  id="image"
                  placeholder="Enter the image link"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </FormControl>
            </VStack>
            <Button
              mt={8}
              colorScheme={isAddCourse ? "teal" : "purple"}
              type="submit"
              fontSize="lg"
              fontWeight="bold"
              width="100%"
            >
              {submitButtonText}
            </Button>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CourseForm;
