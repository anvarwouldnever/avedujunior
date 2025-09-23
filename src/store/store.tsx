import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

class Store {

    profileModal: boolean = false;
    pfp: object = {};
    backgroundImage: object = {};
    language: string = 'ru';
    name: string = '';
    group: string = '';
    access: number = 2;
    juridical: boolean = true;
    labels: object = {};

    constructor() {
        makeAutoObservable(this, {}, { deep: true });
        this.hydrate();
    };

    async hydrate() {
        try {
            const savedLanguage = await AsyncStorage.getItem('language');
            if (savedLanguage) {
                runInAction(() => {
                    this.language = savedLanguage;
                });
            }
        } catch (e) {
            console.log('Ошибка гидрации языка:', e);
        }
    }

    setLanguage(language: string) {
        this.language = language;
        AsyncStorage.setItem('language', language).catch(e =>
            console.log('Ошибка сохранения языка:', e)
        );
    }

    setModal(modal: boolean) {
        this.profileModal = modal;
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