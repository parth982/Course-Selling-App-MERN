import {
  Box,
  Container,
  Icon,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaGraduationCap } from "react-icons/fa";
import AuthForm from "../components/Auth/AuthForm";

const StartPage = () => {
  return (
    <Box bg={"#333333"}>
      <Container maxW="xl" py={16}>
        <Box
          bgGradient="linear(to-r, #F054A3, #C4375B)"
          borderRadius="lg"
          boxShadow="xl"
          p={2}
          mb={1}
          textAlign="center"
          color="white"
        >
          <Icon as={FaGraduationCap} boxSize={{ base: 10, md: 12 }} />
          <Text
            fontFamily="heading"
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight="bold"
          >
            Learn.io
          </Text>
          <Text fontFamily="body" fontSize={{ base: "lg", md: "xl" }} mt={2}>
            Elevate Your Learning Journey
          </Text>
        </Box>

        <Box bg="white" borderRadius="lg" boxShadow="xl" p={8}>
          <Tabs variant="soft-rounded" size="md">
            <TabList>
              <Tab
                fontWeight="bold"
                borderRadius="lg"
                width="50%"
                color="#283593"
                border="0.5px solid #283593"
                mr={2}
              >
                Login
              </Tab>
              <Tab
                fontWeight="bold"
                borderRadius="lg"
                width="50%"
                color="#283593"
                border="0.5px solid #283593"
              >
                Sign Up
              </Tab>
            </TabList>
            <TabPanels mt={2}>
              <TabPanel>
                <AuthForm
                  type="login"
                  style={{
                    backgroundColor: "lightgray",
                    borderColor: "#283593",
                  }}
                />
              </TabPanel>
              <TabPanel>
                <AuthForm
                  type="signup"
                  style={{
                    backgroundColor: "lightgray",
                    borderColor: "#283593",
                  }}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </Box>
  );
};

export default StartPage;
