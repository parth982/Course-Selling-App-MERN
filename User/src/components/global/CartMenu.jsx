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
import React from "react";
import CartStore from "../../state/CartStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  const totalPrice = cart.reduce((total, course) => {
    return total + (course?.price || 0);
  }, 0);

  const headers = {
    authorization: "Bearer " + localStorage.getItem("token"),
  };

  const checkout = () => {
    axios
      .post(
        "http://localhost:4000/create-checkout-session",
        JSON.stringify(cart),
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        window.location = res.data.url;
        buyCourse(cart.map((c) => c._id));
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  const buyCourse = (cartIds) => {
    const originalPurchasedCourse = [...purchasedCourses];
    console.log(cartIds);
    setPurchasedCourses([...purchasedCourses, ...cartIds]);
    cartIds.forEach((courseId) => {
      axios
        .put("http://localhost:4000/users/courses/" + courseId, {}, { headers })
        .then(() => {})
        .catch(() => setPurchasedCourses(originalPurchasedCourse));
    });
  };

  return (
    <div>
      <Drawer isOpen={isCartOpen} placement="right" size={"sm"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            marginTop={2}
            onClick={() => setIsCartOpen(!isCartOpen)}
          />

          {/* Heading */}
          <DrawerHeader>
            <Text fontFamily={"Cinzel"}>PURCHASE BAG ({cart.length})</Text>
          </DrawerHeader>

          {/* Cart List */}
          <DrawerBody>
            {cart.map((course) => (
              <Box key={course?._id}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%" pr={4}>
                    <Image
                      height={"120px"}
                      width={"90px"}
                      // objectFit={"cover"}
                      alt={course?.title}
                      src={course?.imageLink}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      <Text fontWeight="bold">Title: {course?.title}</Text>
                      <IconButton
                        onClick={() => removeFromCart({ id: course?._id })}
                        icon={<CloseButton />}
                        size={"xs"}
                        width={"9px"}
                      />
                    </FlexBox>
                    <Text>Description: {course?.description}</Text>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}

            {/* Actions */}
            <Box>
              <FlexBox m="20px 0">
                <Text fontWeight="bold" fontFamily={"Fauna One"}>
                  SUBTOTAL
                </Text>
                <Text fontWeight="bold">${totalPrice}</Text>
              </FlexBox>
              <Button
                colorScheme="whatsapp"
                minWidth={"100%"}
                padding={"20px 40px"}
                m="20px 0"
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
    </div>
  );
};

export default CartMenu;
