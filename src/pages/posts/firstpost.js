import Head from "next/head";
import Link from "next/link";
import Script from "next/script";
export default function FirstPost() {
  return (
    <>
      <Head>
        <title>Test</title>
        <script src="https://connect.facebook.net/en_US/sdk.js" />
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />

      <Link href="/">Back</Link>
    </>
  );
}
