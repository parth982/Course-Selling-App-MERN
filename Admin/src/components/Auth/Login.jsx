import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../state/store";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const { isLogged, setIsLogged } = AuthStore();

  const submitHandler = () => {
    setLoading(true);
    if (!username || !password) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const headers = { headers: { username, password } };

    axios
      .post("http://localhost:4000/admin/login", {}, headers)
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
          title: "Error Occured!",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    submitHandler();
    e.target.reset();
  };

  return (
    <form onSubmit={HandleSubmit}>
      <VStack spacing={2}>
        <FormControl required>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            placeholder="Enter your Username.."
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </FormControl>

        <FormControl required>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
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
