import { NextApiRequest, NextApiResponse } from "next";

import { API } from "@/utils/api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    let rfcMetrics = await API.list_metrics_rfc();
    res.status(200).json({ metrics: rfcMetrics });
  } catch (e) {
    console.error(`${e}`);
    res.status(500).json({ error: e });
  }
}
