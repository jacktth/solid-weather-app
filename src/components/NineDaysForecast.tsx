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

  const options = {
    en: "en",
    tc: "tc",
    sc: "sc",
  };
  const [nineDaysForecasting] = createResource(lang, NineDaysForecasting);

  return (
    <main class="text-center mx-auto text-gray-700 p-4 flex">
      <For each={nineDaysForecasting()?.weatherForecast}>
      {(info) => (
           <div class=""
         >
           <div class="h-full ">
            <div class="text-center">
            <img
            class="block w-auto"
               src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${info.ForecastIcon}.png`}
               width={70}
               height={70}
               alt="Picture of the author"
             />
            </div>
          
             <div>{info.week}</div>
             <div>{info.forecastDate}</div>
             <div>{info.forecastWind}</div>
             <div>{info.forecastWeather}</div>

             <div>
               {info.forecastMintemp.value +
                 "℃ | " +
                 info.forecastMaxtemp.value +
                 "℃"}
             </div>
             <div>
               {info.forecastMinrh.value +
                 "-" +
                 info.forecastMaxrh.value +
                 "%"}
             </div>
           </div>
         </div>
        )}
       
      </For>
    </main>
  );
}
