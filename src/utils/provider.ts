import { container } from "tsyringe";
import { GraphQLClient } from "@/utils/client";

export default class Provider {
  private static instance?: Provider;

  private static inflate(): Provider {
    if (process.env.LNMETRICS_URL != null) {
      let url = process.env.LNMETRICS_URL;
      console.error(`URL server ${url}`);
      container.register("lnmetrics_url", { useValue: url });
      return new Provider();
    }
    //throw new Error("please specify the lambda endpoint");
    container.register("lnmetrics_url", {
      useValue: "https://api.lnmetrics.info/query",
    });
    return new Provider();
  }

  public static getInstance(): Provider {
    if (Provider.instance == null) {
      Provider.instance = Provider.inflate();
    }
    return Provider.instance!!;
  }

  public graphql(): GraphQLClient {
    return container.resolve(GraphQLClient);
  }

  public setModel<T>(key: string, value: T) {
    container.register(key, {
      useValue: value,
    });
  }

  public getModel<T>(key: string): T {
    return container.resolve(key);
  }
}
