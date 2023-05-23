import { A, createRouteData, refetchRouteData } from "solid-start";
import {
  For,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { CurrentWeatherReport, NineDaysForecasting } from "~/routes/api";
import { Language } from "~/routes/types";
import language from "~/context/language";

export default function NineDaysForecast() {
  const { lang, changeLan } = language;

  const options = {
    en: "en",
    tc: "tc",
    sc: "sc",
  };
  const [nineDaysForecasting] = createResource(lang, NineDaysForecasting);
  const [currentWeatherReport] = createResource(lang, CurrentWeatherReport);

  return (
    <main class="text-white font-inter drop-shadow-2xl ">
      <img src="test.svg" alt="" class="h-20" />

      <span class="text-[164px] leading-[120%] text-shadow">
        {nineDaysForecasting()?.weatherForecast[0].forecastMaxtemp.value}
      </span>
      <p>{nineDaysForecasting()?.weatherForecast[0].forecastMintemp.value}</p>
      <div>
        <p>{nineDaysForecasting()?.weatherForecast[0].forecastDate}</p>
        <p>{nineDaysForecasting()?.weatherForecast[0].week}</p>
      </div>

      <p class="my-10">
        {nineDaysForecasting()?.weatherForecast[0].forecastWind}
      </p>
      <div class="flex">
        <For
          each={nineDaysForecasting()?.weatherForecast}
          fallback={<div>Loading...</div>}
        >
          {(info, index) => (
            <div class="border-[0.5px]  bg-white bg-opacity-20 backdrop-blur-[0.569258px] rounded-[11.3852px]">
              <p>
                {info.forecastMaxtemp.value +
                  "°" +
                  info.forecastMaxtemp.unit +
                  " | " +
                  info.forecastMintemp.value +
                  "°" +
                  info.forecastMintemp.unit}
              </p>
              <div class="my-10">
                <img src="test.svg" alt="" class="h-20" />
              </div>

              <p>{info.week}</p>
            </div>
          )}
        </For>
      </div>
    </main>
  );
}
