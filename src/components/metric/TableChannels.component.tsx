/**
 * Table component to show the channels information
 * inside a table
 */
import { Box, Container, Header, Table } from "@cloudscape-design/components";

type ViewProps = {};

export function TableChannels(props: ViewProps) {
  let items: Array<String> = [];
  return (
    <Table
      header={<Header>Node Channels</Header>}
      stickyHeader={true}
      loadingText="Loading channels"
      items={items}
      columnDefinitions={[
        {
          id: "dummy",
          header: "dummy",
          cell: (e) => e,
        },
      ]}
      empty={
        <Box textAlign="center" color="inherit">
          <b>No Channels</b>
        </Box>
      }
    />
  );
}
