import { createStore } from "solid-js/store";

import { SolidApexCharts } from "solid-apexcharts";

type ChartType =
  | "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "candlestick"
  | "boxPlot"
  | "radar"
  | "polarArea"
  | "rangeBar"
  | "rangeArea"
  | "treemap";

type ChartProps = {
  data: ChartData;
  categories: string[][];
  type: ChartType;
  title: string;
};

type ChartData = {
  name: string;
  data: number[];
}[];

const Chart = ({ data, categories, type, title }: ChartProps) => {
  const [options] = createStore({
    chart: {
      id: "solidchart-example",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: categories,
    },
    title: {
      text: title,
      align: "center" as ApexTitleSubtitle["align"],
    },
    dataLabels: {
      enabled: true,
      offsetY: -10,
      background: {
        enabled: true,
        foreColor: "#fff",
        padding: 4,
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "#fff",
      },
    },
    colors: ["#BE4B48", "#4A7EBB"],
    markers: {
      size: [7, 7],
      colors: undefined,
      strokeColors: '#fff',
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      shape: "circle",
      radius: 2,
      offsetX: 0,
      offsetY: 0,

      showNullDataPoints: true,
      hover: {
        size: undefined,
        sizeOffset: 3
      }
    } as ApexMarkers,
  });
  const [series] = createStore({
    list: data,
  });

  // options and series can be a store or signal

  return (
    <SolidApexCharts
      width="100%"
      height="100%"
      type={type}
      options={options}
      series={series.list}
    />

  );
};

export default Chart;
