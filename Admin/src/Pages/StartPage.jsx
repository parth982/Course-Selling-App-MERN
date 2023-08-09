import React from "react";
import AuthForm from "../components/Auth/AuthForm";

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
              <AuthForm type="login" />
            </TabPanel>
            <TabPanel>
              <AuthForm type="signup" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default StartPage;
