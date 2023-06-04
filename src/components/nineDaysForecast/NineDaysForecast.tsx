import {
  Accessor,
  For,
  Match,
  Show,
  Suspense,
  Switch,
  createEffect,
  createMemo,
  createResource,
  createSignal,
} from "solid-js";
import {
  HumidityDataForChartEn,
  HumidityDataForChartSc,
  HumidityDataForChartTc,
  NineDaysForecasting,
  TempDataForChartEn,
  TempDataForChartSc,
  TempDataForChartTc,
} from "~/routes/api";
import { FndResponse, Language, SeaSoliTempProps, TextProp } from "types/types";
import language from "~/context/language";
import Chart from "./Chart";
import {
  formatTime,
  formatDate,
  formatWeek,
  getTempArray,
  translate,
  languageOption,
  getHumidityArray,
  GetArrayResult,
  translateText,
} from "~/components/nineDaysForecast/utilities";
import { Dynamic } from "solid-js/web";

export default function NineDaysForecast() {
  const { lang, changeLan } = language;
  const [nineDaysForecasting] = createResource(lang, NineDaysForecasting);

  const [showList, setShowList] = createSignal(false);

  const SeaTempBlock = ({ lang, nineDaysForecasting }: SeaSoliTempProps) => {
    return (
      <Switch fallback={<p></p>}>
        <Match when={lang() === "en"}>
          <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
            <p>Sea surface temperature</p>
            <p>
              {
                formatTime(nineDaysForecasting()?.seaTemp.recordTime, lang)
                  .seaSoilFormat
              }
              {" at " + `${nineDaysForecasting()?.seaTemp.place} :`}
            </p>
            <p class="text-[#0000ff] font-bold">{`${
              nineDaysForecasting()?.seaTemp.value
            } °C`}</p>
          </div>
        </Match>
        <Match when={lang() === "tc"}>
          <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
            <p>
              {
                formatTime(nineDaysForecasting()?.seaTemp.recordTime, lang)
                  .seaSoilFormat
              }
              {`${
                nineDaysForecasting()?.seaTemp.place
              } 錄 得 之 海 水 溫 度 為 :`}
            </p>
            <p class="text-[#0000ff] font-bold">{`${
              nineDaysForecasting()?.seaTemp.value
            } °C`}</p>
          </div>
        </Match>
        <Match when={lang() === "sc"}>
          <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
            <p>
              {
                formatTime(nineDaysForecasting()?.seaTemp.recordTime, lang)
                  .seaSoilFormat
              }
              {`${
                nineDaysForecasting()?.seaTemp.place
              } 录 得 之 海 水 温 度 为 :`}
            </p>
            <p class="text-[#0000ff] font-bold">{`${
              nineDaysForecasting()?.seaTemp.value
            } °C`}</p>
          </div>
        </Match>
      </Switch>
    );
  };
  const SoilTempBlock = ({ lang, nineDaysForecasting }: SeaSoliTempProps) => {
    //using variable here is not reactive
    // const soilUpper = nineDaysForecasting()?.soilTemp[0];
    // const soilLower = nineDaysForecasting()?.soilTemp[1];
    //using nineDaysForecasting()?.soilTemp[1] is reactive
    const place = () => nineDaysForecasting()?.soilTemp[0].place;
    const soilUpper = () => nineDaysForecasting()?.soilTemp[0];
    const soilLower = () => nineDaysForecasting()?.soilTemp[1];
    return (
      <Switch fallback={<p></p>}>
        <Match when={lang() === "en"}>
          <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
            <p>Soil temperatures</p>
            <p>
              {formatTime(soilUpper()?.recordTime, lang).seaSoilFormat}
              {" at " + `${place()} :`}
            </p>
            <p class="text-[#bc8d79] font-bold">{`${
              soilUpper()?.depth.value
            }m depth:${soilUpper()?.value.toFixed(1)}°C`}</p>
            <p class="text-[#bc8d79] font-bold">{`${soilLower()?.depth.value.toFixed(
              1
            )}m depth:${soilLower()?.value.toFixed(1)}°C`}</p>
          </div>
        </Match>
        <Match when={lang() === "tc"}>
          <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
            <p>
              {formatTime(soilLower()?.recordTime, lang).seaSoilFormat}
              {`${soilUpper()?.place}  錄 得 之 土 壤 溫 度 為 :`}
            </p>
            <p class="text-[#bc8d79] font-bold">{`${soilUpper()?.depth.value.toFixed(
              1
            )} 米 ${soilUpper()?.unit}:${soilUpper()?.value.toFixed(1)} 度`}</p>
            <p class="text-[#bc8d79] font-bold">{`${soilLower()?.depth.value.toFixed(
              1
            )} 米 ${soilLower()?.unit}:${soilLower()?.value.toFixed(1)} 度`}</p>
          </div>
        </Match>
        <Match when={lang() === "sc"}>
          <div class="bg-[#f7f7f7] p-[10px] mr-[20px]">
            <p>
              {formatTime(soilLower()?.recordTime, lang).seaSoilFormat}
              {`${soilUpper()?.place}  录 得 之 土 壤 温 度 为 :`}
            </p>
            <p class="text-[#bc8d79] font-bold">{`${soilUpper()?.depth.value.toFixed(
              1
            )} 米 ${soilUpper()?.unit}:${soilUpper()?.value.toFixed(1)} 度`}</p>
            <p class="text-[#bc8d79] font-bold">{`${soilLower()?.depth.value.toFixed(
              1
            )} 米 ${soilLower()?.unit}:${soilLower()?.value.toFixed(1)} 度`}</p>
          </div>
        </Match>
      </Switch>
    );
  };
  const ColumnNineDaysForecasting = () => {
    return (
      <div class="text-center flex gap-[2px] justify-center  mb-5 ">
        <div class="overflow-x-auto flex w-[1200px]">
          <For each={nineDaysForecasting()?.weatherForecast}>
            {(info) => (
              <div class=" sm:w-[130px] min-w-[120px] h-auto  border-solid border-[2px] mx-[2px] mt-[10px] mb-[2px] pt-[5px]  border-[#1F97FF]">
                <div class="text-center">
                  <p class="text-[20.8px] ">
                    {formatDate(info.forecastDate, lang())}
                  </p>
                  <p class="text-[20.8px]">{formatWeek(info.week, lang())}</p>
                  <div class="bg-[#1d496e] flex justify-center ">
                    <img
                      class="m-[6px]"
                      src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${info.ForecastIcon}.png`}
                      width={"50px"}
                      height={"50px"}
                      alt="Picture of the author"
                    />
                  </div>
                </div>
                <p class="text-[20.8px] ">
                  {info.forecastMintemp.value +
                    " | " +
                    info.forecastMaxtemp.value +
                    "℃"}
                </p>
                <p class="text-[20.8px]">
                  {info.forecastMinrh.value +
                    "-" +
                    info.forecastMaxrh.value +
                    "%"}
                </p>
                <div class=" py-[15px] ">
                  <div class="max-h-[40px] w-full flex justify-center">
                    <img
                      width={40}
                      height={40}
                      src={`https://www.hko.gov.hk/common/images/PSR${
                        lang() === "en"
                          ? info.PSR.replace(" ", "")
                          : translateText(info.PSR as TextProp)
                      }_50_light.png`}
                      alt=""
                    />
                    <span class="pl-[3px] break-words  my-auto text-[16px]">
                      {info.PSR}
                    </span>
                  </div>
                </div>
                <div class="p-[6px] min-h-[155px] text-[16px]">
                  {info.forecastWind}
                </div>
                <div class="pl-[6px] pr-[5px] text-[16px]">
                  {info.forecastWeather}
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    );
  };
  const ListNineDaysForecasting = () => {
    return (
      <div class="text-center flex flex-col gap-[2px] justify-center">
        <For each={nineDaysForecasting()?.weatherForecast}>
          {(info) => (
            <>
              <div class="sm:block hidden">
                <div class=" w-auto  h-auto flex  border-solid border-[2px] mx-[2px] mt-[10px] mb-[2px]  border-[#1F97FF]">
                  <div class="flex items-center text-start sm:w-[15%] p-[5px]">
                    <span class="text-[20.8px]">
                      {formatDate(info.forecastDate, lang())}
                      <br />
                      {formatWeek(info.week, lang())}
                    </span>
                  </div>

                  <div class="bg-[#1d496e] sm:w-[10%] flex items-center justify-center px-[10px] py-[35px] ">
                    <img
                      class="m-[6px]"
                      src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${info.ForecastIcon}.png`}
                      width={"50px"}
                      height={"50px"}
                      alt="Picture of the author"
                    />
                  </div>
                  <div class="w-full text-start p-[8px]">
                    <div class="flex p-[5px]">
                      <p class="text-[20.8px] mr-6">
                        {info.forecastMintemp.value +
                          " | " +
                          info.forecastMaxtemp.value +
                          "℃"}
                      </p>

                      <p class="text-[20.8px] w-min-[100px]  mr-8">
                        {info.forecastMinrh.value +
                          "-" +
                          info.forecastMaxrh.value +
                          "%"}
                      </p>
                      <div class="sm:w-[40px] p-[5px] ">
                        <img
                          class=""
                          src={`https://www.hko.gov.hk/common/images/PSR${
                            lang() === "en"
                              ? info.PSR.replace(" ", "")
                              : translateText(info.PSR as TextProp)
                          }_50_light.png`}
                          alt=""
                        />
                      </div>

                      <span class="pl-[3px]  my-auto text-[16px]">
                        {info.PSR}
                      </span>
                    </div>
                    <div class="p-[5px] text-[20.8px]">{info.forecastWind}</div>
                    <div class="p-[5px] text-[20.8px]">
                      {info.forecastWeather}
                    </div>
                  </div>
                </div>
              </div>

              <div class=" sm:hidden flex  border-solid border-[2px]   border-[#1F97FF]">
                <div class="items-center text-start   w-[40%] flex flex-col">
                  <div class="text-[17px] ">
                    {formatDate(info.forecastDate, lang())}
                    <br />
                    {formatWeek(info.week, lang())}
                  </div>
                  <div class="bg-[#1d496e]  flex items-center justify-center w-full  flex-1">
                    <img
                      class=""
                      src={`https://www.hko.gov.hk/images/HKOWxIconOutline/pic${info.ForecastIcon}.png`}
                      width={50}
                      height={50}
                      alt="Picture of the author"
                    />
                  </div>
                </div>

                <div class="w-full text-start p-[8px] border-l-[2px] border-[#1f97ff]">
                  <div class="flex p-[5px]">
                    <p class="text-[17px] mr-6">
                      {info.forecastMintemp.value +
                        " | " +
                        info.forecastMaxtemp.value +
                        "℃"}
                    </p>

                    <p class="text-[17px] w-min-[100px]  mr-8">
                      {info.forecastMinrh.value +
                        "-" +
                        info.forecastMaxrh.value +
                        "%"}
                    </p>
                  </div>
                  <div class="flex">
                    <div class=" mr-[10px]">
                      <img
                        width={25}
                        height={25}
                        class=""
                        src={`https://www.hko.gov.hk/common/images/PSR${info.PSR.replace(
                          " ",
                          ""
                        )}_50_light.png`}
                        alt=""
                      />
                    </div>
                    <div class="  my-auto text-[16px]">{info.PSR}</div>
                  </div>

                  <div class="p-[5px] text-[17px]">{info.forecastWind}</div>
                  <div class="p-[5px] text-[17px]">{info.forecastWeather}</div>
                </div>
              </div>
            </>
          )}
        </For>
      </div>
    );
  };
  //ApexChart library is not fully reactive, need to create multiple api for single chart
  const [humidityDataForChartEn] = createResource(lang, HumidityDataForChartEn);
  const [humidityDataForChartTc] = createResource(lang, HumidityDataForChartTc);
  const [humidityDataForChartSc] = createResource(lang, HumidityDataForChartSc);
  const HumidityChartEn = () => {
    return (
      <div class="h-[400px] hidden md:block border-[0.8px] border-black chart-shadow p-[10px]">
        <Chart
          type="line"
          titleColor="#00adff"
          array={humidityDataForChartEn()}
        />
      </div>
    );
  };
  const HumidityChartTc = () => {
    return (
      <div class="h-[400px] hidden md:block border-[0.8px] border-black chart-shadow p-[10px]">
        <Chart
          type="line"
          titleColor="#00adff"
          array={humidityDataForChartTc()}
        />
      </div>
    );
  };
  const HumidityChartSc = () => {
    return (
      <div class="h-[400px] hidden md:block border-[0.8px] border-black chart-shadow p-[10px]">
        <Chart
          type="line"
          titleColor="#00adff"
          array={humidityDataForChartSc()}
        />
      </div>
    );
  };

  const [tempDataForChartEn] = createResource(lang, TempDataForChartEn);
  const [tempDataForChartTc] = createResource(lang, TempDataForChartTc);
  const [tempDataForChartSc] = createResource(lang, TempDataForChartSc);
  const TempChartEn = () => {
    return (
      <div class="h-[400px] hidden md:block border-[0.8px] border-black chart-shadow p-[10px]">
        <Chart type="line" titleColor="#ff7000" array={tempDataForChartEn()} />
      </div>
    );
  };
  const TempChartTc = () => {
    return (
      <div class="h-[400px] hidden md:block border-[0.8px] border-black chart-shadow p-[10px]">
        <Chart type="line" titleColor="#ff7000" array={tempDataForChartTc()} />
      </div>
    );
  };
  const TempChartSc = () => {
    return (
      <div class="h-[400px] hidden md:block border-[0.8px] border-black chart-shadow p-[10px]">
        <Chart type="line" titleColor="#ff7000" array={tempDataForChartSc()} />
      </div>
    );
  };
  const eng = () => (
    <div class="cursor-pointer">
      <span onClick={() => changeLan("tc")}>繁</span>
      <span onClick={() => changeLan("sc")}>简</span>
    </div>
  );
  const tc = () => (
    <div class="cursor-pointer">
      <span onClick={() => changeLan("en")}>ENG</span>
      <span onClick={() => changeLan("sc")}>简</span>
    </div>
  );
  const sc = () => (
    <div class="cursor-pointer">
      <span onClick={() => changeLan("en")}>ENG</span>
      <span onClick={() => changeLan("tc")}>繁</span>
    </div>
  );
  const options = {
    en: eng,
    tc: tc,
    sc: sc,
  };
  return (
    <div class="bg-[#ebf3f6]  ">
      <div class=" sm:px-[40px]  sm:max-w-[1280px] sm:w-[90%] w-[95%] mx-auto ">
        <div class="flex justify-between content-center text-[1.8em] font-700 mb-[25px]">
          <h1 class=" self-center text-[#073e7f] ">
            {translate.title[`${lang()}`]}
          </h1>
          <div class="flex">
            <Dynamic component={options[lang()]} />
            <Show
              when={showList()}
              fallback={
                <img
                  onclick={() =>
                    showList() ? setShowList(false) : setShowList(true)
                  }
                  class="h-[34px] self-center align-middle cursor-pointer"
                  src="mode_off.png"
                />
              }
            >
              <img
                onclick={() =>
                  showList() ? setShowList(false) : setShowList(true)
                }
                class="h-[34px] self-center align-middle cursor-pointer"
                src="mode_on.png"
              />
            </Show>
          </div>
        </div>
        <main class=" bg-white p-[20px] border-[1px] border-solid border-[#ccc] font-400">
          <div>
            <p class="text-[#faa330] pb-[5px] mb-[12px]  font-700 text-[1.4em]">
              {translate.subTitle[`${lang()}`]}
            </p>
            <span class="text-[120%]">
              {nineDaysForecasting()?.generalSituation}
            </span>
          </div>
          <Show
            when={showList() === true}
            fallback={<ColumnNineDaysForecasting />}
          >
            <ListNineDaysForecasting />
          </Show>

          <Switch fallback={<></>}>
            <Match when={lang() == "en"}>
              <TempChartEn />
            </Match>
            <Match when={lang() == "tc"}>
              <TempChartTc />
            </Match>
            <Match when={lang() == "sc"}>
              <TempChartSc />
            </Match>
          </Switch>
          <Switch fallback={<></>}>
            <Match when={lang() == "en"}>
              <HumidityChartEn />
            </Match>
            <Match when={lang() == "tc"}>
              <HumidityChartTc />
            </Match>
            <Match when={lang() == "sc"}>
              <HumidityChartSc />
            </Match>
          </Switch>
          <div class="flex justify-end mt-4">
            <p>
              {translate.updateTime[`${lang()}`]}
              {
                formatTime(nineDaysForecasting()?.updateTime, lang)
                  .nineDaysForecastFormat
              }
            </p>
          </div>
          <div class="sm:flex">
            <SeaTempBlock
              lang={lang}
              nineDaysForecasting={nineDaysForecasting}
            />
            <SoilTempBlock
              lang={lang}
              nineDaysForecasting={nineDaysForecasting}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
