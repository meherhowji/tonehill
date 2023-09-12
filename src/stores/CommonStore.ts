import {makeObservable, observable, action, computed} from 'mobx';

export class CommonStore {
  note = '';
  accidental = '#';
  userKey = '';

  constructor() {
    makeObservable(this, {
      note: observable,
      accidental: observable,
      userKey: observable,
      updateNote: action,
      setFlatAccidental: action,
      setSharpAccidental: action,
      setUserKey: action,
      tone: computed,
    });
  }

  updateNote(n: string) {
    this.note = n;
  }

  setFlatAccidental() {
    this.accidental = 'b';
  }

  setSharpAccidental() {
    this.accidental = '#';
  }

  setUserKey(newKey: string) {
    this.userKey = newKey;
  }

  get tone() {
    return 0;
  }
}
