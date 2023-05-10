import { MetricModel, MetricsModel } from "@/model/rfc_model";
import { Fetcher } from "swr";

export async function fetcher<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);
  return res.json();
}

export class Fetch {
  // Fetch the content and return the response as a String
  public static async raw_fetch(url: string): Promise<string> {
    return await (await fetch(url)).text();
  }
  // Run an Http request and return the response as a json object
  public static async json_fetch<T>(url: string): Promise<T> {
    return await (await fetch(url)).json();
  }
}

export class API {
  public static async list_metrics_rfc(): Promise<Array<MetricModel>> {
    let manifest: MetricsModel = await Fetch.json_fetch(
      "https://raw.githubusercontent.com/LNOpenMetrics/lnmetrics.rfc/main/metrics.json"
    );
    let metrics = manifest.metrics;
    console.debug(`Metrics inside the server ${JSON.stringify(metrics)}`);
    return metrics;
  }

  public static async get_metric_rfc(local_path: string): Promise<string> {
    let basic_path = `https://raw.githubusercontent.com/LNOpenMetrics/lnmetrics.rfc/main/${local_path}`;
    let markdown = await Fetch.raw_fetch(basic_path);
    return markdown;
  }
}
