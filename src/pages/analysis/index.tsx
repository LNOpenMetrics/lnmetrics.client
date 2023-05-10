/**
 * Main Analysis View to show the list of nodes inside
 * a table and then analyze the metric of the node
 * choosed  by the user.
 */
import "reflect-metadata";
import { useState } from "react";

import {
  Box,
  Header,
  Table,
  SpaceBetween,
  ContentLayout,
  AppLayout,
  TextFilter,
} from "@cloudscape-design/components";
import { GetServerSideProps } from "next";

import { Node } from "@/model/localReputationMetric";
import Provider from "@/utils/provider";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let nodes: Array<Node> = [];
  let error = null;
  try {
    let client = Provider.graphql();
    let mainet = await client.getListNodes({ network: "bitcoin" });
    let testnet = await client.getListNodes({ network: "testnet" });
    console.log(JSON.stringify(mainet));
    nodes = mainet.concat(testnet);
  } catch (e) {
    console.error(`error: ${e}`);
    error = `${e}`;
  }
  return {
    props: {
      nodes: nodes,
      error: error,
    },
  };
};

type ViewProps = {
  nodes: Array<Node>;
  error?: string;
};

function filterNodesByAlias(
  nodeAlias: string,
  nodes: Array<Node>
): Array<Node> {
  return nodes.filter(({ alias }) =>
    alias.toLocaleLowerCase().includes(nodeAlias.toLocaleLowerCase())
  );
}

export default function Analysis({ nodes, error }: ViewProps) {
  let [alias, setAlias] = useState("");
  let [listNodes, setNodes] = useState(nodes);
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <AppLayout
      contentType="form"
      content={
        <ContentLayout>
          <SpaceBetween size="xxl">
            <Table
              stickyHeader={true}
              columnDefinitions={[
                {
                  id: "node_alias",
                  header: "Node Alias",
                  cell: (e) => e.alias,
                },
                {
                  id: "node_implementation",
                  header: "Node Kind",
                  cell: (e) => e.node_info.implementation,
                },
                {
                  id: "node_network",
                  header: "Node Network",
                  sortingField: "network",
                  cell: (e) => e.network,
                },
              ]}
              items={listNodes}
              loadingText="Fetch nodes"
              visibleColumns={[
                "node_alias",
                "node_implementation",
                "node_network",
              ]}
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No resources</b>
                  <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                    No resources to display.
                  </Box>
                </Box>
              }
              filter={
                <TextFilter
                  filteringPlaceholder="Find resources"
                  filteringText={alias}
                  onChange={({ detail }) => {
                    setAlias(detail.filteringText);
                    setNodes(filterNodesByAlias(detail.filteringText, nodes));
                  }}
                />
              }
              header={<Header>Lightning Network Nodes</Header>}
            />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
