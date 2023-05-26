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
          <NineDaysForecast/>
   

  );
}
