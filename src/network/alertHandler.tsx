import { Alert } from "react-native";
import { navigationReset } from "../navigation/Navigator/utils/navigate";

let isAlertVisible = false;

export const alertHandler = (screen?: string) => {

    if (isAlertVisible) return;

    Alert.alert("Соединение прервано", "Проверьте подключение к сети и попробуйте снова",
        [
            {
                text: "ОК",
                onPress: () => navigationReset(screen ?? "Home"),
            },
        ]
    );
};