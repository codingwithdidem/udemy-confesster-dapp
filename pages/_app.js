import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { Web3Modal } from "@web3modal/react";
import { chains } from "@web3modal/ethereum";
import { ApolloProvider } from "@apollo/client";

import "@fontsource/m-plus-rounded-1c";
import "@fontsource/open-sans";
import Layout from "../components/Layout";

import client from "../apollo-client";

import "../styles/globals.css";

const config = {
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
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
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
      <Web3Modal config={config} />
    </ApolloProvider>
  );
}

export default MyApp;
