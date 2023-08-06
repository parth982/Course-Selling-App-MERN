import {
  FormControl,
  FormLabel,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";

const SignUp = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

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

    const data = { username, password };

    axios
      .post(`http://localhost:4000/admin/signup`, data)
      .then((res) => {
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("UserInfo", JSON.stringify(res.data));
        setLoading(false);
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
    <div>
      <form onSubmit={HandleSubmit}>
        <VStack spacing={2}>
          <FormControl required>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              placeholder="Enter your Username.."
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormControl>

          <FormControl required>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
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
            colorScheme="orange"
            size="sm"
            type="submit"
            isLoading={Loading}
          >
            Sign Up
          </Button>
        </VStack>
      </form>
    </div>
  );
};

export default SignUp;
