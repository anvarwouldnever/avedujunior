import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import { bgAssets } from '../../components/BgAssets'
import { store } from '../../store/store'
import { getAvatars } from './hooks/getAvatars'
import { getBackgrounds } from './hooks/getBackgrounds'
import translations from '../../../translations'
import { putProfile } from './hooks/putProfile'
import { observer } from 'mobx-react-lite'
import ChooseLanguage from './MyProfile/ChooseLanguage'

const MyProfileSection = ({ birth_date, first_name, last_name, middle_name }) => {
    const { s, vs, isTablet } = useScale()

    const [changePfp, setChangePfp] = useState(false)
    const [chosenPfp, setChosenPfp] = useState(store?.pfp)

    const [changeBg, setChangeBg] = useState(false)
    const [chosenBg, setChosenBg] = useState(store?.backgroundImage)

    const pfps = [
        {image: require('../../screens/Profile/staticAssets/pfp1.png'), id: 1},
        {image: require('../../screens/Profile/staticAssets/pfp2.png'), id: 2},
        {image: require('../../screens/Profile/staticAssets/pfp3.png'), id: 3},
        {image: require('../../screens/Profile/staticAssets/pfp4.png'), id: 4},
        {image: require('../../screens/Profile/staticAssets/pfp5.png'), id: 5},
    ]

    const { avatars } = getAvatars()
    const { backgrounds } = getBackgrounds()
    const { changeProfile } = putProfile()

    const avatarLabel = store.labels?.avatar
    const updateAvatarLabel = store.labels?.updateAvatar
    const updateLabel = store.labels?.update
    const updateThemeLabel = store.labels?.backgroundUpdate
    const chooseAvatarLabel = store.labels?.chooseAvatar
    const chooseThemeLabel = store.labels?.chooseBackground

    const lastNameLabel = store.labels?.lastName
    const firstNameLabel = store.labels?.firstName
    const middleNameLabel = store.labels?.patronymic
    const birthDateLabel = store.labels?.dateOfBirth

    return (
        <View style={{ gap: vs(35), marginBottom: 100 }}>
            {/* Аватар */}
            <View style={{ height: 'auto', gap: vs(15) }}>
                <Text style={{ fontSize: isTablet? vs(18) : vs(16), color: '#333', fontWeight: '400' }}>{avatarLabel}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: vs(15) }}>
                    <Image
                        resizeMode="contain"
                        style={{ width: s(60), height: s(60) }}
                        source={store.pfp?.image?.url ? { uri: store.pfp.image.url } : pfps[3].image}
                    />
                    <TouchableOpacity onPress={() => {
                            setChosenPfp(store.pfp)
                            setChangePfp(prev => !prev)
                        }} 
                        style={{ backgroundColor: '#553EFB', borderRadius: 20, width: vs(165), height: isTablet? vs(60) : vs(40), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: isTablet ? vs(18) : vs(16), color: 'white', fontWeight: '600' }}>{updateAvatarLabel}</Text>
                    </TouchableOpacity>
                </View>

                {changePfp && (
                    <View style={{ width: '70%', height: 'auto', gap: vs(5), borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 10, padding: vs(15), justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: vs(18) }}>{chooseAvatarLabel}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: vs(20), alignItems: 'center', padding: vs(20) }}>
                            {avatars.map((avatar, index) => (
                                <TouchableOpacity onPress={() => setChosenPfp(avatar)} key={index}>
                                    <Image resizeMode='contain' style={{ width: s(50), height: s(50) }} source={{ uri: avatar?.image?.url }}/>
                                    {chosenPfp?.id === avatar.id && <Ionicons name='checkmark-circle-sharp' style={{ position: 'absolute', bottom: 0, right: 0 }} size={s(20)} color='green' />}
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity onPress={() => {
                                setChangePfp(false)
                                store.setPfp(chosenPfp)
                                changeProfile(chosenPfp.id, chosenBg.id)
                            }} 
                            style={{ backgroundColor: '#553EFB', borderRadius: 20, width: vs(165), height: isTablet? vs(60) : vs(40), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: isTablet ? vs(18) : vs(16), color: 'white', fontWeight: '600' }}>{updateLabel}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            {/* Тема */}
            <View style={{ height: 'auto', gap: vs(15) }}>
                <Text style={{ fontSize: isTablet? vs(18) : vs(16), color: '#333', fontWeight: '400' }}>{translations[store.language].тема}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: vs(15) }}>
                    <Image style={{ width: s(60), height: s(60) }} resizeMode='contain' source={store?.backgroundImage?.image?.url ? { uri: store.backgroundImage.image.url } : bgAssets[1]} />
                    <TouchableOpacity onPress={() => {
                        setChosenBg(store.backgroundImage)
                        setChangeBg(prev => !prev)
                    }} style={{ backgroundColor: '#553EFB', borderRadius: 20, width: vs(165), height: isTablet? vs(60) : vs(40), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: isTablet ? vs(18) : vs(16), color: 'white', fontWeight: '600' }}>{updateThemeLabel}</Text>
                    </TouchableOpacity>
                </View>

                {changeBg && (
                    <View style={{ width: '70%', height: 'auto', gap: s(5), borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 10, padding: vs(15), justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ alignSelf: 'center', fontWeight: '600', fontSize: vs(18) }}>{chooseThemeLabel}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: vs(20), alignItems: 'center', padding: vs(10) }}>
                            {backgrounds?.map((bg, index) => (
                                <TouchableOpacity onPress={() => setChosenBg(bg)} key={index} style={{ borderRadius: 100, borderWidth: 2, borderColor: chosenBg?.id === bg?.id ? 'green' : '#EFEEFC' }}>
                                    <Image style={{ width: s(55), height: s(55), borderRadius: 100 }} source={{ uri: bg?.image?.url }}/>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <TouchableOpacity onPress={() => {
                            setChangeBg(false)
                            store.setBackgroundImage(chosenBg)
                            changeProfile(chosenPfp.id, chosenBg.id)
                        }} style={{ backgroundColor: '#553EFB', borderRadius: 20, width: vs(165), height: isTablet? vs(60) : vs(40), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: isTablet ? vs(18) : vs(16), color: 'white', fontWeight: '600' }}>{updateLabel}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>

            <ChooseLanguage thinking={false} />

            {/* Личные данные */}
            {store.juridical && 
                <>
                    <View style={{ gap: vs(16) }}>
                        <Text style={{ fontSize: isTablet? vs(20) : vs(18), fontWeight: '600' }}>{lastNameLabel}</Text>
                        <Text style={{ color: '#333', fontSize: isTablet? vs(20) : vs(18) }}>{last_name}</Text>
                    </View>

                    <View style={{ gap: vs(16) }}>
                        <Text style={{ fontSize: isTablet? vs(20) : vs(18), fontWeight: '600' }}>{firstNameLabel}</Text>
                        <Text style={{ color: '#333', fontSize:isTablet? vs(20) : vs(18) }}>{first_name}</Text>
                    </View>

                    <View style={{ gap: vs(16) }}>
                        <Text style={{ fontSize: isTablet? vs(20) : vs(18), fontWeight: '600' }}>{middleNameLabel}</Text>
                        <Text style={{ color: '#333', fontSize: isTablet? vs(20) : vs(18) }}>{middle_name}</Text>
                    </View>

                    <View style={{ gap: vs(16) }}>
                        <Text style={{ fontSize: isTablet? vs(20) : vs(18), fontWeight: '600' }}>{birthDateLabel}</Text>
                        <Text style={{ color: '#333', fontSize: isTablet? vs(20) : vs(18) }}>{birth_date}</Text>
                    </View>
                </>
            }
        </View>
    )
}

export default observer(MyProfileSection)
