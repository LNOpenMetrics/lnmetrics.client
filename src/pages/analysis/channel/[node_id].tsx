import { GetServerSideProps } from "next";
import {
  Address,
  ChannelInfo,
  LocalReputation,
  RawChannelInfo,
  Node,
} from "@/model/localReputationMetric";
import Provider from "@/utils/provider";
import {
  AppLayout,
  Button,
  ContentLayout,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import NodeView from "@/components/NodeView.component";

type ViewChannelInfo = {
  reputation: Array<ChannelInfo>;
  raw_info: Array<RawChannelInfo>;
  node_info: Node;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let channel_info: ViewChannelInfo | null = null;
  let error = null;

  console.log(`${JSON.stringify(context.query)}`);
  let node_id: string = context.params!.node_id!.toString();
  let network: string = context.query!.network!.toString();
  let channel: string = context.query!.channel_id!.toString();

  let client = Provider.getInstance().graphql();
  try {
    let reputation = await client.getScoringLocalReputation({
      network: network,
      node_id: node_id,
    });
    let last_raw_metrics = await client.getRawLocalReputation({
      network: network,
      node_id: node_id,
      // We get last  metrics
      first: reputation.last_update - 10 * 60,
    });
    let reputation_channel = reputation.channels_info.filter(
      (value) => (value.channel_id = channel)
    );
    let raw_channel_info = last_raw_metrics.channels_info.filter(
      (value) => (value.channel_id = channel)
    );
    let dir = raw_channel_info[0];
    channel_info = {
      reputation: reputation_channel,
      raw_info: raw_channel_info,
      node_info: {
        node_id: dir.node_id,
        alias: dir.node_alias,
        address: [],
        network: network,
        timezone: "",
        color: "",
        last_update: reputation.last_update,
        node_info: {
          implementation: "",
          version: "",
        },
      },
    };
  } catch (e) {
    console.error(`error: ${e}`);
    error = `${e}`;
  }
  return {
    props: {
      channel_info: channel_info,
      error: error,
    },
  };
};

type ViewProps = {
  channel_info?: ViewChannelInfo;
  error?: string;
};

export default function NodeAnalysis({ channel_info, error }: ViewProps) {
  let time = new Date(
    channel_info!.node_info!.last_update! * 1000
  ).toLocaleString("en-US");
  return (
    <AppLayout
      contentType="form"
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description={
                  <p>
                    {channel_info?.node_info.node_id}
                    <Button
                      iconName="copy"
                      variant="inline-icon"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${channel_info?.node_info.node_id}`
                        );
                      }}
                    />
                  </p>
                }
              >
                {channel_info?.node_info.alias}
              </Header>
            </SpaceBetween>
          }
        >
          <NodeView node={channel_info?.node_info!} time={time}>
            <></>
          </NodeView>
        </ContentLayout>
      }
    />
  );
}
