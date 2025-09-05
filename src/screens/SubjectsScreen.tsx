import { View, ScrollView, ImageBackground, Text } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import Header from './Subjects/Header';
import DayNames from './Subjects/DayNames';
import Calendar from './Subjects/Calendar';
import { bgAssets } from '../components/BgAssets';
import { store } from '../store/store';
import { observer } from 'mobx-react-lite';
import Slider from '../navigation/Slider/Slider';
import SliderContent from '../navigation/Slider/SliderContent';
import SubjectsGrid from './Home/SubjectsGrid/SubjectsGrid';
import translations from '../../translations';

const SubjectsScreen = () => {
    const { s, vs, isTablet, windowWidth } = useScale();

    return (
        <ImageBackground style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ padding: vs(20), rowGap: vs(20) }} style={{ flex: 1 }}>
                
                {store.juridical ? 
                    <View style={{ width: '100%', height: 'auto', backgroundColor: 'white', borderRadius: 20, padding: isTablet ? vs(10) : vs(10), marginBottom: vs(15)}}>
                        
                        <Header />

                        <DayNames />

                        <Calendar />
                        
                    </View>
                :
                    <View style={{ rowGap: vs(20) }}>

                        <Text style={{color: 'black', fontSize: isTablet? vs(24) : vs(22), fontWeight: '700'}}>{translations[store.language].предметы}</Text>
                        
                        <SubjectsGrid />

                    </View>
                }

            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>

        </ImageBackground>
    );
}

export default observer(SubjectsScreen);
