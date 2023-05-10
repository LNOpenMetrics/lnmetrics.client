import "reflect-metadata";

import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@cloudscape-design/global-styles/index.css";

export default function App({ Component, pageProps }: AppProps) {
  // Source: https://stackoverflow.com/a/71869550/10854225
  const AnyComponent = Component as any;
  return <AnyComponent {...pageProps} />;
}
