import { Accessor, Resource } from "solid-js";
import { Language, FndResponse } from "types/types";

export const translate = {
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

export function formatTime(time: string | undefined, lang: Accessor<Language>) {
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

export function formatWeek(date: string, lang: Accessor<Language>) {
  switch (lang()) {
    case "en":
      const week = date.slice(0, 3);

      return `(${week})`;

    default:
      return `(${date})`;
  }
}
export function formatDate(date: string, lang: Accessor<Language>) {
  switch (lang()) {
    case "en":
      const monthEn = date.slice(4, 6);
      const dayEn = date.slice(6, 8);
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
      const monthTc = parseInt(date.slice(4, 6), 10);
      const dayTc = parseInt(date.slice(6, 8), 10);
      return `${monthTc}月${dayTc}日`;

    default:
      return date;
  }
}
export function getTempArray(
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
