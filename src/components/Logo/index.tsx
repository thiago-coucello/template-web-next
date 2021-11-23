import { Img } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { ReactElement } from "react";

export function Logo(): ReactElement {
  return (
    <NextLink href={"/"}>
      <Img
        margin={5}
        cursor={"pointer"}
        src={"/LoginHD.bmp"}
        alignSelf={{ base: "center", md: "flex-start" }}
        h={{ base: 8, md: 10 }}
        borderRadius={"50%"}
      />
    </NextLink>
  );
}
