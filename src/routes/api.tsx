import { createRouteData } from "solid-start/data/createRouteData";
import { FndResponse, Language, AreaWeatherData } from "../../types/types";
import { createServerData$ } from "solid-start/server/server";

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