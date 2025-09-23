import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WithSliderWrapper from './src/navigation/Navigator/WithSliderWrapper';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';
import { checkNetwork } from './src/network/checkNetwork';
import NoNetworkScreen from './src/components/NoNetwork';

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
    duration: 500,
    fade: true
});

const App = () => {

    const [hasNetwork, setHasNetwork] = useState<boolean | null>(null);

    const initialize = async () => {
        try {
            const network = await checkNetwork();
            setHasNetwork(network);
            if (!network) {
                await SplashScreen.hideAsync();
            }
        } catch (e) {
            setHasNetwork(false);
        }
    };

    useEffect(() => {
        initialize();
    }, []);

    if (hasNetwork === null) {
        return null;
    }

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {hasNetwork ? (
                <WithSliderWrapper />
            ) : (
                <NoNetworkScreen onRetry={initialize} />
            )}
        </GestureHandlerRootView>
    );
}


export default App