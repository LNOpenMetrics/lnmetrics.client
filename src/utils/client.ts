/**
 * Client implementations to work with the application
 */
import {
  ApolloClient,
  InMemoryCache,
  gql,
  DefaultOptions,
  NormalizedCacheObject,
} from "@apollo/client";
import { inject, singleton } from "tsyringe";

import { Node } from "@/model/localReputationMetric";
import * as querystring from "querystring";

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

@singleton()
export class GraphQLClient {
  private inner: ApolloClient<NormalizedCacheObject>;

  // @ts-ignore
  constructor(@inject("lnmetrics_url") url: string) {
    this.inner = new ApolloClient({
      uri: url,
      cache: new InMemoryCache(),
      defaultOptions: defaultOptions,
    });
  }

  private async call<T>(ops: {
    query: string;
    variables: Object;
    queryName: string;
  }): Promise<T> {
    let result = await this.inner.query({
      query: gql(`${ops.query}`),
      variables: ops.variables,
    });
    if (result.error) {
      throw new Error(`${result.error}`);
    }
    return result.data[ops.queryName];
  }

  public async getScoringLocalReputation<T>(args: {
    node_id: string;
    network: string;
  }): Promise<T> {
    return await this.call<T>({
      query: GET_LOCAL_REPUTATION_SCORE,
      variables: args,
      queryName: "",
    });
  }

  /**
   * Fetch the list of nodes that are on the server, by network
   * @param args
   */
  public async getListNodes(args: { network?: string }): Promise<Array<Node>> {
    return await this.call<Array<Node>>({
      query: GET_LIST_NODES,
      variables: args,
      queryName: "getNodes",
    });
  }

  public async GetNodeInfo(args: { network: string; node_id: string }) {
    return await this.call({
      query: GET_NODE_INFO,
      variables: args,
      queryName: "",
    });
  }

  public async GetLocalScoreMetric(args: { network: string; node_id: string }) {
    return await this.call({
      query: GET_RAW_LOCAL_SCORE,
      variables: args,
      queryName: "",
    });
  }
}

export const GET_LOCAL_REPUTATION_SCORE: string = "";
export const GET_LIST_NODES: string = `
query GetNodes($network: String!){
  getNodes(network: $network) {
    version
    node_id
    alias
    color
    network
    address {
      type
      host
      port
    } 
    os_info {
      os
      version
      architecture
    }
    node_info {
      implementation
      version
    }
    timezone
    last_update
  }
}
`;

export const GET_NODE_INFO: string = "";
export const GET_RAW_LOCAL_SCORE: string = "";
