// @refresh reload
import {  Suspense, createSignal } from "solid-js";
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
  const [dropDown, setDropDown] = createSignal(false);
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname
      ? "border-white"
      : "border-transparent hover:border-white";
  const dropping = (drop:boolean) =>
  drop ? "bg-blue-300 text-center text-lg" :"flex"
  function changeLanguage(str:Language){
    changeLan(str)
    setDropDown(false)
  }
  const rootTranslation = {
    flwTitle: {
      en: "Forecast Bulletin",
      tc: "天氣預報天氣稿",
      sc: "天气预报天气稿",
    },
    fndTitle: {
      en: "9-day Weather Forecast",
      tc: "香港九天天氣預報",
      sc: "香港九天天气预报",
    },
  }
  const eng = () => (
    <ul class={`cursor-pointer ${dropping(dropDown())}`}>
      <li
        class={`hover:border-white border-transparent border-b-2 sm:px-0 px-2`}
        onClick={() => changeLanguage("tc")}
      >
        繁
      </li>
      <li
        class={`hover:border-white border-transparent border-b-2 sm:px-0 px-2 ${dropDown() ?"":"ml-1"}`}
        onClick={() => changeLanguage("sc")}
      >
        简
      </li>
    </ul>
  );
  const tc = () => (
    <ul class={`cursor-pointer ${dropping(dropDown())}`}>
      <li
        class={`hover:border-white border-transparent border-b-2`}
        onClick={() => changeLanguage("en")}
      >
        ENG
      </li>
      <li
        class={`hover:border-white border-transparent border-b-2  ${dropDown() ?"":"ml-1"}`}
        onClick={() => changeLanguage("sc")}
      >
        简
      </li>
    </ul>
  );
  const sc = () => (
    <ul class={`cursor-pointer ${dropping(dropDown())}`}>
      <li
        class={`hover:border-white border-transparent border-b-2`}
        onClick={() => changeLanguage("en")}
      >
        ENG
      </li>
      <li
        class={`hover:border-white border-transparent border-b-2 ${dropDown() ?"":"ml-1"}`}
        onClick={() => changeLanguage("tc")}
      >
        繁
      </li>
    </ul>
  );
  const options = {
    en: eng,
    tc: tc,
    sc: sc,
  };
  return (
    <Html lang="en" >
      <Head>
        <Title>9-day Weather Forecast for Hong Kong｜Weather Forecast</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <nav class="bg-[#1A58AB] relative">
              <ul class=" flex items-center text-base sm:text-lg p-3 text-white justify-center">
                <div></div>
                <li class={`border-b-2 ${active("/")} mx-1.5 sm:mx-6`}>
                  <A  href="/"><div class="text-center">{rootTranslation.fndTitle[`${lang()}`]}</div></A>
                </li>
                <li class={`border-b-2 ${active("/about")} mx-1.5 sm:mx-6`}>
                  <A  href="/flw"><div class="text-center">{rootTranslation.flwTitle[`${lang()}`]}</div></A>
                </li>
                <li class={` mx-1.5 sm:mx-6  absolute right-0 sm:static mr-2 sm:mr-0 sm:block flex items-center`}>
                  <div
                    class="sm:hidden w-[24px] cursor-pointer relative"
                    onfocus={() => {
                      setDropDown(true);
                    }}
                    onFocusOut={() => {
                      setDropDown(false);
                    }}
                    tabindex="0"
                  >
                    <img src="world.svg" alt="" />
                    <div class={`${dropDown() ? "absolute left-1/2 translate-x-[-50%]  text-black " : "hidden"} `}>
                      <Dynamic component={options[lang()]} />
                    </div>
                  </div>
                  <div class="hidden sm:block">
                  <Dynamic component={options[lang()]} />

                  </div>
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
