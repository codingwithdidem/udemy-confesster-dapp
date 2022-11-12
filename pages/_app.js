import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Web3Modal } from "@web3modal/react";
import { chains } from "@web3modal/ethereum";

import "@fontsource/m-plus-rounded-1c";
import "@fontsource/open-sans";
import Layout from "../components/Layout";

import "../styles/globals.css";

const config = {
  projectId: "b34cb6ee1c84bfc5a40083359e3785b5",
  theme: "dark",
  accentColor: "magenta",
  ethereum: {
    appName: "Confesster",
    chains: [chains.goerli],
  },
};

export const theme = extendTheme({
  fonts: {
    heading: "M PLUS Rounded 1c",
    body: "Open Sans",
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
      <Web3Modal config={config} />
    </>
  );
}

export default MyApp;
