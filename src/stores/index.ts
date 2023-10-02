import {CommonStore} from './CommonStore';
import {StatsStore} from './StatsStore';

class RootStore {
  commonStore: CommonStore;
  statsStore: StatsStore;

  constructor() {
    this.commonStore = new CommonStore();
    this.statsStore = new StatsStore();
  }
}

export default RootStore;
