"use client";
import "./base.scss";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "@/app/routes/root";
import RfcComponent from "@/app/routes/rfc.component";
import Metrics from "@/app/routes/metrics";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "rfc",
    element: <RfcComponent />,
  },
  {
    path: "metrics/:metricId",
    element: <Metrics />,
  },
]);

export default function Home() {
  return (
    <main className="awsui-dark-mode">
      <RouterProvider router={router} />
    </main>
  );
}
