import { QRCodeSVG } from "qrcode.react";
import { Node } from "@/model/localReputationMetric";
import {
  Badge,
  Box,
  Button,
  ColumnLayout,
  Container,
  Grid,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";

type ViewProps = {
  node: Node;
  time: string;
  children: string | JSX.Element | JSX.Element[] | undefined;
};

export default function NodeView({ children, node, time }: ViewProps) {
  return (
    <SpaceBetween size="m">
      <Container>
        <SpaceBetween size="m">
          <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
            <ColumnLayout columns={1}>
              <div className="content-center">
                <Badge color="blue">{node.alias}</Badge>
              </div>
              <div className="content-center">
                <QRCodeSVG size={300} level="H" value={node.node_id} />
              </div>
            </ColumnLayout>
            <ColumnLayout columns={1}>
              <div className="content-center">
                <Badge color="green">Last Update {time}</Badge>
              </div>
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
                            navigator.clipboard.writeText(
                              `${node?.node_id}@${e.host}:${e.port}`
                            );
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
            </ColumnLayout>
          </Grid>
        </SpaceBetween>
      </Container>
      {children}
    </SpaceBetween>
  );
}
