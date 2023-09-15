interface DataPoint {
  time: number;
  hz: number;
}

export interface MetaObject {
  note: string | null;
  cents: number | null;
  accuracy: number | null;
}

export type DynamicObject = {
  [key: string]: {
    flat: number[];
    sharp: number[];
    perfect: number[];
    stats?: {
      averageFlat: number;
      averageSharp: number;
      averagePerfect: number;
      percentageFlat: number;
      percentageSharp: number;
      percentagePerfect: number;
    };
  };
};

export type PitchDataObject = {
  tone: string;
  frequency: number;
};

export type DataArray = DataPoint[];
