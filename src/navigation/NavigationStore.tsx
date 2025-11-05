import { makeAutoObservable } from 'mobx';

class NavigationStore {

    currentRoute: string = 'Home';
    openSlider: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setRoute(name: string) {
        this.currentRoute = name;
    }

    setOpenSlider(state: boolean) {
        this.openSlider = state;
    }
}

export const navigationStore = new NavigationStore();

