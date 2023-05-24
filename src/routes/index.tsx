import { A, createRouteData, refetchRouteData } from "solid-start";
import { FndResponse, Language } from "./types";
import { NineDaysForecasting } from "./api";
import {
  For,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import GeneralReport from "~/components/GeneralReport";
import NineDaysForecast from "~/components/NineDaysForecast";
import TodayWeather from "~/components/TodayWeather";
export default function Home() {
  return (
    <main class=" ">
      <div class="flex">
        <div class="">
          <NineDaysForecast/>
        </div>
   
      </div>
      {/* <GeneralReport />
      <p class="mt-8">
        Visit{" "}
        <a
          href="https://solidjs.com"
          target="_blank"
          class="text-sky-600 hover:underline"
        >
          solidjs.com
        </a>{" "}
        to learn how to build Solid apps.
      </p>
      <p class="my-4">
        <span>Home</span>
        {" - "}
        <A href="/about" class="text-sky-600 hover:underline">
          About Page
        </A>{" "}
      </p> */}
    </main>
  );
}
