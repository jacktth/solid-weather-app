// @refresh reload
import { Suspense } from "solid-js";
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  Link,
} from "solid-start";
import "./root.css";
import language from "./context/language";
import { translate } from "./components/nineDaysForecast/utilities";
import { Dynamic } from "solid-js/web";
import { Language } from "types/types";

export default function Root() {
  const { lang, changeLan } = language;
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-white"
      : "border-transparent hover:border-white";
      const langActive = (langSelect: Language) =>
      langSelect == lang()
      ? "border-white"
      : "border-transparent hover:border-white";
  const eng = () => (
    <div class="cursor-pointer">
      <span class={`hover:border-white border-transparent border-b-2`} onClick={() => changeLan("tc")}>繁</span>
      <span class={`hover:border-white border-transparent border-b-2`} onClick={() => changeLan("sc")}>简</span>
    </div>
  );
  const tc = () => (
    <div class="cursor-pointer">
      <span class={`hover:border-white border-transparent border-b-2`} onClick={() => changeLan("en")}>ENG</span>
      <span class={`hover:border-white border-transparent border-b-2`} onClick={() => changeLan("sc")}>简</span>
    </div>
  );
  const sc = () => (
    <div class="cursor-pointer">
      <span class={`hover:border-white border-transparent border-b-2`} onClick={() => changeLan("en")}>ENG</span>
      <span class={`hover:border-white border-transparent border-b-2`} onClick={() => changeLan("tc")}>繁</span>
    </div>
  );
  const options = {
    en: eng,
    tc: tc,
    sc: sc,
  };
  return (
    <Html lang="en">
      <Head>
        <Title>9-day Weather Forecast for Hong Kong｜Weather Forecast</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <nav class="bg-[#1A58AB]">
              <ul class="container flex items-center text-lg p-3 text-white justify-center">
                <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                  <A href="/">{translate.title[`${lang()}`]}</A>
                </li>
                <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                  <A href="/flw">{translate.bulletinTitle[`${lang()}`]}</A>
                </li>
                <li class={` mx-1.5 sm:mx-6`}>
                  <Dynamic component={options[lang()]} />
                </li>
              </ul>
            </nav>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
