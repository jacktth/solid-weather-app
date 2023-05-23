import { A, createRouteData, refetchRouteData } from "solid-start";
import {
  For,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { NineDaysForecasting } from "~/routes/api";
import { Language } from "~/routes/types";
import language from "~/context/language";

export default function NineDaysForecast() {
  const { lang, changeLan } = language;

  const title = {
    en: "General Situation:",
    tc: "天氣概況:",
    sc: "天气概况:",
  };
  const [nineDaysForecasting] = createResource(lang, NineDaysForecasting);

  return (
    <main class=" bg-white p-[20px] border-[1px] border-solid border-[#ccc]">
      <div>
        <p class="text-[#faa330] pb-[5px] mb-[12px] text-[1.4em]">{title[`${lang()}`]}</p>
        <span class="text-[120%]">{nineDaysForecasting()?.generalSituation}</span>
      </div>
      <div class="text-center flex gap-[2px] justify-center">
        <For each={nineDaysForecasting()?.weatherForecast}>
          {(info) => (
            <div class= "w-[130px]  h-auto  border-solid border-[2px] mx-[2px] mt-[10px] mb-[2px] pt-[5px]  border-[#1F97FF]">
              <div class="text-center">
                <p class="text-[20.8px]">{info.forecastDate}</p>
                <p class="text-[20.8px]">{"(" + info.week + ")"}</p>
                  <div class="bg-[#1d496e] flex justify-center ">
                    <img
                      class=""
                      src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${info.ForecastIcon}.png`}
                      width={50}
                      height={50}
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
    </main>
  );
}
