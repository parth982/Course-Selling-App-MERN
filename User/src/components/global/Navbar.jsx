import { AtSignIcon, HamburgerIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../state/store";

const Navbar = () => {
  const btnRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLogged, setIsLogged } = AuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    var headers = {
      authorization: "Bearer " + token,
    };
    axios
      .get("http://localhost:4000/admin/me", { headers })
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
        <>
          <HStack
            justifyContent="space-between"
            paddingY={3}
            paddingX={6}
            bg="purple.500"
            color="white"
          >
            <IconButton
              ref={btnRef}
              icon={<HamburgerIcon />}
              onClick={onOpen}
            />
            <Drawer
              isOpen={isOpen}
              placement="left"
              onClose={onClose}
              finalFocusRef={btnRef}
              size={"xs"}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Features</DrawerHeader>
                <Divider borderColor="dark" borderWidth="2px" />
                <DrawerBody mt={3}>
                  <Divider />
                  <Flex
                    justifyContent={"space-between"}
                    mb={2}
                    mt={2}
                    alignItems={"center"}
                    onClick={() => {
                      navigate("/courses");
                      onClose();
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    <IconButton icon={<ViewIcon />} />
                    <Text>All Courses</Text>
                  </Flex>
                  <Divider />
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={2}
                    mb={2}
                    onClick={() => {
                      navigate("/Purchased");
                      onClose();
                    }}
                    _hover={{ cursor: "pointer" }}
                  >
                    <IconButton icon={<AtSignIcon />} />
                    <Text>Purchased Courses </Text>
                  </Flex>
                  <Divider />
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            <Text
              fontSize={{ base: "3xl", md: "4xl" }}
              fontWeight="bold"
              cursor="pointer"
              onClick={() => navigate("/")}
            >
              Learn.io
            </Text>
            <Flex align="center">
              <Button colorScheme="orange" mr={2} onClick={handleLogout}>
                Log-Out
              </Button>
            </Flex>
          </HStack>
        </>
      ) : (
        <Flex
          justifyContent="center"
          alignItems="center"
          bg="#777"
          h="60px"
          color="#fff"
        >
          <Text fontSize="3xl">User Dashboard</Text>
        </Flex>
      )}
    </>
  );
};

export default Navbar;
