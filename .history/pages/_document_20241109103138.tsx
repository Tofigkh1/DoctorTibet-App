import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" sizes="180x180" href="/Logo.png" />
          <link rel="apple-touch-icon" sizes="192x192" href="/Logo.png" />
          <link rel="apple-touch-icon" sizes="512x512" href="/Logo.png" />
          <link rel="apple-touch-startup-image" href="/Logo.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" />
          <link rel="apple-touch-startup-image" href="/Logo.png" media="(device-width: 834px) and (device-height: 1112px)"/>
          <link rel="apple-touch-startup-image" href="/Logo.png" media="(device-width: 1024px) and (device-height: 1366px)"/>

          <link rel="icon" href="/favicon.ico" />
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          <meta property="og:image" content="/Logo.png" />
          <meta name="description" content="doctor-tibet.com" />
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
