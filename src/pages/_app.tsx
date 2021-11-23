import { ChakraProvider, Flex } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import React from "react";

import Header from "../components/Header";
import { AuthProvider } from "../context/Auth/provider";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Header />
        <Flex grow={1} minH={"calc(100vh - 10rem)"}>
          <Component {...pageProps} />
        </Flex>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
