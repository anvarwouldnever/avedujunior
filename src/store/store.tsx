import { makeAutoObservable } from 'mobx';

class Store {
  token: string = null;
  profileModal: boolean = false;
  pfp: number = 1;
  backgroundImage: number = 1;

  constructor() {
    makeAutoObservable(this);
  }

  setToken(token: string) {
    this.token = token;
  }

  setModal(modal: boolean) {
    this.profileModal = modal;
  }

  setPfp(pfp: number) {
    this.pfp = pfp;
  }

  setBackgroundImage(image: number) {
    this.backgroundImage = image;
  }
}

export const store = new Store();