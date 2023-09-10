import {CommonStore} from './CommonStore';

class RootStore {
  commonStore: CommonStore;
  constructor() {
    this.commonStore = new CommonStore();
  }
}

export default RootStore;
