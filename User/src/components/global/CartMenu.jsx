import {
  Box,
  Button,
  CloseButton,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import axios from "axios";
import React, { useEffect } from "react";
import CartStore from "../../state/CartStore";
import { useParams } from "react-router-dom";

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    purchasedCourses,
    setPurchasedCourses,
  } = CartStore();
  const { success } = useParams();

  const totalPrice = cart.reduce((total, course) => {
    return total + (course?.price || 0);
  }, 0);

  const headers = {
    authorization: "Bearer " + localStorage.getItem("token"),
  };

  useEffect(() => {
    if (success === "true") buyCourse(cart.map((c) => c._id));
  }, [success]);

  const checkout = () => {
    axios
      .post(
        "http://localhost:4000/create-checkout-session",
        JSON.stringify(cart),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        window.location = res.data.url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  const buyCourse = (cartIds) => {
    const originalPurchasedCourse = [...purchasedCourses];
    setPurchasedCourses([...purchasedCourses, ...cartIds]);
    cartIds.forEach((courseId) => {
      axios
        .put("http://localhost:4000/users/courses/" + courseId, {}, { headers })
        .catch(() => setPurchasedCourses(originalPurchasedCourse));
    });
  };

  return (
    <Drawer isOpen={isCartOpen} placement="right" size={"sm"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          marginTop={2}
          onClick={() => setIsCartOpen(!isCartOpen)}
        />

        {/* Heading */}

        <DrawerHeader
          fontSize="3xl"
          textColor={"black"}
          fontWeight="bold"
          bg="gray.400"
        >
          CART ({cart.length} items)
        </DrawerHeader>
        <Divider border={"1px solid black"} />

        {/* Cart List */}
        <DrawerBody bg={"gray.200"}>
          {cart.map((course) => (
            <Box key={course?._id} py={4}>
              <FlexBox alignItems="center" justifyContent="space-between">
                <Box maxW="100px">
                  <Image
                    height={"80px"}
                    width={"100px"}
                    alt={course?.title}
                    src={course?.imageLink}
                  />
                </Box>
                <Box flex="1" ml={4}>
                  <FlexBox alignItems="center" justifyContent="space-between">
                    <Text fontWeight="bold" fontSize="md" color="gray.700">
                      {course?.title}
                    </Text>
                    <IconButton
                      onClick={() => removeFromCart({ id: course?._id })}
                      icon={<CloseButton />}
                      size="xs"
                    />
                  </FlexBox>
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    {course?.description}
                  </Text>
                </Box>
              </FlexBox>
              <Divider my={4} border={"1px"} />
            </Box>
          ))}

          {/* Actions */}
          <Box mt={4}>
            <FlexBox alignItems="center" justifyContent="space-between">
              <Text fontWeight="bold" fontSize="lg" color="gray.700">
                SUBTOTAL
              </Text>
              <Text fontWeight="bold" fontSize="lg" color="gray.700">
                ${totalPrice}
              </Text>
            </FlexBox>
            <Button
              colorScheme="whatsapp"
              minWidth="100%"
              padding="12px 20px"
              mt={4}
              onClick={() => {
                checkout();
                setIsCartOpen();
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CartMenu;
