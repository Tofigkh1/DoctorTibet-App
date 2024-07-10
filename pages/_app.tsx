import { wrapper } from '../Shared/Redux/Store/store'; 
import { Provider } from 'react-redux'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "../Theme/index"; // Import your custom theme if you have one

import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {

  const {store} = wrapper.useWrappedStore(pageProps)
  return (
    <Provider store={store}>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
