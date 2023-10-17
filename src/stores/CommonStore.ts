import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable, PersistStoreMap} from 'mobx-persist-store';
import {SCALES} from '../utils/constants';

export class CommonStore implements IStore {
  accidental: string = '#';
  showOctave: boolean = true;
  showCents: boolean = true;
  showFrequency: boolean = false;
  showAxisLabel: boolean = true;
  inTuneRange: number = 5;
  userKey: string = 'C#';
  userScale: string[] = SCALES.MAJOR;

  constructor() {
    makeAutoObservable(this);

    // REF: https://github.com/quarrant/mobx-persist-store/issues/64
    const persist = () => {
      makePersistable(this, {
        name: CommonStore.name,
        properties: [
          'accidental',
          'showOctave',
          'showCents',
          'showFrequency',
          'showAxisLabel',
          'inTuneRange',
          'userKey',
          'userScale',
        ],
      });
    };

    const persistedStore = Array.from(PersistStoreMap.values()).find(el => el.storageName.includes(CommonStore.name));
    persistedStore && persistedStore.stopPersisting();
    persist();
  }

  toggleAccidental() {
    this.accidental = this.accidental === '#' ? 'b' : '#';
  }

  toggleOctave() {
    this.showOctave = !this.showOctave;
  }

  toggleCents() {
    this.showCents = !this.showCents;
  }

  toggleFrequency() {
    this.showFrequency = !this.showFrequency;
  }

  toggleAxisLabel() {
    this.showAxisLabel = !this.showAxisLabel;
  }

  setInTuneRange(cent: number) {
    this.inTuneRange = cent;
  }

  setUserKey(key: string) {
    this.userKey = key;
  }

  setUserScale(scale: string) {
    this.userScale = SCALES[scale.toUpperCase()] || SCALES.MAJOR;
  }

  get octaveVisibility() {
    return this.showOctave ? 'Show' : 'Hide';
  }

  get centsVisibility() {
    return this.showCents ? 'Show' : 'Hide';
  }

  get axisLabelVisibility() {
    return this.showAxisLabel ? 'Show' : 'Hide';
  }

  // Unified set methods
  set<T extends StoreKeysOf<CommonStore>>(what: T, value: CommonStore[T]) {
    (this as CommonStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<CommonStore>>(obj: Record<T, CommonStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as CommonStore[T]);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
