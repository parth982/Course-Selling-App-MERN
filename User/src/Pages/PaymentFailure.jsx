import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PaymentFailure = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="3xl" fontWeight="bold" color="red.500">
        Payment Failed
      </Text>
      <Text mt={3} fontSize="lg">
        Oops! Something went wrong with your payment.
      </Text>
      <Button mt={6} colorScheme="red" onClick={() => navigate("/courses")}>
        Back to Main Page
      </Button>
    </Box>
  );
};

export default PaymentFailure;
