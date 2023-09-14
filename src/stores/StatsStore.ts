import {makeAutoObservable} from 'mobx';

export class StatsStore {
  stats: string = '#';

  constructor() {
    makeAutoObservable(this);
  }
}
