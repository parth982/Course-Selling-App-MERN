import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../state/AuthStore";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain at least 3 characters" })
    .max(50),
  password: z
    .string()
    .min(5, { message: "Password must contain at least 5 characters" })
    .max(50),
});

const AuthForm = ({ type }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const { setIsLogged } = AuthStore();
  const [show, setShow] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  const submitHandler = (formData) => {
    setLoading(true);
    const url =
      type === "login"
        ? "http://localhost:4000/users/login"
        : "http://localhost:4000/users/signup";
    axios
      .post(url, formData)
      .then((res) => {
        setLoading(false);
        reset();
        const successMessage =
          type === "login" ? "Login Successful" : "Registration Successful";
        toast({
          title: successMessage,
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        if (type === "login") {
          localStorage.setItem("token", res.data.token);
          navigate("/courses");
          setIsLogged(true);
        }
      })
      .catch((err) => {
        toast({
          title: `${type === "login" ? "Login" : "Sign Up"} Failed!`,
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit((formData) => submitHandler(formData))}>
      <VStack spacing={2}>
        <FormControl required>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            width={"100%"}
            placeholder="Enter your Username.."
            {...register("username")}
          />
          {errors.username && (
            <Text as={"i"} color={"tomato"}>
              {errors.username.message}
            </Text>
          )}
        </FormControl>

        <FormControl required>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              {...register("password")}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text as={"i"} color={"tomato"}>
              {errors.password.message}
            </Text>
          )}
        </FormControl>

        <Button
          width={"100%"}
          marginTop={2}
          colorScheme={type === "login" ? "whatsapp" : "orange"}
          size="sm"
          type="submit"
          isLoading={isLoading}
        >
          {type === "login" ? "Login" : "Sign Up"}
        </Button>
      </VStack>
    </form>
  );
};

export default AuthForm;
