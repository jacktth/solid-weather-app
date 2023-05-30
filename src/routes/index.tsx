import { A, createRouteData, refetchRouteData } from "solid-start";
import { FndResponse, Language } from "../../types/types";
import { NineDaysForecasting } from "./api";
import {
  For,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import NineDaysForecast from "~/components/NineDaysForecast";
export default function Home() {
  return (
          <NineDaysForecast/>
   

  );
}
