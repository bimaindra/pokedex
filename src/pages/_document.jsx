import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        {/*Below we add the modal wrapper*/}
        <div id="portal"></div>
      </body>
    </Html>
  );
}
