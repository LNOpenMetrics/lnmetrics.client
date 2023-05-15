/**
 * Generic component for the metric view.
 */
import { Container, Grid } from "@cloudscape-design/components";
import Uptime from "@/components/metric/UptimeChart.component";

import {
  AllForwards,
  Uptime as UptimeModel,
} from "@/model/localReputationMetric";
import ForwardRatingView from "@/components/metric/ForwardRating.component";

type ViewProps = {
  up_time: UptimeModel;
  forwards_rating: AllForwards;
};

export default function Metric(props: ViewProps) {
  return (
    <Container>
      <Grid gridDefinition={[{ colspan: 6 }, { colspan: 6 }]}>
        <div className="content-center">
          <Uptime up_time={props.up_time} />
        </div>
        <div className="content-center">
          <ForwardRatingView forwards_rating={props.forwards_rating} />
        </div>
      </Grid>
    </Container>
  );
}
