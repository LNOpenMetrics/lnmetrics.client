"use client";
import { useState, useEffect } from "react";
import {
  AppLayout,
  Container,
  ContentLayout,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Fetch } from "@/app/utils/api";

// FIXME: Add a table with all the metrics supported, and then we
// can add a table with the link that can be done in different ways.
export default function RfcComponent() {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    Fetch.raw_fetch(
      "https://raw.githubusercontent.com/LNOpenMetrics/lnmetrics.rfc/main/README.md"
    ).then((response) => {
      setMarkdown(response);
    });
  }, []);

  return (
    <AppLayout
      contentType="form"
      content={
        <ContentLayout>
          <SpaceBetween size="xxl">
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
          </SpaceBetween>
        </ContentLayout>
      }
      headerSelector="#header"
    />
  );
}
