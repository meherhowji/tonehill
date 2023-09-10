import React, {createContext, useContext, ReactNode} from 'react';
import RootStore from '.';

// Define the types for the context and provider props
type RootStoreContextType = RootStore | null;

interface RootStoreProviderProps {
  children: ReactNode;
}

const RootStoreContext = createContext<RootStoreContextType>(null);

export const RootStoreProvider: React.FC<RootStoreProviderProps> = ({children}) => {
  return <RootStoreContext.Provider value={new RootStore()}>{children}</RootStoreContext.Provider>;
};

export const useRootStore = (): RootStore => {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }
  return context;
};
