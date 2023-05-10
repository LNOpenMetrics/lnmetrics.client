/**
 * Main Analysis View to show the list of nodes inside
 * a table and then analyze the metric of the node
 * choosed  by the user.
 */
import "reflect-metadata";

import {
  Box,
  Header,
  Pagination,
  Table,
  TextFilter,
} from "@cloudscape-design/components";

import Provider from "@/utils/provider";
import { Node } from "@/model/localReputationMetric";

// FIXME: ServerComponents are cool, but the amazon cloudscape looks like
// a complex and easy library to use and it should be shipped on the
// client side. This make the server component a lot of harder to write.
// so we should use the PageRouting of nextjs
async function FetchNodes(): Promise<Array<Node>> {
  let client = Provider.graphql();
  return await client.getListNodes({ network: "bitcoin" });
}

export default () => {
  let listNodes: Array<Node> = [];
  console.log(`${listNodes}`);
  return (
    <Table
      onSelectionChange={({ detail }) => {}}
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
      selectionType="multi"
      trackBy="network"
      visibleColumns={["node_alias", "node_implementation", "node_network"]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No resources</b>
          <Box padding={{ bottom: "s" }} variant="p" color="inherit">
            No resources to display.
          </Box>
        </Box>
      }
      filter={
        <TextFilter filteringPlaceholder="Find resources" filteringText="" />
      }
      header={
        <Header
          counter={listNodes.length ? "(" + listNodes.length + "/10)" : "(10)"}
        >
          Lightning Network Nodes
        </Header>
      }
      pagination={
        <Pagination
          currentPageIndex={1}
          pagesCount={2}
          ariaLabels={{
            nextPageLabel: "Next page",
            previousPageLabel: "Previous page",
            pageLabel: (pageNumber) => `Page ${pageNumber} of all pages`,
          }}
        />
      }
    />
  );
};
