import { wrapper } from '../Shared/Redux/Store/store';
import { Provider } from 'react-redux';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import themes from "../Theme/index"; 
import CssBaseline from '@mui/material/CssBaseline';
import '../styles/globals.css';
import { ThemeProvider } from "../@/components/my-components/theme/theme-provider/index";
import { AuthContextProvider } from '../Shared/Context';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import { DotLoader } from 'react-spinners';



type Props = {
  children: ReactNode;
  params: {locale: string};
};



function MyApp({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore({ pageProps });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);
    const handleRouteChangeError = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  return (
    <Provider store={store}>
      <AuthContextProvider>
        <CssBaseline />
        <ChakraProvider theme={themes}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {loading && (
              <div className="spinner-overlay">
                <DotLoader color="#28e4c5" speedMultiplier={1.6} size={90} />
              </div>
            )}
            <Component {...props.pageProps} />
          </ThemeProvider>
        </ChakraProvider>
      </AuthContextProvider>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);



// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// }