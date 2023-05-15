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
import { GetServerSideProps } from "next";
import { Node } from "@/model/localReputationMetric";

export const getServerSideProps: GetServerSideProps = async (context) => {
  let nodes: Array<Node> = [];
  let error = null;
  try {
    let rfcMetrics = await API.list_metrics_rfc();
    return {
      props: {
        metrics: rfcMetrics,
        error: null,
      },
    };
  } catch (e) {
    console.error(`${e}`);
    return {
      props: {
        nodes: null,
        error: e!.toString(),
      },
    };
  }
};

type ViewProps = {
  metrics: Array<MetricModel>;
  error?: string;
};

export default function RfcComponent({ metrics, error }: ViewProps) {
  const [markdown, setMarkdown] = useState<string | undefined>(undefined);
  return (
    <AppLayout
      contentType="form"
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="The lnmetrics project aims to develop a collection of tools for running Lightning Network nodes with daily activity.
                    This project involves defining and collecting Lightning Network metrics through a data-driven analysis."
              >
                Lightning Network Metrics Specification (RFC)
              </Header>
            </SpaceBetween>
          }
        >
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
