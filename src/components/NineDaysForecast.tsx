import { A, createRouteData, refetchRouteData } from "solid-start";
import {
  Accessor,
  For,
  Resource,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { NineDaysForecasting } from "~/routes/api";
import { FndResponse, Language } from "~/routes/types";
import language from "~/context/language";
import Chart from "./Chart";

export default function NineDaysForecast() {
  const { lang, changeLan } = language;
  const subTitle = {
    en: "General Situation:",
    tc: "天氣概況:",
    sc: "天气概况:",
  };
  const title = {
    en: "9-day Weather Forecast for Hong Kong",
    tc: "香港九天天氣預報:",
    sc: "香港九天天气预报:",
  };
  const [nineDaysForecasting] = createResource(lang, NineDaysForecasting);
  function formatWeek(weekString: string, lang: Accessor<Language>) {
    switch (lang()) {
      case "en":
        const week = weekString.slice(0, 3);

        return week;

      default:
        return weekString;
    }
  }
  function formatDate(dateString: string, lang: Accessor<Language>) {
    switch (lang()) {
      case "en":
        const monthEn = dateString.slice(4, 6);
        const dayEn = dateString.slice(6, 8);
        const monthNames = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const monthIndex = parseInt(monthEn, 10) - 1;
        const monthName = monthNames[monthIndex];
        return `${dayEn} ${monthName}`;
      case "tc" || "sc":
        const monthTc = parseInt(dateString.slice(4, 6), 10);
        const dayTc = parseInt(dateString.slice(6, 8), 10);
        return `${monthTc}月${dayTc}日`;

      default:
        return dateString;
    }
  }
  function getTempArray(
    nineDaysForecasting: Resource<FndResponse>,
    lang: Accessor<Language>
  ) {
    const text = {
      en: {
        max: "maximum temperature",
        min: "minimum temperature",
        title: "Temperature (°C)",
      },
      tc: { max: "最高温度", min: "最低温度", title: "溫度 (°C)" },
      sc: { max: "最高溫度", min: " 最低溫度", title: "温度 (°C)" },
    };
    const temp: { maxTemp: number[]; minTemp: number[] } = {
      maxTemp: [],
      minTemp: [],
    };

    const categories: string[][] = [];
    nineDaysForecasting()?.weatherForecast.map((info) => {
      temp.maxTemp.push(info.forecastMaxtemp.value);
      temp.minTemp.push(info.forecastMintemp.value);
      categories.push([
        formatDate(info.forecastDate, lang),
        formatWeek(info.week, lang),
      ]);
    });

    return {
      data: [
        {
          name: text[`${lang()}`].max,
          data: temp.maxTemp,
        },
        {
          name: text[`${lang()}`].min,
          data: temp.minTemp,
        },
      ],
      categories: categories,
      title: text[`${lang()}`].title,
    };
  }

  function getHumidityArray(nineDaysForecasting: Resource<FndResponse>) {
    const text = {
      en: {
        max: "maximum relative humidity",
        min: "minimum relative humidity ",
        title: "Humidity (%)",
      },
      tc: { max: "最高相對濕度", min: "最低相對濕度 ", title: "相對濕度 (%)" },
      sc: { max: "最高相对湿度", min: "最低相对湿度", title: "相对湿度 (%)" },
    };
    const humidity: { maxHumidity: number[]; minHumidity: number[] } = {
      maxHumidity: [],
      minHumidity: [],
    };
    const categories: string[][] = [];

    nineDaysForecasting()?.weatherForecast.map((info) => {
      humidity.maxHumidity.push(info.forecastMaxrh.value);
      humidity.minHumidity.push(info.forecastMinrh.value);
      categories.push([
        formatDate(info.forecastDate, lang),
        formatWeek(info.week, lang),
      ]);
    });

    return {
      data: [
        {
          name: text[`${lang()}`].max,
          data: humidity.maxHumidity,
        },
        {
          name: text[`${lang()}`].min,
          data: humidity.minHumidity,
        },
      ],
      categories: categories,
      title: text[`${lang()}`].title,
    };
  }
  return (
    <div class="bg-[#ebf3f6] px-[40px] ">
      <h1 class="mb-[25px] text-[28.8px]">{title[`${lang()}`]}</h1>
      <main class=" bg-white p-[20px] border-[1px] border-solid border-[#ccc]">
        <div>
          <p class="text-[#faa330] pb-[5px] mb-[12px] text-[1.4em]">
            {subTitle[`${lang()}`]}
          </p>
          <span class="text-[120%]">
            {nineDaysForecasting()?.generalSituation}
          </span>
        </div>
        <div class="text-center flex gap-[2px] justify-center">
          <For each={nineDaysForecasting()?.weatherForecast}>
            {(info) => (
              <div class="w-[130px]  h-auto  border-solid border-[2px] mx-[2px] mt-[10px] mb-[2px] pt-[5px]  border-[#1F97FF]">
                <div class="text-center">
                  <p class="text-[20.8px]">
                    {formatDate(info.forecastDate, lang)}
                  </p>
                  <p class="text-[20.8px]">
                    {"(" + formatWeek(info.week, lang) + ")"}
                  </p>
                  <div class="bg-[#1d496e] flex justify-center ">
                    <img
                      class="m-[6px]"
                      src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${info.ForecastIcon}.png`}
                      width={"50px"}
                      height={"50px"}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
                <p class="text-[20.8px]">
                  {info.forecastMintemp.value +
                    " | " +
                    info.forecastMaxtemp.value +
                    "℃"}
                </p>
                <p class="text-[20.8px]">
                  {info.forecastMinrh.value +
                    "-" +
                    info.forecastMaxrh.value +
                    "%"}
                </p>
                <div class="flex py-[15px] justify-center">
                  <div class="w-[40px]">
                    <img
                      class=""
                      src={`https://www.hko.gov.hk/common/images/PSR${info.PSR.replace(
                        " ",
                        ""
                      )}_50_light.png`}
                      alt=""
                    />
                  </div>

                  <span class="pl-[3px]  my-auto text-[16px]">{info.PSR}</span>
                </div>
                <div class="p-[6px] min-h-[155px]">{info.forecastWind}</div>
                <div class="pl-[6px] pr-[5px]">{info.forecastWeather}</div>
              </div>
            )}
          </For>
        </div>
        <Chart
          data={getHumidityArray(nineDaysForecasting).data}
          categories={getHumidityArray(nineDaysForecasting).categories}
          type="line"
          title={getHumidityArray(nineDaysForecasting).title}
        />
      </main>
    </div>
  );
}
