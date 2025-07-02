import { makeAutoObservable } from 'mobx';

class Store {
    subjects: Array<Object> = [];
    tasks: Array<Object> = [];

    constructor() {
        makeAutoObservable(this);
    }

    setSubjects(subjects: Array<Object>) {
        this.subjects = subjects;
    }

    setTasks(tasks: Array<Object>) {
        this.tasks = tasks;
    }
}

export const homeScreenStore = new Store();