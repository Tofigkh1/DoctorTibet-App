import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="../public/favicon.ico" />
          <meta property="doctor-tibet.com" content="../public/favicon.ico" />
          <meta name="doctor-tibet.com" content="../public/favicon.ico" />
          <title>doctor-tibet.com</title>
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