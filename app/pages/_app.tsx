import React from "react";
import App from "next/app";
import GlobalStyle from "../theme/globalStyle";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import Layout from "../components/Layout";
import HomesProvider from "../contexts/HomesContext";
import Head from "next/head";

const link = new BatchHttpLink({
  uri: "https://fake-api.avantstay.dev/graphql",
  batchMax: 10, // No more than 10 operations per batch
  batchInterval: 50, // Wait no more than 50ms after first batched operation
  batchDebounce: true,
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <ApolloProvider client={client}>
          <GlobalStyle />
          <HomesProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </HomesProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default MyApp;
