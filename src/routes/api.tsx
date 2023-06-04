import { createRouteData } from "solid-start/data/createRouteData";
import { FndResponse, Language, AreaWeatherData } from "../../types/types";
import { createServerData$ } from "solid-start/server/server";
import {
  GetArrayResult,
  getHumidityArray,
  getTempArray,
} from "~/components/nineDaysForecast/utilities";
import Chart from "~/components/nineDaysForecast/Chart";
import { JSX } from "solid-js";
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

export const HumidityDataForChartEn = async (): Promise<GetArrayResult> =>
  (
    await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en`
    )
  )
    .json()
    .then((nineDaysForecasting: FndResponse) => {
      const array = getHumidityArray({ nineDaysForecasting, lang: "en" });

      return new Promise((resolve, reject) => {
        if (!!array) {
          resolve(array);
        } else {
          reject("array is empty");
        }
      });
    });

export const HumidityDataForChartTc = async (): Promise<GetArrayResult> =>
  (
    await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc`
    )
  )
    .json()
    .then((nineDaysForecasting: FndResponse) => {
      const array = getHumidityArray({ nineDaysForecasting, lang: "tc" });

      return new Promise((resolve, reject) => {
        if (!!array) {
          resolve(array);
        } else {
          reject("array is empty");
        }
      });
    });

export const HumidityDataForChartSc = async (): Promise<GetArrayResult> =>
  (
    await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=sc`
    )
  )
    .json()
    .then((nineDaysForecasting: FndResponse) => {
      const array = getHumidityArray({ nineDaysForecasting, lang: "sc" });

      return new Promise((resolve, reject) => {
        if (!!array) {
          resolve(array);
        } else {
          reject("array is empty");
        }
      });
    });

export const TempDataForChartEn = async (): Promise<GetArrayResult> =>
  (
    await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en`
    )
  )
    .json()
    .then((nineDaysForecasting: FndResponse) => {
      const array = getTempArray({ nineDaysForecasting, lang: "en" });

      return new Promise((resolve, reject) => {
        if (!!array) {
          resolve(array);
        } else {
          reject("array is empty");
        }
      });
    });

export const TempDataForChartTc = async (): Promise<GetArrayResult> =>
  (
    await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=tc`
    )
  )
    .json()
    .then((nineDaysForecasting: FndResponse) => {
      const array = getTempArray({ nineDaysForecasting, lang: "tc" });

      return new Promise((resolve, reject) => {
        if (!!array) {
          resolve(array);
        } else {
          reject("array is empty");
        }
      });
    });

export const TempDataForChartSc = async (): Promise<GetArrayResult> =>
  (
    await fetch(
      `https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=sc`
    )
  )
    .json()
    .then((nineDaysForecasting: FndResponse) => {
      const array = getTempArray({ nineDaysForecasting, lang: "sc" });

      return new Promise((resolve, reject) => {
        if (!!array) {
          resolve(array);
        } else {
          reject("array is empty");
        }
      });
    });
