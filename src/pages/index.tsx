import { Flex, Text } from "@chakra-ui/react";
import type { NextPage } from "next";
import React from "react";

const Home: NextPage = () => {
  return (
    <Flex
      flex={1}
      flexGrow={1}
      h={"100%"}
      justifyContent={"center"}
      alignContent={"center"}
    >
      <Text>Hello World</Text>
    </Flex>
  );
};

export default Home;
