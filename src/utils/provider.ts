import { container } from "tsyringe";
import { GraphQLClient } from "@/utils/client";

export default class Provider {
  private static instance?: GraphQLClient;

  private static inflate(): GraphQLClient {
    if (process.env.LNMETRICS_URL != null) {
      let url = process.env.LNMETRICS_URL;
      console.error(`URL server ${url}`);
      container.register("lnmetrics_url", { useValue: url });
      return container.resolve(GraphQLClient);
    }
    //throw new Error("please specify the lambda endpoint");
    container.register("lnmetrics_url", {
      useValue: "https://api.lnmetrics.info/query",
    });
    return container.resolve(GraphQLClient);
  }

  public static graphql(): GraphQLClient {
    if (Provider.instance == null) {
      Provider.instance = Provider.inflate();
    }
    return Provider.instance!!;
  }
}
