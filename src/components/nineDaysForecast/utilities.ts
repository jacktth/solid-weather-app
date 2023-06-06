import { Accessor, Resource } from "solid-js";
import { Language, FndResponse, TextProp } from "types/types";

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
    tc: "香港九天天氣預報",
    sc: "香港九天天气预报",
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
  bulletinTitle: {
    en: "Hong Kong Weather Forecast",
    tc: "本港地區天氣預報",
    sc: "本港地区天气预报",
  },
};

export const languageOption = {
  en: "ENG",
  tc: "繁",
  sc: "简",
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
          seaSoilFormat: `${year}年${month}月${day}日 ${amPmCn} ${formattedHoursCn}時`,
        };
    }
  } else {
    return {
      nineDaysForecastFormat: `N/A`,
      seaSoilFormat: `N/A`,
    };
  }
}

export function formatWeek(date: string, lang: Language) {
  switch (lang) {
    case "en":
      const week = date.slice(0, 3);

      return `(${week})`;

    default:
      return `(${date})`;
  }
}
export function formatDate(date: string, lang: Language) {
  switch (lang) {
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
export function getTempArray(props: GetArrayProps): GetArrayResult {
  const temp: { maxTemp: number[]; minTemp: number[] } = {
    maxTemp: [],
    minTemp: [],
  };

  const categories: string[][] = [];
  props.nineDaysForecasting.weatherForecast.map((info) => {
    temp.maxTemp.push(info.forecastMaxtemp.value);
    temp.minTemp.push(info.forecastMintemp.value);
    
    categories.push([
      formatDate(info.forecastDate, props.lang),
      formatWeek(info.week,props.lang),
    ]);
  });

  return {
    data: [
      {
        name: translate.text[`${props.lang}`].max,
        data: temp.maxTemp,
      },
      {
        name: translate.text[`${props.lang}`].min,
        data: temp.minTemp,
      },
    ],
    categories: categories,
    title: translate.text[`${props.lang}`].title,
  };
}

interface GetArrayProps {
  nineDaysForecasting: FndResponse;
  lang: Language;
}
export type GetArrayResult = {
  data: {
    name: string;
    data: number[];
  }[];
  categories: string[][];
  title: string;
};
export function getHumidityArray(props: GetArrayProps): GetArrayResult {
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
  
  props.nineDaysForecasting.weatherForecast.map((info) => {
    humidity.maxHumidity.push(info.forecastMaxrh.value);
    humidity.minHumidity.push(info.forecastMinrh.value);
    categories.push([
      formatDate(info.forecastDate, props.lang),
      formatWeek(info.week, props.lang),
    ]);
  });

  return {
    data: [
      {
        name: text[`${props.lang}`].max,
        data: humidity.maxHumidity,
      },
      {
        name: text[`${props.lang}`].min,
        data: humidity.minHumidity,
      },
    ],
    categories: categories,
    title: text[`${props.lang}`].title,
  };
}


export function translateText(text:TextProp){
  const texts = {
    高:"High",
    中高:"MediumHigh",
    中:"Medium",
    中低:"MediumLow",
    低:"Low",

  }
  return texts[text]
}