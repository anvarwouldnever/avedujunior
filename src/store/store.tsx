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
        this.loadPfpFromStorage();
        this.loadBackgroundImageFromStorage();
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
        try {
            const json = JSON.stringify(pfp);
            AsyncStorage.setItem('pfp', json);
        } catch (error) {
            console.error('Ошибка при сохранении pfp в AsyncStorage:', error);
        }
    }

    async loadPfpFromStorage() {
        try {
            const json = await AsyncStorage.getItem('pfp');
            if (json) {
                this.pfp = JSON.parse(json);
            }
        } catch (error) {
            console.error('Ошибка при загрузке pfp из AsyncStorage:', error);
        }
    }

    setBackgroundImage(image: object) {
        this.backgroundImage = image;
        try {
            const json = JSON.stringify(image);
            AsyncStorage.setItem('backgroundImage', json);
        } catch (error) {
            console.error('Ошибка при сохранении backgroundImage в AsyncStorage:', error);
        }
    }

    async loadBackgroundImageFromStorage() {
        try {
            const json = await AsyncStorage.getItem('backgroundImage');
            if (json) {
                this.backgroundImage = JSON.parse(json);
            }
        } catch (error) {
            console.error('Ошибка при загрузке backgroundImage из AsyncStorage:', error);
        }
    }
  
}

export const store = new Store();