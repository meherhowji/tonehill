import {configurePersistable} from 'mobx-persist-store';
import {MMKV} from 'react-native-mmkv';

// ref: https://github.com/kanzitelli/rnn-starter/blob/bed89b74065b21bf5682db76cdbbfc96eb6b0c93/src/stores/_hydration.ts
const storage = new MMKV();

configurePersistable({
  debugMode: __DEV__,
  storage: {
    setItem: (key, data) => storage.set(key, data),
    getItem: key => storage.getString(key) as string | null,
    removeItem: key => storage.delete(key),
  },
});

