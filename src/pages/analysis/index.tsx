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
  Button,
  Badge,
} from "@cloudscape-design/components";
import { GetServerSideProps } from "next";

import { Node } from "@/model/localReputationMetric";
import Provider from "@/utils/provider";
import { useRouter } from "next/navigation";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let nodes: Array<Node> = [];
  let error = null;
  try {
    let client = Provider.getInstance().graphql();
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
  const router = useRouter();
  if (error) {
    return <p>{error}</p>;
  }
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
            <Table
              onRowClick={({ detail }) =>
                Provider.getInstance().setModel("node", detail.item)
              }
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
                  cell: (e) => <Badge> {e.network.toUpperCase()} </Badge>,
                },
                {
                  id: "metrics",
                  header: "Analysis",
                  cell: (node) => (
                    <Button
                      variant="normal"
                      onClick={() => {
                        Provider.getInstance().setModel("node", node);
                        router.push(`/analysis/node/${node.node_id}`);
                      }}
                    >
                      Full Analysis
                    </Button>
                  ),
                },
              ]}
              items={listNodes}
              loadingText="Fetch nodes"
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
