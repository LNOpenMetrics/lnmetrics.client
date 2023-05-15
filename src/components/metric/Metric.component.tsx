/**
 * Generic component for the metric view.
 */
import { Container, Grid } from "@cloudscape-design/components";
import Uptime from "@/components/metric/UptimeChart.component";

type ViewProps = {};

export default function Metric(props: ViewProps) {
  return (
    <Container>
      <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
        <div className="content-center">
          <Uptime />
        </div>
        <div className="content-center">
          <div>placeholder</div>
        </div>
      </Grid>
    </Container>
  );
}
