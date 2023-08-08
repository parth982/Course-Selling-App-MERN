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
  useToast,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cartStore from "../../state/CartStore";

const UpdCourse = () => {
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [course, setCourse] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { courses } = cartStore();

  let { courseId } = useParams();
  const toast = useToast();

  const headers = {
    authorization: "Bearer " + localStorage.getItem("token"),
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/courses/" + courseId, { headers })
      .then((res) => setCourse(res.data.course))
      .catch((err) => console.log(err.message));
  }, []);

  function editCourse(updCourse) {
    const originalCourse = { ...course };
    setCourse({ ...course, updCourse });
    axios
      .put("http://localhost:4000/admin/courses/" + courseId, updCourse, {
        headers,
      })
      .then((res) =>
        toast({
          title: "Course Updated successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        })
      )
      .catch((err) => setCourse(originalCourse));
    setEditMode(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    editCourse({ title, description: desc, price: +price, imageLink: image });
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
            Edit Course
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
                  defaultValue={courses.find((c) => c._id === courseId)?.title}
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
                  onChange={(e) => setDesc(e.target.value)}
                  defaultValue={
                    courses.find((c) => c._id === courseId)?.description
                  }
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
                  defaultValue={courses.find((c) => c._id === courseId)?.price}
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
                  defaultValue={
                    courses.find((c) => c._id === courseId)?.imageLink
                  }
                />
              </FormControl>
            </VStack>
            <Button
              mt={4}
              colorScheme="teal"
              type="submit"
              fontFamily="sans-serif"
            >
              Edit
            </Button>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default UpdCourse;
