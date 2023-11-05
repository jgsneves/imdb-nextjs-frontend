import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ReduxProvider>
  );
}
