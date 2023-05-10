import React from "react";

import "@cloudscape-design/global-styles/index.css";
import "./base.scss";

export const metadata = {
  title: "lnmetrics",
  description: "Open Source Lightning Network Metrics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="awsui-dark-mode">
      <body>{children}</body>
    </html>
  );
}
