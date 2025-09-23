import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = 'https://api.yangidunyo.uz/api';

const api = axios.create({
    baseURL: BASE_URL,
});

async function getLanguage() {
    return (await AsyncStorage.getItem('language')) || 'ru';
}

api.interceptors.request.use(
    async (config: any) => {
        if (!config.skipAuth) {
            const token = await SecureStore.getItemAsync('access_token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        config.headers['X-Localization'] = await getLanguage();
        
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;