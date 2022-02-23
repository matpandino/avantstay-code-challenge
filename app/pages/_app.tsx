import React from "react";
import App from "next/app";
import GlobalStyle from "../theme/globalStyle";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Layout from "../components/layout";
import HomesProvider from "../contexts/HomesContext";

const cache = new InMemoryCache();

const client = new ApolloClient({
  uri: "https://fake-api.avantstay.dev/graphql",
  cache: cache,
});

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
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
