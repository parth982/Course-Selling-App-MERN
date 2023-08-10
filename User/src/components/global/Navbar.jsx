import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { AiFillShopping } from "react-icons/ai";
import { BiSearchAlt2 } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AuthStore from "../../state/AuthStore";
import cartStore from "../../state/CartStore";
import SearchCard from "../home/SearchCard";
import DrawerComponent from "./Drawer";

const Navbar = () => {
  const btnRef = useRef();
  const navigate = useNavigate();
  const toast = useToast();
  const [username, setUsername] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLogged, setIsLogged } = AuthStore();
  const {
    cart,
    setCourses,
    courses,
    purchasedCourses,
    setPurchasedCourses,
    setIsCartOpen,
    isCartOpen,
  } = cartStore();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const token = localStorage.getItem("token");
  const headers = {
    authorization: "Bearer " + token,
  };

  useEffect(() => {
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

  const handleSearch = () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    setLoading(true);
    axios
      .get(`http://localhost:4000/users/queryCourses?search=${search}`, {
        headers: headers,
      })
      .then((res) => {
        setSearchResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error Occurred!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
        setLoading(false);
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
          color="white"
          bg="#283593"
        >
          <IconButton ref={btnRef} icon={<HamburgerIcon />} onClick={onOpen} />
          <DrawerComponent isOpen={isOpen} onClose={onClose} />
          <Text
            fontSize="4xl"
            fontWeight="bold"
            cursor="pointer"
            onClick={() => navigate("/courses")}
            fontFamily="cursive"
            color="white"
            flex="1"
            textAlign="center"
            ml="165px"
          >
            Learn.io
          </Text>
          <Flex align="center" gap={2}>
            <Box position="relative" mr={4}>
              <Badge
                colorScheme="red"
                borderRadius="full"
                fontSize="15px"
                position="absolute"
                top="-8px"
                right="-8px"
                zIndex="10"
              >
                {cart.length}
              </Badge>
              <IconButton
                onClick={setIsCartOpen}
                aria-label="Shop"
                icon={<AiFillShopping />}
              />
            </Box>
            <IconButton
              aria-label="Search"
              icon={<BiSearchAlt2 />}
              fontSize="1.5rem"
              onClick={() => setIsSearchOpen(true)}
            />
            <Button ml={7} colorScheme="orange" onClick={handleLogout}>
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
            User Dashboard
          </Text>
        </Flex>
      )}
      {isSearchOpen && (
        <Modal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          size="lg"
        >
          <ModalOverlay />
          <ModalContent bg="#E0E7FF">
            <ModalHeader>
              <Heading size="xl" fontWeight="bold" fontFamily="cursive">
                Search Courses
              </Heading>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction="column">
                <Box mb="4">
                  <Flex>
                    <Input
                      placeholder="Enter Course title.."
                      mr={2}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      borderColor="black"
                    />
                    <Button
                      colorScheme="twitter"
                      leftIcon={<BiSearchAlt2 />}
                      onClick={handleSearch}
                    >
                      Search
                    </Button>
                  </Flex>
                </Box>

                {isLoading ? (
                  <Text>Loading...</Text>
                ) : (
                  <Box>
                    {searchResult.map((course) => (
                      <SearchCard
                        key={course._id}
                        course={course}
                        purchasedCourses={purchasedCourses}
                        cart={cart}
                      />
                    ))}
                  </Box>
                )}
              </Flex>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Navbar;
