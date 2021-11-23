import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Flex } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

import { DesktopNavbar } from "./Desktop";
import { MobileNavbar } from "./Mobile";

export default function Header(): ReactElement {
  const bgColor = useColorModeValue("blue.500", "blue.800");

  return (
    <Box
      bgGradient={`linear(to bottom, ${bgColor}, blue.900)`}
      height={"5rem"}
      boxShadow={"dark-lg"}
    >
      <Flex
        flexDir={"row"}
        justifyContent={"space-between"}
        alignContent={"center"}
        display={{ base: "none", md: "flex" }}
      >
        <DesktopNavbar />
      </Flex>

      <Flex
        flexDir={"row"}
        justifyContent={"center"}
        alignContent={"center"}
        display={{ base: "flex", md: "none" }}
      >
        <MobileNavbar />
      </Flex>
    </Box>
  );
}
