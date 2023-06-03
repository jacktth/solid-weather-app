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
  titleColor:string;
};

type ChartData = {
  name: string;
  data: number[];
}[];

const Chart = ( props: ChartProps) => {
  const [options] = createStore({
    chart: {
      id: "chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: props.categories,
      labels:{
        style:{
          colors:"#666666",
          fontSize: '16px',
          fontFamily:'Lucida Grande, Lucida Sans Unicode, Arial, Helvetica, sans-serif',
        }
      }
    } as ApexXAxis,
    title: {
      text: props.title,
      align: "center" as ApexTitleSubtitle["align"],
      style:{
        fontWeight:  700,
        fontSize:"16px",
        color:props.titleColor
      }
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
      strokeColors: "#fff",
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
        sizeOffset: 3,
      },
    } as ApexMarkers,
    tooltip: {
      enabled: true,
      // it is to show noting tooltip on the chart
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        return "";
      },
    } as ApexTooltip,
   
   
  });
  const [series] = createStore({
    list: props.data,
  });

  // options and series can be a store or signal

  return (
    <SolidApexCharts
      width="100%"
      height="100%"
      type={props.type}
      options={options}
      series={series.list}
    />
  );
};

export default Chart;
