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

const ProfileScreen = () => {

    const { s, vs } = useScale()

    const [currentSection, setCurrentSection] = useState<string>('Мой профиль')

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]}>
            <ScrollView contentContainerStyle={{ gap: vs(20) }} style={{flex: 1, padding: vs(20)}}>
                <View style={{ borderWidth: 2, borderColor: '#EFEEFC', height: 'auto', gap: vs(35), borderRadius: 20, padding: vs(20), backgroundColor: 'white', marginBottom: 100 }}>
                    
                    <Sections currentSection={currentSection} setCurrentSection={setCurrentSection}/>
            
                    <Text style={{ fontSize: vs(18), fontWeight: '600' }}>{currentSection}</Text>
                
                    {
                        currentSection === 'Мой профиль' ?
                        <MyProfileSection />
                        :
                        currentSection === 'Образовательное учереждение' 
                        ?
                        <EducationalFacilitySection />
                        :
                        currentSection === 'Смена пароля' 
                        &&
                        <PasswordChangeSection />
                    }
                    
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default observer(ProfileScreen);