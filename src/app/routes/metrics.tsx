"use client";
import { useState, useEffect } from "react";
import {
  AppLayout,
  Container,
  ContentLayout,
  SpaceBetween,
} from "@cloudscape-design/components";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Fetch } from "@/app/utils/api";
import { useParams } from "react-router-dom";

export default function Metrics() {
  let { metricId } = useParams();
  const [markdown, setMarkdown] = useState("");

  console.log(metricId);
  useEffect(() => {
    Fetch.raw_fetch(
      `https://raw.githubusercontent.com/LNOpenMetrics/lnmetrics.rfc/main/metrics/${metricId}`
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
            <Container>
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
