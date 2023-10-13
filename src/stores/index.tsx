import React, {useContext, createContext} from 'react';
import './_hydration';
import {CommonStore} from './CommonStore';
import {StatsStore} from './StatsStore';

// https://github.com/kanzitelli/rnn-starter/blob/bed89b74065b21bf5682db76cdbbfc96eb6b0c93/src/stores/index.tsx#L28

export class RootStore {
  static async hydrate(): PVoid {
    for (const key in stores) {
      if (Object.prototype.hasOwnProperty.call(stores, key)) {
        const s = (stores as any)[key] as IStore;

        if (s.hydrate) {
          await s.hydrate();
        }
      }
    }
  }

  // stores list
  common = new CommonStore();
  stats = new StatsStore();
}

export const stores = new RootStore();

// Providers and hooks
const RootStoreContext = createContext<RootStoreContextType>(stores);

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({children}: any) => (
  <RootStoreContext.Provider value={stores}>{children}</RootStoreContext.Provider>
);

export const useRootStore = (): RootStore => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return context;
};
