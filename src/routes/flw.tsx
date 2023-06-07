import { formatTime, translate } from "~/components/nineDaysForecast/utilities";
import language from "~/context/language";
import { weatherForecastFlw } from "./api";
import { createResource } from "solid-js";

export default function Flw() {
  const { lang, changeLan } = language;
  const [localForecasting] = createResource(lang, weatherForecastFlw);

  const flwTranslate = {
    topic: {
      en: "Bulletin updated at ",
      tc: "天氣稿更新於",
      sc: "天气稿更新于",
    },
    outlook: {
      en: "Outlook: ",
      tc: "展望 : ",
      sc: "展望 : ",
    },
  };
  return (
    <>
      <div class=" sm:px-[40px]  sm:max-w-[1280px] sm:w-[90%] w-[95%] mx-auto">
        <h1 class="self-center text-[#073e7f] text-3xl font-bold my-[25px]">
          {translate.bulletinTitle[`${lang()}`]}
        </h1>
        <div class="bg-white w-full p-[20px]  border-[1px] border-solid border-[#ccc]">
          <div class="border-t-[10px] border-[#0075AB] border-x-[1px] border-b-[1px] p-[8px]">
            <span>
              {flwTranslate.topic[`${lang()}`]}
              {
                formatTime(localForecasting()?.updateTime, lang)
                  .normalFormat
              }
              
            </span>
            <p><br /></p>
            <p class="mb-[1.4em]">{localForecasting()?.generalSituation}</p>
            <p  class="mb-[1.4em]">{localForecasting()?.tcInfo}</p>
            <p  class="mb-[1.4em]">{localForecasting()?.fireDangerWarning}</p>
            <p class="mb-[1.4em]">{localForecasting()?.forecastPeriod}</p>
            <p class="mb-[1.4em]">{localForecasting()?.forecastDesc}</p>
            <p class="mb-[1.4em]">
              {flwTranslate.outlook[`${lang()}`]}
              {localForecasting()?.outlook}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
