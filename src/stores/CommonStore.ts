import {makeObservable, observable, action} from 'mobx';

export class CommonStore {
  accidental = '#';
  userKey = 'C#';

  constructor() {
    makeObservable(this, {
      accidental: observable,
      userKey: observable,
      setFlatAccidental: action,
      setSharpAccidental: action,
      setUserKey: action,
    });
  }

  setFlatAccidental() {
    this.accidental = 'p';
  }

  setSharpAccidental() {
    this.accidental = '#';
  }

  setUserKey(newKey: string) {
    this.userKey = newKey;
  }
}
