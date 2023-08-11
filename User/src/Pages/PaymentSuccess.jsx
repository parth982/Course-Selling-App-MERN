import { Box, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box textAlign="center" mt={10}>
      <Text fontSize="3xl" fontWeight="bold" color="green.500">
        Payment Successful!
      </Text>
      <Text mt={3} fontSize="lg">
        Thank you for your purchase.
      </Text>
      <Button mt={6} colorScheme="green" onClick={() => navigate("/courses")}>
        Back to Main Page
      </Button>
    </Box>
  );
};

export default PaymentSuccess;
