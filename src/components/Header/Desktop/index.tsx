import { useColorModeValue } from "@chakra-ui/color-mode";
import { Heading } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

import Logo from "../../Logo";
import UserMenu from "../../UserMenu";

export default function DesktopNavbar(): ReactElement {
  return (
    <>
      <Logo />
      <Heading alignSelf={"center"} textColor={"white"}>
        EMPRESA
      </Heading>
      <UserMenu />
    </>
  );
}
