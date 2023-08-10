import { ChevronRightIcon, PlusSquareIcon, ViewIcon } from "@chakra-ui/icons";
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
    <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent bg="purple.500" color="white">
        <DrawerCloseButton color={"black"} />
        <DrawerHeader
          fontSize="3xl"
          textColor={"black"}
          fontWeight="bold"
          bg="gray.400"
        >
          Explore Features
        </DrawerHeader>
        <DrawerBody mt={3}>
          <Divider />
          <Flex
            justifyContent="space-between"
            mb={2}
            mt={2}
            alignItems="center"
            onClick={() => {
              navigate("/courses");
              onClose();
            }}
            _hover={{ cursor: "pointer" }}
          >
            <IconButton icon={<ViewIcon />} />
            <Text fontSize={"xl"} t>
              All Courses
            </Text>
            <ChevronRightIcon />
          </Flex>
          <Divider />
          <Flex
            justifyContent="space-between"
            alignItems="center"
            mt={2}
            mb={2}
            onClick={() => {
              navigate("/AddCourse");
              onClose();
            }}
            _hover={{ cursor: "pointer" }}
          >
            <IconButton icon={<PlusSquareIcon />} />
            <Text fontSize={"xl"} t>
              Create Course
            </Text>
            <ChevronRightIcon />
          </Flex>
          <Divider />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
