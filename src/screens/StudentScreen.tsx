import { View, Text, ImageBackground, ScrollView, Platform, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { bgAssets } from '../components/BgAssets'
import Slider from '../navigation/Slider/Slider'
import SliderContent from '../navigation/Slider/SliderContent'
import { store } from '../store/store'
import { useScale } from '../hooks/useScale'
import Sections from './Student/Sections'
import GeneralInfo from './Student/GeneralInfo'
import Parents from './Student/Parents'
import DevelopmentMap from './Student/DevelopmentMap'
import ReadinessMap from './Student/ReadinessMap'

const StudentScreen = () => {

    const { s, vs } = useScale()
    
    const [section, setSection] = useState<string>('Общая информация')
    
    return (
        <ImageBackground style={{ flex: 1, justifyContent: 'center'}} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ rowGap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                
                <View style={{ width: '100%', backgroundColor: 'white', height: 'auto', borderRadius: vs(20), padding: vs(20), gap: vs(20), marginBottom: vs(40), borderWidth: 1, borderColor: '#e2cef2' }}>

                    <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize: Platform.isPad? vs(20) : vs(18), fontWeight: '600'}}>Воспитанник:</Text>

                    <Sections section={section} setSection={setSection} />

                    { section === 'Общая информация' ?

                        <GeneralInfo />

                    : section === 'Родители' ?

                        <Parents />
                    
                    : section === 'Карта развития' ?

                        <DevelopmentMap />

                    : section === 'Карта готовности' &&

                        <ReadinessMap />

                    }

                </View>

            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>
            
        </ImageBackground>
    )
}

export default StudentScreen