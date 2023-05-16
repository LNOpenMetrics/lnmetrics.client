/**
 * Table component to show the channels information
 * inside a table
 */
import {
  Badge,
  Box,
  Button,
  Header,
  Table,
} from "@cloudscape-design/components";
import { ChannelInfo, Node } from "@/model/localReputationMetric";
import { useRouter } from "next/navigation";

type ViewProps = {
  node: Node;
  channels_info: Array<ChannelInfo>;
};

export function TableChannels({ channels_info, node }: ViewProps) {
  const router = useRouter();
  return (
    <Table
      header={
        <>
          <Badge color="red"> experimental </Badge>{" "}
          <Header>Node Channels </Header>{" "}
        </>
      }
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
          cell: (e) => new Date(e.age * 1000).toLocaleString("en-US"),
        },
        {
          id: "capacity",
          header: "Channel Size",
          cell: (e) => e.capacity + " msat",
        },
        {
          id: "status",
          header: "Channel Status",
          cell: (e) => (
            <div className="content-center">
              <Badge color={e.status == "OPEN" ? "green" : "red"}>
                {e.status!}
              </Badge>
            </div>
          ),
        },
        {
          id: "analysis",
          header: "Channel Analysis",
          cell: (e) => (
            <div className="content-center">
              <Button
                iconName="search"
                onClick={() => {
                  router.push(
                    `/analysis/channel/${node.node_id}?network=${node.network}&channel_id=${e.channel_id}`
                  );
                }}
              />
            </div>
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
