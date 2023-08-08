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
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
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

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { setIsLogged } = AuthStore();
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
    axios
      .post("http://localhost:4000/admin/login", {}, { headers: formData })
      .then((res) => {
        setLoading(false);
        setIsLogged(true);
        navigate("/courses");
        toast({
          title: "Login Successful !!!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => {
        toast({
          title: "Loggin Failed!",
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
    <form
      onSubmit={handleSubmit((formData) => {
        submitHandler(formData);
        reset();
      })}
    >
      <VStack spacing={2}>
        <FormControl required>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
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
          colorScheme="whatsapp"
          size="sm"
          type="submit"
          isLoading={isLoading}
        >
          Login
        </Button>
      </VStack>
    </form>
  );
};

export default Login;
