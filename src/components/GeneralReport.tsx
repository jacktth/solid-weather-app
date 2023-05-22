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

export default function GeneralReport() {
  const  { lang, changeLan } = language;

  const options = {
    en: "en",
    tc: "tc",
    sc: "sc",
  };
  const [nineDaysForecasting] = createResource(lang, NineDaysForecasting);


  return (
    <main class="text-center ">
      <select
        value={lang()}
        onInput={(e) => changeLan(e.currentTarget.value as Language)}
      >
        <For each={Object.keys(options)}>
          {(color) => <option value={color}>{color}</option>}
        </For>
      </select>
      <div>
      <h1 class=" text-4xl text-sky-700 font-thin uppercase">
      {nineDaysForecasting.loading && "Loading..."}
      <span>{nineDaysForecasting()?.generalSituation}</span>

      </h1>
       


      </div>
    </main>
  );
}
