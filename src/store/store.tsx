import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Store {

    profileModal: boolean = false;
    pfp: object = null;
    backgroundImage: object = null;
    language: string = 'ru';
    name: string = null;
    group: string = null
    access: number = 2;
    juridical: boolean = true;
    labels: object = {};

    constructor() {
        makeAutoObservable(this);
    };

    setModal(modal: boolean) {
        this.profileModal = modal;
    }

    setLanguage(language: string) {
        this.language = language
    }

    setGroup(group: string) {
        this.group = group;
    }

    setName(name: string) {
        this.name = name;
    }

    setAccess(access: number) {
        this.access = access
    }

    setJuridical(juridical: boolean) {
        this.juridical = juridical
    }

    setLabels(labels: object) {
        this.labels = labels
    }

    setPfp(pfp: object) {
        this.pfp = pfp;
    }

    setBackgroundImage(image: object) {
        this.backgroundImage = image;
    }
  
}

export const store = new Store();