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
        align: "center" as ApexTitleSubtitle['align']
      },
  });
  const [series] = createStore({
    list: data,
  });

  // options and series can be a store or signal

  return (
    <SolidApexCharts
      width="890"
      type={type}
      options={options}
      series={series.list}
    />
  );
};

export default Chart;
