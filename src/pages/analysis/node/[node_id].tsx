/**
 * Show the node analysis!
 */
import { useRouter } from "next/router";
import {
  AppLayout,
  ColumnLayout,
  Container,
  ContentLayout,
  Header,
  SpaceBetween,
  Form,
  Badge,
  Grid,
  TextContent,
  Box,
  Table,
  Button,
} from "@cloudscape-design/components";

import { LocalReputation, Node } from "@/model/localReputationMetric";
import Provider from "@/utils/provider";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Metric from "@/components/metric/Metric.component";
import { TableChannels } from "@/components/metric/TableChannels.component";
import { GetServerSideProps } from "next";
import NodeView from "@/components/NodeView.component";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let reputation: LocalReputation | undefined;
  let error = null;

  let node_id: string = context.params!.node_id!.toString();
  let network: string = context.query!.network!.toString();
  let client = Provider.getInstance().graphql();
  try {
    reputation = await client.getScoringLocalReputation({
      network: network,
      node_id: node_id,
    });
    // FIXME: the RFC should have the last_uptime inside the scoring.
    // See evolution for https://github.com/LNOpenMetrics/lnmetrics.rfc/issues/25
    let last_timestamp = reputation.last_update - 10 * 60;
    let last_raw_metrics = await client.getRawLocalReputation({
      network: network,
      node_id: node_id,
      // We get last  metrics
      first: last_timestamp,
    });
    reputation.channels_info.forEach((value) => {
      let channel_info = value;
      let channels_in_raw = last_raw_metrics.channels_info.filter(
        (value) => value.channel_id == channel_info.channel_id
      );
      if (channels_in_raw.length > 0) {
        value.status = "OPEN";
      } else {
        value.status = "CLOSED";
      }
    });
  } catch (e) {
    console.error(`error: ${e}`);
    error = `${e}`;
  }
  return {
    props: {
      local_reputation: reputation,
      error: error,
    },
  };
};

type ViewProps = {
  local_reputation?: LocalReputation;
  error?: string;
};

export default function NodeAnalysis({ local_reputation, error }: ViewProps) {
  const route = useRouter();
  // FIXME: use the server props to get the node info from the server without use the provider
  let [node, setNode] = useState<Node | undefined>(undefined);
  useEffect(() => {
    try {
      let node = Provider.getInstance().getModel<Node>("node");
      setNode(node);
    } catch (e) {
      console.error(`${e}`);
      route.push("/analysis").then((value) => {});
    }
  });
  if (!node) {
    return <p>Loading ..</p>;
  }
  let time = new Date(node.last_update * 1000).toLocaleString("en-US");
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
                    {node.node_id}{" "}
                    <Button
                      iconName="copy"
                      variant="inline-icon"
                      onClick={() => {
                        navigator.clipboard.writeText(`${node?.node_id}`);
                      }}
                    />
                  </p>
                }
              >
                {node.alias}
              </Header>
            </SpaceBetween>
          }
        >
          <NodeView node={node} time={time}>
            <Metric
              up_time={local_reputation?.up_time!}
              forwards_rating={local_reputation?.forwards_rating!}
            />
            <TableChannels
              node={node!}
              channels_info={local_reputation?.channels_info!}
            />
          </NodeView>
        </ContentLayout>
      }
    />
  );
}
