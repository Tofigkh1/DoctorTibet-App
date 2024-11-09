import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="../public/favicon.ico" />
          <meta property="doctor-tibet" content="../public/Logo.png" />
          <meta name="doctor-tibet" content="../public/Logo.png" />
          <title>doctor-tibet.com</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
          <Html>
          <Head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
    );
  }
}

export default MyDocument;