import { AllForwards } from "@/model/localReputationMetric";
import { Grid } from "@cloudscape-design/components";
import { ResponsivePie } from "@nivo/pie";

type ViewProps = {
  forwards_rating: AllForwards;
};

const colors: any = {
  success: "#32A966",
  failure: "#FD706B",
  internal_failure: "#FFB347",
};
const getColor = function (bar: any) {
  return colors[bar.id];
};

type DayData = {
  title: string;
  data: Array<{ id: string; label: string; value: number; color: string }>;
};

function preparePieChartData(rating: AllForwards): Array<DayData> {
  let array: Array<DayData> = [];
  let ten_one: DayData = {
    title: "Ten Days",
    data: [
      {
        id: "success",
        label: "success",
        value: rating.ten_days.success,
        color: "hsl(146, 55%, 54%)",
      },
      {
        id: "failure",
        label: "failure",
        value: rating.ten_days.failure,
        color: "hsl(0, 100%, 50%)",
      },
      {
        id: "internal_failure",
        label: "internal_failure",
        value: rating.ten_days.local_failure,
        color: "hsl(340, 70%, 50%)",
      },
    ],
  };
  let thirty_days: DayData = {
    title: "Thirty Days",
    data: [
      {
        id: "success",
        label: "success",
        value: rating.thirty_days.success,
        color: "hsl(146, 55%, 54%)",
      },
      {
        id: "failure",
        label: "failure",
        value: rating.thirty_days.failure,
        color: "hsl(0, 100%, 50%)",
      },
      {
        id: "internal_failure",
        label: "internal_failure",
        value: rating.thirty_days.local_failure,
        color: "hsl(340, 70%, 50%)",
      },
    ],
  };
  array.push(ten_one);
  array.push(thirty_days);
  console.log(`data to show ${JSON.stringify(array)}`);
  return array;
}

export default function ForwardRatingView({ forwards_rating }: ViewProps) {
  let data = preparePieChartData(forwards_rating);
  return (
    <Grid
      gridDefinition={data.map((_) => {
        return { colspan: 12 };
      })}
    >
      {data.map((value) => {
        return (
          <div className="chart-container-pie">
            <h4 className="pie-text">{value.title}</h4>
            <ResponsivePie
              colors={getColor}
              theme={{
                textColor: "#fff",
                labels: {
                  text: {
                    fill: "#fff",
                  },
                },
                tooltip: {
                  container: {
                    background: "#fff",
                    color: "#333",
                    fontSize: 10,
                  },
                },
              }}
              data={value.data}
              innerRadius={0.5}
              padAngle={2}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderWidth={1}
              margin={{ top: 20, right: 30, bottom: 30, left: 30 }}
              enableArcLinkLabels={false}
              arcLabelsTextColor="#000000"
              arcLabelsSkipAngle={10}
            />
          </div>
        );
      })}
    </Grid>
  );
}
