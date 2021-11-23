import { Flex, Heading, Text } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import React from "react";

const Dashboard: NextPage = () => {
  const testList = [
    {
      key: "1",
      name: "item1",
    },
    {
      key: "2",
      name: "item2",
    },
    {
      key: "3",
      name: "item3",
    },
    {
      key: "4",
      name: "item4",
    },
    {
      key: "5",
      name: "item5",
    },
  ];

  return (
    <Flex
      alignItems={"center"}
      flex={1}
      justifyContent={"center"}
      flexGrow={1}
      height={"auto"}
    >
      <VStack>
        {testList.map((item, index) => (
          <Heading key={item.key + index}>{item.name}</Heading>
        ))}
      </VStack>
    </Flex>
  );
};

export default Dashboard;
