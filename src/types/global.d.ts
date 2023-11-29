export {};

declare global {
  // https://github.com/kanzitelli/rnn-starter/tree/bed89b74065b21bf5682db76cdbbfc96eb6b0c93/src/utils/types

  // `stores` layer
  interface IStore {
    hydrate?: () => PVoid;
  }

  type StoreDefaultKeys = 'set' | 'setMany' | 'hydrate';
  type StoreKeysOf<S> = keyof Omit<S, StoreDefaultKeys>;

  // `services` layer
  interface IService {
    init: () => PVoid;
  }

  // System
  type PVoid = Promise<void>;
  type AnyObj = Record<string, unknown>;
  type PureFunc = () => void;
  type PureFuncAsync = () => PVoid;
  type PureFuncArg<T> = (value?: T) => void;

  // Design system
  type StatusBarStyle = 'light' | 'dark' | undefined;
  type ThemeColors = {
    textColor: string;
    bgColor: string;
    bg2Color: string;
  };

  // Define the types for the context and provider props
  type RootStoreContextType = RootStore | null;

  interface RootStoreProviderProps {
    children: ReactNode;
  }

  interface NoteStatistics {
    average: number;
    percentage: number;
    count: number;
  }

  interface TimestampedNoteData {
    // timestamp: number,
    type: string;
    note: string;
    cents: number;
  }
  interface DataPoint {
    date: number;
    value: number;
  }

  interface LineChartProps {
    data: DataPoint[];
  }

  interface MetaObject {
    note: string | null;
    cents: number | null;
    accuracy: number | null;
  }

  type DynamicObject = {
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

  type PitchDataObject = {
    tone: string;
    frequency: number;
  };

  type DataArray = DataPoint[];
  type StatsData = Record<number, TimestampedNoteData[]>;
	type InputData = {day: string; month: string; year: string}[];
}
