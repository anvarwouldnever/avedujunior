import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useScale } from '../../hooks/useScale';
import translations from '../../../translations';
import { store } from '../../store/store';

const ProgressBar = ({ progress }) => {

    const { s, vs } = useScale()

    const progressValue = useSharedValue(0);

    useEffect(() => {
        progressValue.value = withTiming(progress / 3, { duration: 400 });
    }, [progress]);

    const animatedStyle = useAnimatedStyle(() => ({
        width: `${progressValue.value * 100}%`,
    }));

    return (
        <View style={{ width: '100%', flexDirection: 'column', gap: vs(7) }}>
            <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: vs(14), fontWeight: '600', color: 'black'}}>{progress === 1? translations[store?.language]?.информацияоребенке : progress === 2 ? translations[store?.language]?.установитепароль : progress === 3 && translations[store?.language]?.подтвердитепароль}</Text>
                <Text style={{ fontSize: vs(14), fontWeight: '600', color: '#6A5AE0'}}>{progress} из 3</Text>
            </View>
            <View style={{ height: vs(8), backgroundColor: 'white', width: '100%', borderRadius: 100, overflow: 'hidden'}}>
                <Animated.View style={[{ height: '100%', backgroundColor: '#6A5AE0', borderRadius: 100}, animatedStyle]}/>
            </View>
        </View>
    )
}

export default ProgressBar