import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

import {
  AppLayout,
  ContentLayout,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";

import createGraph, { Graph } from "ngraph.graph";

import { LocalReputation, Node } from "@/model/localReputationMetric";
import Provider from "@/utils/provider";

import NGraph from "@/components/NGraph.component";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let reputationByNode: { [key: string]: LocalReputation } | undefined =
    undefined;
  let error = null;
  try {
    reputationByNode = await Provider.getInstance()
      .graphql()
      .getLocalScoreForNodesByNetwork({ network: "bitcoin" });
  } catch (e) {
    console.error(`error: ${e}`);
    error = `${e}`;
  }
  return {
    props: {
      reputationByNode: reputationByNode,
      error: error,
    },
  };
};

type ViewProps = {
  reputationByNode?: { [key: string]: LocalReputation };
  error: string;
};

function buildGraph(reputationByNode: {
  [key: string]: LocalReputation;
}): Graph {
  let graph = createGraph();
  console.log(reputationByNode);
  Object.entries(reputationByNode).forEach(([node_id, reputation]) => {
    graph.addNode(node_id, {
      last_update: reputation.last_update,
      source: true,
      reputation: reputation.forwards_rating.ten_days,
    });
    reputation.channels_info.forEach((channel_info) => {
      if (channel_info.direction === "OUTCOMING") {
        graph.addLink(node_id, channel_info.node_id, {
          forwards_rating: channel_info.forwards_rating.ten_days,
        });
      } else if (channel_info.direction === "INCOOMING") {
        graph.addLink(channel_info.node_id, node_id, {
          forwards_rating: channel_info.forwards_rating.ten_days,
        });
      }
    });
  });
  return graph;
}

export default function GraphView({ reputationByNode, error }: ViewProps) {
  let [container, setContainer] = useState<any>();
  let [graph, setGraph] = useState<Graph | undefined>();
  useEffect(() => {
    let graph = buildGraph(reputationByNode!);
    setGraph(graph);
  }, []);

  return (
    <AppLayout
      contentType="form"
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="All the lightning node that are sharing the metrics"
              >
                Lightning Network Nodes
              </Header>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="xxl">
            <div id="container-ngraph" ref={(ref) => setContainer(ref)}>
              <NGraph container={container} graph={graph} />
            </div>
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
