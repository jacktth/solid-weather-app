import { translate } from "~/components/nineDaysForecast/utilities";
import language from "~/context/language";
import { weatherForecastFlw } from "./api";
import { createResource } from "solid-js";

export default  function Flw() {
  const { lang, changeLan } = language;
  const [nineDaysForecasting] = createResource(lang, weatherForecastFlw);

  const flwTranslate = {
    topic:{
        en: "Bulletin" ,
        tc: "天氣稿",
        sc: "天气稿",
    },
    outlook:{
        en: "Outlook: " ,
        tc: "展望 : ",
        sc: "展望 : ",
    }
  }
    return (
        <div class="">
        <div class=" sm:px-[40px]  sm:max-w-[1280px] sm:w-[90%] w-[95%] mx-auto ">
        <h1 class="self-center text-[#073e7f] text-3xl font-bold">{translate.bulletinTitle[`${lang()}`]}</h1>
        <div class="bg-white w-full">
            <span>{flwTranslate.topic[`${lang()}`]} {nineDaysForecasting()?.updateTime}</span>
            <p>{nineDaysForecasting()?.generalSituation}</p>
            <p>{nineDaysForecasting()?.tcInfo}</p>
            <p>{nineDaysForecasting()?.forecastPeriod}</p>
            <p>{nineDaysForecasting()?.forecastDesc}</p>
            <p>{flwTranslate.outlook[`${lang()}`]}{nineDaysForecasting()?.outlook}</p>
        </div>
        </div>
        </div>
    )
}