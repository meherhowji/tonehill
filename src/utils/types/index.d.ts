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
}