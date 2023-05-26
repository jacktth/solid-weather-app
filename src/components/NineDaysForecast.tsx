import { A, createRouteData, refetchRouteData } from "solid-start";
import {
  Accessor,
  For,
  Resource,
  Show,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { NineDaysForecasting } from "~/routes/api";
import { FndResponse, Language } from "~/routes/types";
import language from "~/context/language";
import Chart from "./Chart";
interface SeaSoliTempProps {
  lang: Accessor<Language>;
  nineDaysForecasting: Resource<FndResponse>;
}

const translate = {
  updateTime: {
    en: "Updated at： ",
    tc: "更新時間： ",
    sc: "更新时间： ",
  },
  subTitle: {
    en: "General Situation:",
    tc: "天氣概況:",
    sc: "天气概况:",
  },
  title: {
    en: "9-day Weather Forecast for Hong Kong",
    tc: "香港九天天氣預報:",
    sc: "香港九天天气预报:",
  },
  text: {
    en: {
      max: "maximum temperature",
      min: "minimum temperature",
      title: "Temperature (°C)",
    },
    tc: { max: "最高温度", min: "最低温度", title: "溫度 (°C)" },
    sc: { max: "最高溫度", min: " 最低溫度", title: "温度 (°C)" },
  },
};

export default function NineDaysForecast() {
  const { lang, changeLan } = language;
  const [nineDaysForecasting] = createResource(lang, NineDaysForecasting);
  const [showList, setShowList] = createSignal(false);

  const SeaTempComponent = ({
    lang,
    nineDaysForecasting,
  }: SeaSoliTempProps) => {
    switch (lang()) {
      case "en":
        return (
          <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
            <p>Sea surface temperature</p>
            <p>
              {
                formatTime(nineDaysForecasting()?.seaTemp.recordTime, lang)
                  .seaSoilFormat
              }
              {" at " + `${nineDaysForecasting()?.seaTemp.place} :`}
            </p>
            <p class="text-[#0000ff] font-bold">{`${
              nineDaysForecasting()?.seaTemp.value
            } °C`}</p>
          </div>
        );
      case "tc":
        return (
          <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
            <p>
              {
                formatTime(nineDaysForecasting()?.seaTemp.recordTime, lang)
                  .seaSoilFormat
              }
              {`${
                nineDaysForecasting()?.seaTemp.place
              } 錄 得 之 海 水 溫 度 為 :`}
            </p>
            <p class="text-[#0000ff] font-bold">{`${
              nineDaysForecasting()?.seaTemp.value
            } °C`}</p>
          </div>
        );
      case "sc":
        return (
          <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
            <p>
              {
                formatTime(nineDaysForecasting()?.seaTemp.recordTime, lang)
                  .seaSoilFormat
              }
              {`${
                nineDaysForecasting()?.seaTemp.place
              } 录 得 之 海 水 温 度 为 :`}
            </p>
            <p class="text-[#0000ff] font-bold">{`${
              nineDaysForecasting()?.seaTemp.value
            } °C`}</p>
          </div>
        );

      default:
        break;
    }
  };
  const SoilTempComponent = ({
    lang,
    nineDaysForecasting,
  }: SeaSoliTempProps) => {
    const soilUpper = nineDaysForecasting()?.soilTemp[0];
    const soilLower = nineDaysForecasting()?.soilTemp[1];
    if (soilUpper && soilLower) {
      switch (lang()) {
        case "en":
          return (
            <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
              <p>Soil temperatures</p>
              <p>
                {formatTime(soilUpper.recordTime, lang).seaSoilFormat}
                {" at " + `${soilUpper.place} :`}
              </p>
              <p class="text-[#bc8d79] font-bold">{`${soilUpper.depth.value}m depth:${soilUpper.value}°C`}</p>
              <p class="text-[#bc8d79] font-bold">{`${soilLower.depth.value.toFixed(
                1
              )}m depth:${soilLower.value}°C`}</p>
            </div>
          );
        case "tc":
          return (
            <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
              <p>
                {formatTime(soilLower.recordTime, lang).seaSoilFormat}
                {`${soilLower.place}  錄 得 之 土 壤 溫 度 為 :`}
              </p>
              <p class="text-[#bc8d79] font-bold">{`${soilUpper.depth.value} 米 ${soilUpper.unit}:${soilUpper.value} 度`}</p>
              <p class="text-[#bc8d79] font-bold">{`${soilLower.depth.value.toFixed(
                1
              )} 米 ${soilLower.unit}:${soilLower.value}.0 度`}</p>
            </div>
          );
        case "sc":
          return (
            <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
              <p>
                {formatTime(soilLower.recordTime, lang).seaSoilFormat}
                {`${soilLower.place}  录 得 之 土 壤 温 度 为 :`}
              </p>
              <p class="text-[#bc8d79] font-bold">{`${soilUpper.depth.value} 米 ${soilUpper.unit}:${soilUpper.value} 度`}</p>
              <p class="text-[#bc8d79] font-bold">{`${soilLower.depth.value.toFixed(
                1
              )} 米 ${soilLower.unit}:${soilLower.value} 度`}</p>
            </div>
          );

        default:
          break;
      }
    } else {
      return "";
    }
  };
  const ColumnNineDaysForecasting = () => {
    return (
      <div class="text-center flex gap-[2px] justify-center overflow-auto">
        <For each={nineDaysForecasting()?.weatherForecast}>
          {(info) => (
            <div class="sm:w-[130px]  h-auto  border-solid border-[2px] mx-[2px] mt-[10px] mb-[2px] pt-[5px]  border-[#1F97FF]">
              <div class="text-center">
                <p class="text-[20.8px]">
                  {formatDate(info.forecastDate, lang)}
                </p>
                <p class="text-[20.8px]">{formatWeek(info.week, lang)}</p>
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
                <div class="sm:w-[40px]">
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
    );
  };
  const ListNineDaysForecasting = () => {
    return (
      <div class="text-center flex flex-col gap-[2px] justify-center">
        <For each={nineDaysForecasting()?.weatherForecast}>
          {(info) => (
            <div class="w-auto  h-auto flex  border-solid border-[2px] mx-[2px] mt-[10px] mb-[2px]  border-[#1F97FF]">
              <div class="flex items-center text-start sm:w-[15%] p-[5px]">
                <span class="text-[20.8px]">
                  {formatDate(info.forecastDate, lang)}
                  <br />
                  {formatWeek(info.week, lang)}
                </span>
              </div>

              <div class="bg-[#1d496e] sm:w-[10%] flex items-center justify-center px-[10px] py-[35px] ">
                <img
                  class="m-[6px]"
                  src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${info.ForecastIcon}.png`}
                  width={"50px"}
                  height={"50px"}
                  alt="Picture of the author"
                />
              </div>
              <div class="w-full text-start p-[8px]">
                <div class="flex p-[5px]">
                  <p class="text-[20.8px] mr-6">
                    {info.forecastMintemp.value +
                      " | " +
                      info.forecastMaxtemp.value +
                      "℃"}
                  </p>

                  <p class="text-[20.8px] w-min-[100px]  mr-8">
                    {info.forecastMinrh.value +
                      "-" +
                      info.forecastMaxrh.value +
                      "%"}
                  </p>
                  <div class="sm:w-[40px] p-[5px] ">
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
                <div class="p-[5px] text-[20.8px]">{info.forecastWind}</div>
                <div class="p-[5px] text-[20.8px]">{info.forecastWeather}</div>
              </div>
            </div>
          )}
        </For>
      </div>
    );
  };

  function formatTime(time: string | undefined, lang: Accessor<Language>) {
    if (time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");
      switch (lang()) {
        case "en":
          const enMonth = date.toLocaleString("en-US", { month: "short" });
          const amPm = +hour >= 12 ? "PM" : "AM";
          const formattedHours =
            +hour % 12 === 0 ? "12" : "0" + String(+hour % 12);
          return {
            nineDaysForecastFormat: `${hour}:${minute} HKT ${day}/${enMonth}/${year}`,
            seaSoilFormat: `${
              formattedHours + " " + amPm
            } on ${day}/${enMonth}/${year}`,
          };

        default:
          const amPmCn = +hour >= 12 ? "下午" : "上午";
          const formattedHoursCn = +hour % 12 === 0 ? "12" : String(+hour % 12);
          return {
            nineDaysForecastFormat: `${year}年${month}月${day}日${hour}時${minute}分`,
            seaSoilFormat: `${year}年${month}月${day}日 ${amPmCn} ${formattedHoursCn}時$`,
          };
      }
    } else {
      return {
        nineDaysForecastFormat: `N/A`,
        seaSoilFormat: `N/A`,
      };
    }
  }
  function formatWeek(weekString: string, lang: Accessor<Language>) {
    switch (lang()) {
      case "en":
        const week = weekString.slice(0, 3);

        return `(${week})`;

      default:
        return `(${weekString})`;
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
          name: translate.text[`${lang()}`].max,
          data: temp.maxTemp,
        },
        {
          name: translate.text[`${lang()}`].min,
          data: temp.minTemp,
        },
      ],
      categories: categories,
      title: translate.text[`${lang()}`].title,
    };
  }

  function getHumidityArray(
    nineDaysForecasting: Resource<FndResponse>,
    lang: Accessor<Language>
  ) {
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
    <div class="bg-[#ebf3f6]  ">
      <div class=" px-[40px] sm:max-w-[1280px] w-[90%] mx-auto ">
        <div class="flex justify-between content-center text-[1.8em] font-700">
          <h1 class="mb-[25px] text-[#073e7f] ">
            {translate.title[`${lang()}`]}
          </h1>
          <Show
            when={showList()}
            fallback={
              <div
                class="flex items-center cursor-pointer"
                onclick={() =>
                  showList() ? setShowList(false) : setShowList(true)
                }
              >
                <img src="mode_off.png" />
              </div>
            }
          >
            <div
              class="flex items-center  cursor-pointer"
              onclick={() =>
                showList() ? setShowList(false) : setShowList(true)
              }
            >
              <img src="mode_on.png" />
            </div>
          </Show>
        </div>
        <main class=" bg-white p-[20px] border-[1px] border-solid border-[#ccc] font-400">
          <div>
            <p class="text-[#faa330] pb-[5px] mb-[12px]  font-700 text-[1.4em]">
              {translate.subTitle[`${lang()}`]}
            </p>
            <span class="text-[120%]">
              {nineDaysForecasting()?.generalSituation}
            </span>
          </div>
          <Show
            when={showList() === true}
            fallback={<ColumnNineDaysForecasting />}
          >
            <ListNineDaysForecasting />
          </Show>
          <div class="h-[400px]">
            <Chart
              data={getHumidityArray(nineDaysForecasting, lang).data}
              categories={
                getHumidityArray(nineDaysForecasting, lang).categories
              }
              type="line"
              title={getHumidityArray(nineDaysForecasting, lang).title}
            />
          </div>
          <div class="h-[400px]">
            <Chart
              data={getTempArray(nineDaysForecasting, lang).data}
              categories={getTempArray(nineDaysForecasting, lang).categories}
              type="line"
              title={getTempArray(nineDaysForecasting, lang).title}
            />
          </div>

          <div class="flex justify-end">
            <p>
              {translate.updateTime[`${lang()}`]}
              {
                formatTime(nineDaysForecasting()?.updateTime, lang)
                  .nineDaysForecastFormat
              }
            </p>
          </div>
          <div class="flex">
            <SeaTempComponent
              lang={lang}
              nineDaysForecasting={nineDaysForecasting}
            />
            <SoilTempComponent
              lang={lang}
              nineDaysForecasting={nineDaysForecasting}
            />
          </div>
          <div></div>
        </main>
      </div>
    </div>
  );
}
