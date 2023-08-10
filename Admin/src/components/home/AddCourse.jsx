import { useToast } from "@chakra-ui/react";
import axios from "axios";
import CourseForm from "./CourseForm.jsx";

const AddCourse = () => {
  const toast = useToast();

  const addCourse = (data) => {
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
  };

  return (
    <CourseForm
      titleText="Add Course"
      submitButtonText="Submit"
      onSubmit={addCourse}
      initialValues={{}}
    />
  );
};

export default AddCourse;
