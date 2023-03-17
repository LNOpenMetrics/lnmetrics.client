"use client";
import "./base.scss";
import {
  Alert,
  AppLayout,
  ContentLayout,
  Button,
  SpaceBetween,
  Header,
  Container,
  Link,
} from "@cloudscape-design/components";

export default function Home() {
  return (
    <main className="awsui-dark-mode">
      <AppLayout
        contentType="form"
        content={
          <ContentLayout
            header={
              <SpaceBetween size="m">
                <Header
                  variant="h1"
                  info={<Link>Info</Link>}
                  description="An Open Source Framework to Collect Lightning Network Metrics"
                >
                  Lightning Networ Metrics
                </Header>

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
                <Button variant="normal">
                  {" "}
                  Read the RFCs (TODO make a list of them and then fetch the
                  RFC){" "}
                </Button>
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
    </main>
  );
}
