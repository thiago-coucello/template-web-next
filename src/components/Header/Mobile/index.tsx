import { Heading, HStack } from "@chakra-ui/layout";
import React, { ReactElement } from "react";

import Logo from "../../Logo";
import UserMenu from "../../UserMenu";

export default function MobileNavbar(): ReactElement {
  return (
    <HStack flex={1} justifyContent={"space-between"}>
      <Logo />
      <Heading fontSize={16} textColor={"white"}>
        EMPRESA - MOBILE
      </Heading>
      <UserMenu />
    </HStack>
  );
}
