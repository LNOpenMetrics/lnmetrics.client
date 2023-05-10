import { useState, useEffect } from "react";

import {
  AppLayout,
  Box,
  Button,
  Container,
  ContentLayout,
  Header,
  SpaceBetween,
  Table,
} from "@cloudscape-design/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { API } from "@/utils/api";
import { MetricModel } from "@/model/rfc_model";

// FIXME: Add a table with all the metrics supported, and then we
// can add a table with the link that can be done in different ways.
export default function RfcComponent() {
  const [metrics, setMetrics] = useState<Array<MetricModel>>([]);
  const [markdown, setMarkdown] = useState<string | undefined>(undefined);
  useEffect(() => {
    API.list_metrics_rfc().then((result) => setMetrics(result));
  }, []);

  return (
    <AppLayout
      contentType="form"
      content={
        <ContentLayout>
          <SpaceBetween size="xxl">
            <Table
              columnDefinitions={[
                {
                  id: "name",
                  header: "Metrics Name",
                  cell: (metric) => metric.name,
                  sortingField: "name",
                },
                {
                  id: "description",
                  header: "Description",
                  cell: (metric) => metric.short_description,
                  sortingField: "description",
                },
                {
                  id: "rfc",
                  header: "Select",
                  cell: (metric) => (
                    <Button
                      onClick={() => {
                        let rfc = metric.rfc;
                        API.get_metric_rfc(rfc!).then((result) =>
                          setMarkdown(result)
                        );
                      }}
                    >
                      Select
                    </Button>
                  ),
                },
              ]}
              items={metrics}
              loadingText="Loading..."
              empty={
                <Box textAlign="center" color="inherit">
                  <b>No resources</b>
                  <Box padding={{ bottom: "s" }} variant="p" color="inherit">
                    No resources to display.
                  </Box>
                </Box>
              }
            />
            {markdown !== undefined && (
              <ContentLayout>
                <Container
                  header={
                    <Header
                      variant="h2"
                      description="Request for Comment (RFC) for Lightning Network Metrics"
                    >
                      Lightning Network RFC
                    </Header>
                  }
                >
                  <ReactMarkdown
                    children={markdown}
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                  />
                  ,
                </Container>
              </ContentLayout>
            )}
          </SpaceBetween>
        </ContentLayout>
      }
      headerSelector="#header"
    />
  );
}
