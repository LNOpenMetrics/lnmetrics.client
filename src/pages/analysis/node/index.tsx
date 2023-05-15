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

import { Node } from "@/model/localReputationMetric";
import Provider from "@/utils/provider";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import Metric from "@/components/metric/Metric.component";
import { TableChannels } from "@/components/metric/TableChannels.component";

export default function NodeAnalysis() {
  const route = useRouter();
  let [node, setNode] = useState<Node | undefined>(undefined);
  const longEnUSFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  useEffect(() => {
    try {
      let node = Provider.getInstance().getModel<Node>("node");
      setNode(node);
    } catch (e) {
      console.error(`${e}`);
      route.push("/analysis");
    }
  });
  if (!node) {
    return <p>Loading ..</p>;
  }
  let time = new Date(node.last_update * 1000).toLocaleTimeString("en-US");
  return (
    <AppLayout
      contentType="form"
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header variant="h1" description={`${node.node_id}`}>
                {node.alias}
              </Header>
            </SpaceBetween>
          }
        >
          <SpaceBetween size="m">
            <Container>
              <SpaceBetween size="m">
                <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
                  <ColumnLayout columns={1}>
                    <div className="content-center">
                      <Badge>{node.alias}</Badge>
                    </div>
                    <div className="content-center">
                      <QRCodeSVG size={300} level="H" value={node.node_id} />
                    </div>
                  </ColumnLayout>
                  <ColumnLayout columns={1}>
                    <div></div>
                    <div className="content-center">
                      <Table
                        columnDefinitions={[
                          {
                            id: "type",
                            header: "Address type",
                            cell: (e) => e.type,
                          },
                          {
                            id: "host",
                            header: "Host",
                            cell: (e) => e.host.substring(0, 10) + "...",
                          },
                          { id: "port", header: "Port", cell: (e) => e.port },
                          {
                            id: "copy",
                            header: "Copy",
                            cell: (e) => (
                              <Button
                                iconName="copy"
                                onClick={() => {
                                  /* copy to clipboard implementation */
                                }}
                              />
                            ),
                          },
                        ]}
                        items={node.address}
                        loadingText="Loading resources"
                        trackBy="name"
                        empty={
                          <Box textAlign="center" color="inherit">
                            <b>No address</b>
                          </Box>
                        }
                      />
                    </div>
                    <div className="content-center">
                      <Badge>Last Update {time}</Badge>
                    </div>
                  </ColumnLayout>
                </Grid>
              </SpaceBetween>
            </Container>

            <Metric />
            <TableChannels />
          </SpaceBetween>
        </ContentLayout>
      }
    />
  );
}
