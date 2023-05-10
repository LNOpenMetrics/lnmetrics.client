import "reflect-metadata";

import type { AppProps } from "next/app";

import "@/styles/globals.css";
import "@cloudscape-design/global-styles/index.css";
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
