import { TouchableOpacity, Text, StatusBar, Platform } from 'react-native'
import React from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { useScale } from '../../../../hooks/useScale'
import { store } from '../../../../store/store'
import { observer } from 'mobx-react-lite'

const Inputs = ({ scrollY }) => {

    const { s, vs, isTablet, windowHeight } = useScale()

    const statusBarHeight = StatusBar.currentHeight;

    const START_SCROLL = isTablet ? vs(590) : windowHeight * 1.38 + statusBarHeight - (Platform.OS === 'android' ? 40 : 0);

    const animatedStyle = useAnimatedStyle(() => {
        const top = interpolate(
            scrollY.value,
            [0, START_SCROLL, START_SCROLL + 1],
            [0, 0, scrollY.value - START_SCROLL],
            Extrapolate.CLAMP
        );

        return { top };
    });

    return (
        <Animated.View style={[{ position: 'absolute', width: isTablet ? vs(160) : vs(140), rowGap: vs(10), right: 0}, animatedStyle]}>
            
            <TouchableOpacity style={{ height: vs(56), borderRadius: vs(15), backgroundColor: '#EFEEFC', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#6A5AE0', fontSize: isTablet ? vs(16) : vs(14), fontWeight: '600'  }}>{store?.labels?.save}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ height: vs(56), borderRadius: vs(15), backgroundColor: '#6A5AE0', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: isTablet ? vs(16) : vs(14), fontWeight: '600' }}>{store?.labels?.finish}</Text>
            </TouchableOpacity>

        </Animated.View>
    )
}

export default observer(Inputs)