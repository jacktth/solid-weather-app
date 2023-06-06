import { createRouteData } from "solid-start/data/createRouteData";
import { FndResponse, Language, AreaWeatherData, WeatherForcastFlw } from "../../types/types";
import { createServerData$ } from "solid-start/server/server";
import {
  GetArrayResult,
  getHumidityArray,
  getTempArray,
} from "~/components/nineDaysForecast/utilities";
import Chart from "~/components/nineDaysForecast/Chart";
import { JSX, createResource } from "solid-js";
import { SolidApexCharts } from "solid-apexcharts";

export const NineDaysForecasting = async (
  lang: Language
): Promise<FndResponse> =>
  (
    await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=${lang}`
    )
  ).json();

export const CurrentWeatherReport = async (
  lang: Language
): Promise<AreaWeatherData> =>
  (
    await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=${lang}`
    )
  ).json();



  export const weatherForecastFlw = async (
    lang: Language
  ): Promise<WeatherForcastFlw> =>
    (
      await fetch(
        `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=${lang}`
      )
    ).json();