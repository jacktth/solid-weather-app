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
import "./index.css";
import TodayWeather from "~/components/TodayWeather";
export default function Home() {
  return (
    <main class=" bg-gradient-to-tr from-[#F0B5CE] to-[#8C6BAE] ">
      <div class="flex">
        <div class="w-[60%] h-[100vh] ">
          <TodayWeather />
        </div>
        <div class="test  w-[40%] h-[100vh]">
          <div class=" ">ds</div>
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
