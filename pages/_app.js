import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import "@fontsource/m-plus-rounded-1c";
import "@fontsource/open-sans";

import "../styles/globals.css";

const theme = extendTheme({
  fonts: {
    heading: "M PLUS Rounded 1c",
    body: "Open Sans",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
