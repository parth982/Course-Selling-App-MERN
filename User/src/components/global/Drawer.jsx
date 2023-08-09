import { AtSignIcon, ChevronRightIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DrawerComponent = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size={"xs"}>
      <DrawerOverlay />
      <DrawerContent bg="purple.500" color="white">
        <DrawerCloseButton />
        <DrawerHeader fontSize="3xl" fontWeight="bold" bg="purple.700">
          Explore Features
        </DrawerHeader>
        <Divider borderColor="dark" borderWidth="1px" />
        <DrawerBody mt={3}>
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
            <IconButton icon={<ViewIcon />} fontSize="20px" />
            <Text fontSize="xl">All Courses</Text>
            <ChevronRightIcon />
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
            <IconButton icon={<AtSignIcon />} fontSize="20px" />
            <Text fontSize="xl">Purchased Courses</Text>
            <ChevronRightIcon />
          </Flex>
          <Divider />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
