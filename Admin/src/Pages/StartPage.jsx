import React from "react";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Tab,
} from "@chakra-ui/react";

const StartPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("UserInfo"));
    if (userInfo) {
      // navigate("/chats");
    }
  }, [navigate]);
  return (
    <Container>
      <Box
        display="flex"
        justifyContent={"center"}
        marginTop={"10vh"}
        border={"2px"}
        marginBottom={3}
      >
        <Text fontFamily={"mono"} fontSize={"5xl"}>
          Learn.io
        </Text>
      </Box>

      <Box border={"2px"} padding={4}>
        <Tabs variant="solid-rounded">
          <TabList>
            <Tab border={"2px"} borderRadius={45} width="50%">
              Login
            </Tab>
            <Tab border={"2px"} borderRadius={45} width="50%">
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default StartPage;
