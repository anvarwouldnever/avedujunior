import { View, Text, ImageBackground, ScrollView, Platform } from 'react-native';
import React, { useState } from 'react';
import { bgAssets } from '../components/BgAssets';
import Slider from '../navigation/Slider/Slider';
import SliderContent from '../navigation/Slider/SliderContent';
import { store } from '../store/store';
import { useScale } from '../hooks/useScale';
import Sections from './Student/Sections';
import GeneralInfo from './Student/GeneralInfo';
import Parents from './Student/Parents';
import DevelopmentMap from './Student/DevelopmentMap';
import ReadinessMap from './Student/ReadinessMap';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

const StudentScreen = () => {

    const { s, vs, isTablet } = useScale();
    const [section, setSection] = useState<string>('Общая информация');

    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => { 
        scrollY.value = event.contentOffset.y
    });
    
    
    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'center'}} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <Animated.ScrollView onScroll={scrollHandler} showsVerticalScrollIndicator={false} contentContainerStyle={{ rowGap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                
                <View style={{ width: '100%', backgroundColor: 'white', height: 'auto', borderRadius: vs(20), padding: vs(20), gap: vs(20), marginBottom: vs(40), borderWidth: 1, borderColor: '#e2cef2' }}>

                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: isTablet? vs(20) : vs(18), fontWeight: '600'}}>Воспитанник:</Text>

                    <Sections section={section} setSection={setSection} />

                    { section === 'Общая информация' ?

                        <GeneralInfo />

                    : section === 'Родители' ?

                        <Parents />

                    : section === 'Карта развития' ?

                        <DevelopmentMap scrollY={scrollY} />

                    : section === 'Карта готовности' &&

                        <ReadinessMap />

                    }

                </View>

            </Animated.ScrollView>

            <Slider>
                <SliderContent />
            </Slider>
            
        </ImageBackground>
    )
}

export default StudentScreen