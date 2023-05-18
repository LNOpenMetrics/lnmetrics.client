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

import {
  LocalReputation,
  Node,
  RawLocalReputation,
} from "@/model/localReputationMetric";
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
    if (result.error || !result.data) {
      console.error(`${JSON.stringify(result)}`);
      throw new Error(`${result.error}`);
    }
    return result.data[ops.queryName];
  }

  public async getLocalScoreForNodesByNetwork(args: {
    network: string;
  }): Promise<{ [key: string]: LocalReputation }> {
    let reputationByNetwork: { [key: string]: LocalReputation } = {};
    let nodes = await this.getListNodes(args);
    for (let node of nodes) {
      let reputation = await this.getScoringLocalReputation({
        network: args.network,
        node_id: node.node_id,
      });
      reputationByNetwork[node.node_id] = reputation;
    }
    return reputationByNetwork;
  }

  public async getScoringLocalReputation(args: {
    node_id: string;
    network: string;
  }): Promise<LocalReputation> {
    return await this.call<LocalReputation>({
      query: GET_LOCAL_REPUTATION_SCORE,
      variables: args,
      queryName: "getMetricOneResult",
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

  public async getRawLocalReputation(args: {
    network: string;
    node_id: string;
    first: number;
    end?: number;
  }): Promise<RawLocalReputation> {
    return await this.call<RawLocalReputation>({
      query: GET_RAW_LOCAL_REPUTATION,
      variables: args,
      queryName: "metricOne",
    });
  }
}

export const GET_LOCAL_REPUTATION_SCORE: string = `
query LocalScoreOutput($network: String!, $node_id: String!) {
  getMetricOneResult(network: $network, node_id: $node_id) {
    age
    last_update
    version
    up_time {
      one_day
      ten_days
      thirty_days
      six_months
    }
    forwards_rating {
      one_day {
        success
        failure
        local_failure
      }
      ten_days {
        success
        failure
        local_failure
      }
      thirty_days {
        success
        failure
        local_failure
      }
      six_months {
        success
        failure
        local_failure
      }
      full {
        success
        failure
        local_failure
      }
    }
    channels_info {
      node_id
      alias
      channel_id
      capacity
      direction
      age
      up_time {
        one_day
        ten_days
        thirty_days
        six_months
        full
      }
      forwards_rating {
      one_day {
        success
        failure
        local_failure
      }
      ten_days {
        success
        failure
        local_failure
      }
        thirty_days {
        success
        failure
        local_failure
      }
        six_months {
        success
        failure
        local_failure
      }
      full {
          success
          failure
          local_failure
        }
      }
    }
  }
}
`;
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

export const GET_RAW_LOCAL_REPUTATION: string = `
query GetRawMetric($network: String!, $node_id: String!, $first: Int!, $end: Int) {
  metricOne(network: $network, node_id: $node_id, first: $first, last: $end) {
    up_time {
      fee {
        base
        per_msat
      }
      forwards {
        failed
        completed
      }
    }
    channels_info {
      node_id
      channel_id
      node_alias
      online
      direction
      capacity
      fee {
        base
        per_msat
      }
      forwards {
        direction
        status
        timestamp
        failure_code
        failure_code
      }
    }
  }
}
`;
