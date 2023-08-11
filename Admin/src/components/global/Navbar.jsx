import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthStore from "../../state/AuthStore";
import DrawerComponent from "./Drawer";

const Navbar = () => {
  const btnRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isLogged, setIsLogged } = AuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    var headers = {
      authorization: "Bearer " + token,
    };
    axios
      .get("http://localhost:4000/admin/username", { headers })
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [username, isLogged]);

  const handleLogout = () => {
    localStorage.setItem("token", null);
    setUsername(null);
    setIsLogged(false);
    navigate("/");

    toast({
      title: "Logged Out!!",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
      {username ? (
        <HStack
          justifyContent="space-between"
          alignItems="center"
          paddingY={3}
          paddingX={6}
          bg="#283593"
          color="white"
        >
          <IconButton ref={btnRef} icon={<HamburgerIcon />} onClick={onOpen} />
          <DrawerComponent isOpen={isOpen} onClose={onClose} />
          <Text
            fontSize="4xl"
            fontWeight="bold"
            cursor="pointer"
            fontFamily="cursive"
            onClick={() => navigate("/courses")}
            ml={"34px"}
          >
            Learn.io
          </Text>
          <Flex align="center">
            <Button colorScheme="orange" mr={2} onClick={handleLogout}>
              Log-Out
            </Button>
          </Flex>
        </HStack>
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          bgGradient="linear(to-r, #FFA500, #FF6347)"
          h="80px"
          color="white"
          boxShadow="md"
        >
          <Text
            fontSize={{ base: "3xl", md: "4xl" }}
            fontWeight="bold"
            fontFamily="cursive"
            letterSpacing="wide"
            textTransform="uppercase"
            textAlign="center"
          >
            Admin Dashboard
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Navbar;
