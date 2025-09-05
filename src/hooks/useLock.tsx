import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import * as ScreenOrientation from 'expo-screen-orientation'
import { Platform } from 'react-native'
import * as Device from 'expo-device';

const useLock = () => {
    useFocusEffect(
        useCallback(() => {
            const lock = async () => {
                if (Platform.OS !== 'ios') return;

                if (Device.deviceType === Device.DeviceType.TABLET) {
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
                } else {
                    await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
                }
            };

            lock();
        }, [])
    )
}

export default useLock;