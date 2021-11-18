import { ColorModeScript } from "@chakra-ui/color-mode";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React, { ReactElement } from "react";

import { theme } from "../styles/theme";

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head></Head>

        <div>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </div>
      </Html>
    );
  }
}
