import { View, Text, ImageBackground, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../hooks/useScale'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'
import { bgAssets } from '../components/BgAssets'
import MyProfileSection from './Profile/MyProfileSection'
import EducationalFacilitySection from './Profile/EducationalFacilitySection'
import PasswordChangeSection from './Profile/PasswordChangeSection'
import Sections from './Profile/Sections'
import { getAccount } from './Profile/hooks/getAccount'
import translations from '../../translations'
import Slider from '../navigation/Slider/Slider'
import SliderContent from '../navigation/Slider/SliderContent'

const ProfileScreen = () => {

    const { s, vs } = useScale()

    const [currentSection, setCurrentSection] = useState<string>(translations[store.language].мойпрофиль)

    const { account, error, loading } = getAccount();

    const birth_date = account?.user?.birth_date;
    const first_name = account?.user?.first_name;
    const last_name = account?.user?.last_name;
    const middle_name = account?.user?.middle_name;

    const address = account?.kindergarten?.address;
    const city = account?.kindergarten?.city?.name;
    const name = account?.kindergarten?.name;
    const region = account?.kindergarten?.region?.name;

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            <ScrollView contentContainerStyle={{ gap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                <View style={{ borderWidth: 2, borderColor: '#EFEEFC', height: 'auto', gap: vs(35), borderRadius: 20, padding: vs(20), backgroundColor: 'white', marginBottom: 100 }}>
                    
                    <Sections currentSection={currentSection} setCurrentSection={setCurrentSection}/>
            
                    <Text style={{ fontSize: Platform.isPad? vs(18 + 4) : vs(18), fontWeight: '600' }}>{currentSection}</Text>
                
                    {
                        currentSection === translations[store.language].мойпрофиль ?
                        <MyProfileSection birth_date={birth_date} first_name={first_name} last_name={last_name} middle_name={middle_name} />
                        :
                        currentSection === translations[store.language].образовательноеучереждение
                        ?
                        <EducationalFacilitySection city={city} name={name} region={region} />
                        :
                        currentSection === translations[store.language].сменапароля
                        &&
                        <PasswordChangeSection />
                    }
                    
                </View>
            </ScrollView>

            <Slider>
                <SliderContent />
            </Slider>
            
        </ImageBackground>
    )
}

export default observer(ProfileScreen);