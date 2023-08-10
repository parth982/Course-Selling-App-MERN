import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CourseForm from "./CourseForm.jsx";

const UpdCourse = () => {
  const toast = useToast();
  let { courseId } = useParams();
  const [course, setCourse] = useState({});

  const headers = {
    authorization: "Bearer " + localStorage.getItem("token"),
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/admin/courses/" + courseId, { headers })
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

  return (
    <CourseForm
      titleText="Edit Course"
      submitButtonText="Edit"
      onSubmit={editCourse}
      initialValues={course}
    />
  );
};

export default UpdCourse;
