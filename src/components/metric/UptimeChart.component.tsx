/**
 * Uptime component chart
 */
import { ResponsiveLine, Serie } from "@nivo/line";
import { Uptime } from "@/model/localReputationMetric";

type ViewProps = {
  up_time: Uptime;
};

function prepareDataChart(up_time: Uptime): Array<Serie> {
  let lineChartData: Array<Serie> = [];

  lineChartData.push({
    id: "uptime_node",
    color: "hsl(174.4, 100%, 29.41%)",
    data: [
      {
        x: "Today",
        y: up_time.one_day,
      },
      {
        x: "Ten days",
        y: up_time.ten_days,
      },
      {
        x: "Thirty days",
        y: up_time.thirty_days,
      },
      {
        x: "Six months",
        y: up_time.six_months,
      },
    ],
  });
  return lineChartData;
}

export default function Uptime({ up_time }: ViewProps) {
  return (
    <div className="chart-container">
      <ResponsiveLine
        theme={{
          textColor: "#fff",
          axis: {
            domain: {
              line: {
                stroke: "#fff",
                strokeWidth: 1.5,
              },
            },
            ticks: {
              line: {
                stroke: "#fff",
                strokeWidth: 2,
              },
              text: {
                fontSize: 12,
                fill: "#fff",
              },
            },
            legend: {
              text: {
                fontSize: 12,
                fill: "#fff",
              },
            },
          },
          grid: {
            line: {
              stroke: "transparent",
            },
          },
          tooltip: {
            container: {
              background: "#fff",
              color: "#333",
              fontSize: 10,
            },
          },
          crosshair: {
            line: {
              stroke: "#fff",
            },
          },
        }}
        data={prepareDataChart(up_time)}
        margin={{ top: 10, right: 120, bottom: 70, left: 120 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Number of Days",
          legendOffset: 45,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "up_time",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        colors={{ scheme: "nivo" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
}
