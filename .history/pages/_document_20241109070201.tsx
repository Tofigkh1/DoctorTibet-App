import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="../public/manifest.json" />
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