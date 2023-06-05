const { writeFile } = require('fs');
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
function formatDate(date, lang) {
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

function formatWeek(date, lang) {
  switch (lang) {
    case "en":
      const week = date.slice(0, 3);

      return `(${week})`;

    default:
      return `(${date})`;
  }
}
function getHumidityArray(props) {
  const text = {
    en: {
      max: "maximum relative humidity",
      min: "minimum relative humidity ",
      title: "Humidity (%)",
    },
    tc: { max: "最高相對濕度", min: "最低相對濕度 ", title: "相對濕度 (%)" },
    sc: { max: "最高相对湿度", min: "最低相对湿度", title: "相对湿度 (%)" },
  };

  const humidity = {
    maxHumidity: [],
    minHumidity: [],
  };

  const categories = [];
  
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

function getTempArray(props ) {
  const temp = {
    maxTemp: [],
    minTemp: [],
  };

  const categories = [];
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
async function getAllTempArray() {
  const tempResponseEn = await fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en"
  );
  const tempResEn = await tempResponseEn.json();
  const tempArrayEn = getTempArray({
    nineDaysForecasting: tempResEn,
    lang: "en",
  });

  const tempResponseTc = await fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc"
  );
  const tempResTc = await tempResponseTc.json();
  const tempArrayTc = getTempArray({
    nineDaysForecasting: tempResTc,
    lang: "tc",
  });

  const tempResponseSc = await fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=sc"
  );
  const tempResSc = await tempResponseSc.json();
  const TempArraySc = getTempArray({
    nineDaysForecasting: tempResSc,
    lang: "sc",
  });

  const humResponseEn = await fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=sc"
  );
  const humResEn = await humResponseEn.json();
  const humArrayEn = getHumidityArray({
    nineDaysForecasting: humResEn,
    lang: "sc",
  });

  const humResponseTc = await fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=sc"
  );
  const humResTc = await humResponseTc.json();
  const humArrayTc = getHumidityArray({
    nineDaysForecasting: humResTc,
    lang: "sc",
  });

  const humResponseSc = await fetch(
    "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=sc"
  );
  const humResSc = await humResponseSc.json();
  const humArraySc = getHumidityArray({
    nineDaysForecasting: humResSc,
    lang: "sc",
  });

  const object = {
    temp: { en: tempArrayEn, tc: tempArrayTc, sc: TempArraySc },
    hum: {
      en: humArrayEn,
      tc: humArrayTc,
      sc: humArraySc,
    },
  };
  const dataPromise = Promise.resolve(object);
  dataPromise.then(function (data) {
    writeFile("data.json", JSON.stringify(data), (err) => {
      console.error("err", err);
    });
  });
}

getAllTempArray()