/**
 * Show the node analysis!
 */
import { useRouter } from "next/router";
import {
  AppLayout,
  Container,
  ContentLayout,
  Header,
  SpaceBetween,
} from "@cloudscape-design/components";

import { Node } from "@/model/localReputationMetric";
import Provider from "@/utils/provider";
import { useEffect, useState } from "react";

export default function NodeAnalysis() {
  const route = useRouter();
  let [node, setNode] = useState<Node | undefined>(undefined);
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
          <Container
            header={<Header variant="h2">{`${node.alias} metrics`}</Header>}
          >
            <>TODO put some kind of content</>
          </Container>
        </ContentLayout>
      }
    />
  );
}
