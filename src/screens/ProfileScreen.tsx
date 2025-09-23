import { View, Text, ImageBackground, ScrollView } from 'react-native'
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
import { getLabels } from './Login/hooks/getLabels'

const ProfileScreen = () => {

    const { s, vs, isTablet } = useScale();

    const [currentSection, setCurrentSection] = useState<string>('myProfile')

    const { account } = getAccount();

    const { } = getLabels()

    const birth_date = account?.user?.birth_date;
    const first_name = account?.user?.first_name;
    const last_name = account?.user?.last_name;
    const middle_name = account?.user?.middle_name;

    const address = account?.kindergarten?.address;
    const city = account?.kindergarten?.city?.name || account?.kindergarten_city;
    const name = account?.kindergarten?.name || account?.kindergarten_name;
    const region = account?.kindergarten?.region?.name || account?.kindergarten_region;

    const background = account?.background;
    const avatar = account?.avatar;

    const myProfileLabel = store.labels?.myProfile || translations[store.language]?.мойпрофиль;
    const educationalFacilityLabel = store.labels?.educationalFacility || translations[store.language]?.образовательноеучереждение;
    const changePasswordLabel = store.labels?.changePassword || translations[store.language]?.сменапароля;

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                <View style={{ borderWidth: 2, borderColor: '#EFEEFC', height: 'auto', gap: vs(35), borderRadius: 20, padding: vs(20), backgroundColor: 'white', marginBottom: 100 }}>
                    
                    <Sections currentSection={currentSection} setCurrentSection={setCurrentSection}/>
            
                    <Text style={{ fontSize: isTablet? vs(18 + 4) : vs(18), fontWeight: '600' }}>{ currentSection === 'myProfile' ? myProfileLabel : currentSection === 'educationalFacility' ? educationalFacilityLabel : currentSection === 'changePassword' && changePasswordLabel}</Text>
                
                    {
                        currentSection === 'myProfile' ?
                            <MyProfileSection birth_date={birth_date} first_name={first_name} last_name={last_name} middle_name={middle_name} background={background} avatar={avatar}/>
                        :
                        currentSection === 'educationalFacility'
                        ?
                            <EducationalFacilitySection city={city} name={name} region={region} />
                        :
                        currentSection === 'changePassword'
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