import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  StackDivider,
  useToast,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const toast = useToast();

  function addCourse(data) {
    const headers = {
      authorization: "Bearer " + localStorage.getItem("token"),
    };
    axios
      .post("http://localhost:4000/admin/courses", data, { headers })
      .then((res) =>
        toast({
          title: "Course added successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      )
      .catch((err) => alert(err.message));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addCourse({ title, description, price: +price, imageLink: image });
    e.target.reset();
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card align="center" height="480px" width="380px" border={"1px solid"}>
        <CardHeader>
          <Heading size="lg" fontFamily="sans-serif" fontWeight="bold">
            Add Course
          </Heading>
        </CardHeader>

        <Divider />

        <CardBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl width="300px" isRequired>
                <FormLabel
                  htmlFor="title"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  Title
                </FormLabel>
                <Input
                  id="title"
                  placeholder="Title.."
                  onChange={(e) => setTitle(e.target.value)}
                />
                <FormLabel
                  htmlFor="description"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  Description
                </FormLabel>
                <Input
                  id="description"
                  placeholder="Description.."
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormLabel
                  htmlFor="price"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  Price
                </FormLabel>
                <Input
                  id="price"
                  type="number"
                  placeholder="Price.."
                  onChange={(e) => setPrice(e.target.value)}
                />
                <FormLabel
                  htmlFor="image"
                  fontFamily="sans-serif"
                  fontWeight="bold"
                >
                  ImageLink
                </FormLabel>
                <Input
                  id="image"
                  placeholder="Image.."
                  onChange={(e) => setImage(e.target.value)}
                />
              </FormControl>
            </VStack>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              fontFamily="sans-serif"
            >
              Submit
            </Button>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default AddCourse;
