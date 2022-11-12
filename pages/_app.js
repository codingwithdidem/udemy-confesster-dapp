import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

import "@fontsource/m-plus-rounded-1c";
import "@fontsource/open-sans";
import Layout from "../components/Layout";

import "../styles/globals.css";

export const theme = extendTheme({
  fonts: {
    heading: "M PLUS Rounded 1c",
    body: "Open Sans",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
