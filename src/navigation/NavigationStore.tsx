// src/stores/navigationStore.ts
import { makeAutoObservable } from 'mobx';

class NavigationStore {
  currentRoute: string = 'Home';

  constructor() {
    makeAutoObservable(this);
  }

  setRoute(name: string) {
    this.currentRoute = name;
  }
}

export const navigationStore = new NavigationStore();

