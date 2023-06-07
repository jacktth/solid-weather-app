import { Accessor, Resource } from "solid-js";

export type DataType =
  | "flw"
  | "fnd"
  | "rhrread"
  | "warnsum"
  | "warningInfo"
  | "swt";

//本港地區天氣預報; Hong Kong Regional Weather Forecast
export type FlwResponse = {
  generalSituation: string;
  tcInfo: string;
  fireDangerWarning: string;
  forecastPeriod: string;
  forecastDesc: string;
  outlook: string;
  updateTime: string;
};

export type DayWeatherForecast = {
  forecastDate: string;
  week: string;
  forecastWind: string;
  forecastWeather: string;
  forecastMaxtemp: {
    value: number;
    unit: string;
  };
  forecastMintemp: {
    value: number;
    unit: string;
  };
  forecastMaxrh: {
    value: number;
    unit: string;
  };
  forecastMinrh: {
    value: number;
    unit: string;
  };
  ForecastIcon: number;
  PSR: string;
  soilTemp: {
    place: string;
    value: string;
    unit: string;
    recordTime: String;
    depth: string;
  };
  seaTemp: {
    place: string;
    value: string;
    unit: string;
    recordTime: String;
  };
};

export type FndResponse = {
  //weekly weather general situation
  generalSituation: string;
  //九天天氣預報; nine days forecasting
  weatherForecast: DayWeatherForecast[];
  updateTime:string
  soilTemp:SoilTemp[]
  seaTemp:SeaTemp
};

type SeaTemp =  {
  place: string;
  value: number;
  unit: string;
  recordTime: string; 
}

type SoilTemp = {
  place: string;
  value: number;
  unit: string;
  recordTime: string; 
  depth: {
    unit: string;
    value: number;
  };
}


export interface SeaSoliTempProps {
  lang: Accessor<Language>,
  nineDaysForecasting: Resource<FndResponse>
}

export type ResponseType<T extends DataType> = T extends "flw"
  ? FlwResponse
  : T extends "fnd"
  ? FndResponse
  : unknown;

export type Language = "en" | "tc" | "sc";

export type  Report = {
  en?:string
  tc?:string
  sc?:string
}


export type AreaWeatherData = {
  rainfall: {
    data: {
      unit: string;
      place: string;
      max: number;
      main: string;
    }[];
    startTime: string;
    endTime: string;
  };
  icon: number[];
  iconUpdateTime: string;
  specialWxTips: string[];
  uvindex: {
    data: {
      place: string;
      value: number;
      desc: string;
    }[];
    recordDesc: string;
  };
  updateTime: string;
  temperature: {
    data: {
      place: string;
      value: number;
      unit: string;
    }[];
    recordTime: string;
  };
  warningMessage: string;
  mintempFrom00To09: string;
  rainfallFrom00To12: string;
  rainfallLastMonth: string;
  rainfallJanuaryToLastMonth: string;
  tcmessage: string;
  humidity: {
    recordTime: string;
    data: {
      unit: string;
      value: number;
      place: string;
    }[];
  };
};


export type TextProp = "高"|"中高"|"中"|"中低"|"低"


export type WeatherForcastFlw =  {
  generalSituation: string
  tcInfo: string
  fireDangerWarning: string
  forecastPeriod: string
  forecastDesc: string
  outlook: string
  updateTime: string
  }