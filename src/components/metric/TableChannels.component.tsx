/**
 * Table component to show the channels information
 * inside a table
 */
import {
  Badge,
  Box,
  Button,
  Header,
  Popover,
  StatusIndicator,
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
  channels_info = channels_info.sort((a, b) => {
    if (a.age > b.age) {
      return -1;
    } else if (a.age < b.age) {
      return 1;
    }
    return 0;
  });
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
          id: "alias",
          header: "Node Alias",
          cell: (e) => e.alias,
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
          id: "score",
          header: "Channel Score last 10 days",
          cell: (e) => (
            <div className="content-center">
              <p>
                {(e.up_time.ten_days * 0.1 +
                  e.forwards_rating.ten_days.success * 10) %
                  100}
              </p>
              <Popover
                dismissButton={false}
                position="top"
                size="small"
                triggerType="custom"
                content={
                  <StatusIndicator type="info">
                    Simple scoring function calculated as follows: ($up_time *
                    0.1 + $forwards_scoring * 10) % 100
                  </StatusIndicator>
                }
              >
                <Button iconName="status-info" variant="icon" />
              </Popover>
            </div>
          ),
        },
        {
          id: "analysis",
          header: "Channel Analysis",
          cell: (e) => (
            <div className="content-center">
              <Button
                disabled={e.status !== "OPEN"}
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
