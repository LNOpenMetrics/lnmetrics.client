/**
 * Table component to show the channels information
 * inside a table
 */
import {
  Box,
  Button,
  Container,
  Header,
  Table,
} from "@cloudscape-design/components";
import { ChannelInfo } from "@/model/localReputationMetric";

type ViewProps = {
  channels_info: Array<ChannelInfo>;
};

export function TableChannels({ channels_info }: ViewProps) {
  return (
    <Table
      header={<Header>Node Channels</Header>}
      stickyHeader={true}
      loadingText="Loading channels"
      items={channels_info}
      columnDefinitions={[
        {
          id: "direction",
          header: "Direction",
          cell: (e) => e.direction,
        },
        {
          id: "short_channel_id",
          header: "Short Channel ID",
          cell: (e) => e.channel_id,
        },
        {
          id: "first_time_seen",
          header: "First Time seen",
          cell: (e) => e.age,
        },
        {
          id: "capacity",
          header: "Channel Size",
          cell: (e) => e.capacity,
        },
        {
          id: "expand",
          header: "Analyze",
          cell: (e) => (
            <Button
              iconName="search"
              onClick={() => {
                /* copy to clipboard implementation */
              }}
            />
          ),
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
