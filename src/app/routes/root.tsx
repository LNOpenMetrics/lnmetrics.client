"use client";
import {
  Alert,
  AppLayout,
  ContentLayout,
  Button,
  SpaceBetween,
  Header,
  Container,
} from "@cloudscape-design/components";
import { Link } from "react-router-dom";

export default function Root() {
  return (
    <AppLayout
      contentType="form"
      content={
        <ContentLayout
          header={
            <SpaceBetween size="m">
              <Header
                variant="h1"
                description="An Open Source Framework to Collect Lightning Network Metrics"
              >
                Lightning Network Metrics
              </Header>
              <span>
                <q>
                  If we have data, let&#39;s look at data. If all we have are
                  opinions, let&#39;s go with mine.
                </q>{" "}
                — Jim Barksdale
              </span>
              <Alert>This is an alpha pre version of the explorer!</Alert>
            </SpaceBetween>
          }
        >
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
              <Link to="/rfc">
                <Button variant="normal">Read RFCs</Button>
              </Link>
            </Container>
            <Container
              header={
                <Header
                  variant="h2"
                  description="See and Analyze all the metrics defined inside the RFCs"
                >
                  Lightning Network Explorer
                </Header>
              }
            >
              <Button variant="normal"> Explore </Button>
            </Container>
          </SpaceBetween>
        </ContentLayout>
      }
      headerSelector="#header"
    />
  );
}
