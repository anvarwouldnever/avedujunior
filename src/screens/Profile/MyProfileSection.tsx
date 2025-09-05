import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import { bgAssets } from '../../components/BgAssets'
import { store } from '../../store/store'
import { getAvatars } from './hooks/getAvatars'
import { getBackgrounds } from './hooks/getBackgrounds'
import translations from '../../../translations'
import { putProfile } from './hooks/putProfile'

const MyProfileSection = ({ birth_date, first_name, last_name, middle_name }) => {

    const { s, vs, isTablet } = useScale()

    const [changePfp, setChangePfp] = useState<boolean>(false);
    const [chosenPfp, setChosenPfp] = useState<object>(store?.pfp);

    const [changeBg, setChangeBg] = useState<boolean>(false);
    const [chosenBg, setChosenBg] = useState<object>(store?.backgroundImage);

    const pfps = [
        {image: require('../../screens/Profile/staticAssets/pfp1.png'), id: 1},
        {image: require('../../screens/Profile/staticAssets/pfp2.png'), id: 2},
        {image: require('../../screens/Profile/staticAssets/pfp3.png'), id: 3},
        {image: require('../../screens/Profile/staticAssets/pfp4.png'), id: 4},
        {image: require('../../screens/Profile/staticAssets/pfp5.png'), id: 5},
    ];

    const bgs = [
        {image: require('../../../assets/aveduBackground.png'), id: 1},
        {image: require('../../../assets/aveduBackground2.png'), id: 2},
        {image: require('../../../assets/aveduBackground3.png'), id: 3},
    ];

    const { avatars, avatarsError, avatarsLoading } = getAvatars();
    const { backgrounds, backgroundsError, backgroundsLoading } = getBackgrounds();

    const { changeProfile, error, loading } = putProfile()

    return (
        <View style={{ gap: vs(35), marginBottom: 100 }}>
            <View style={{ height: 'auto', gap: vs(15) }}>
                <Text style={{ fontSize: isTablet? vs(18) : s(14), color: '#333333', fontWeight: '400' }}>{translations[store.language].аватар}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: vs(15)}}>
                    <Image
                        resizeMode="contain"
                        style={{ width: s(60), height: isTablet? s(60) : s(60) }}
                        source={
                            store.pfp?.image?.url
                              ? { uri: store.pfp.image.url }
                            : pfps[3].image
                        }
                    />
                    <TouchableOpacity onPress={() => {
                            setChosenPfp(store.pfp)
                            setChangePfp(prev => !prev)
                        }
                    } style={{ backgroundColor: '#553EFB', borderRadius: 20, width: vs(165), height: isTablet? vs(40) : s(40), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: vs(16), color: 'white', fontWeight: '600' }}>{translations[store.language].обновитьаватар}</Text>
                    </TouchableOpacity>
                </View>
                
                {
                    changePfp
                && 
                    <View style={{width: '70%', height: 'auto', gap: vs(5), borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 10, padding: vs(15), justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: vs(18)}}>{translations[store.language].выбратьаватарку}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: vs(20), alignItems: 'center', padding: vs(20) }}>
                            {avatars.map((avatar, index) => {
                                return (
                                    <TouchableOpacity onPress={() => setChosenPfp(avatar)} style={{}} key={index}>
                                        <Image resizeMode='contain' style={{width: s(50), height: isTablet? s(50) : s(50)}} source={{ uri: avatar?.image?.url}}/>
                                        {chosenPfp?.id === avatar.id && <Ionicons name='checkmark-circle-sharp' style={{position: 'absolute', bottom: 0, right: 0}} size={s(20)} color={'green'} />}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <TouchableOpacity onPress={() => {
                                setChangePfp(prev => !prev)
                                changeProfile(chosenPfp.id, chosenBg.id)
                                store.setPfp(chosenPfp)
                            } 
                        } style={{ backgroundColor: '#553EFB', borderRadius: 20, width: vs(165), height: isTablet? vs(40) : s(40), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: vs(16), color: 'white', fontWeight: '600' }}>{translations[store.language].обновить}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            
            <View style={{ height: 'auto', gap: vs(15) }}>
                <Text style={{ fontSize: isTablet? vs(18) : vs(14), color: '#333333', fontWeight: '400' }}>{translations[store.language].темы}</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: s(15)}}>
                    <Image style={{ width: s(60), height: isTablet? s(60) : s(60) }} resizeMode='contain' source={store?.backgroundImage?.image?.url? { uri: store.backgroundImage.image.url } : bgAssets[1]} />
                    <TouchableOpacity onPress={() => {
                            setChosenBg(store.backgroundImage)
                            setChangeBg(prev => !prev)
                        }
                    } style={{ backgroundColor: '#553EFB', borderRadius: 20, width: vs(165), height: isTablet? vs(40) : s(40), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: vs(16), color: 'white', fontWeight: '600' }}>{translations[store.language].обновитьтему}</Text>
                    </TouchableOpacity>
                </View>

                {
                    changeBg
                && 
                    <View style={{width: '70%', height: 'auto', gap: s(5), borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 10, padding: vs(15), justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: vs(18)}}>{translations[store.language].выбратьтему}</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: vs(20), alignItems: 'center', padding: vs(10) }}>
                            {backgrounds?.map((bg, index) => {
                                return (
                                    <TouchableOpacity onPress={() => setChosenBg(bg)} key={index} style={{borderRadius: 100, borderWidth: 2, borderColor: chosenBg?.id === bg?.id ? 'green' : '#EFEEFC'}}>
                                        <Image style={{width: s(55), height: isTablet? s(55) : s(55), borderRadius: 100}} source={{ uri: bg?.image?.url }}/>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <TouchableOpacity onPress={() => {
                                setChangeBg(prev => !prev)
                                changeProfile(chosenPfp.id, chosenBg.id)
                                store.setBackgroundImage(chosenBg)
                            }
                        } style={{ backgroundColor: '#553EFB', borderRadius: 20, width: vs(165), height: isTablet? vs(40) : s(40), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: vs(16), color: 'white', fontWeight: '600' }}>{translations[store.language].обновить}</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            {store.juridical && <>
                <View style={{ gap: vs(15) }}>
                    <Text style={{fontSize: isTablet? vs(22) : s(18), fontWeight: '600'}}>{translations[store.language].фамилия}</Text>
                    <Text style={{ color: '#333333', fontSize: isTablet? vs(18) : s(18), }}>{last_name}</Text>
                </View>

                <View style={{ gap: vs(15) }}>
                    <Text style={{fontSize: isTablet? vs(22) : s(18), fontWeight: '600'}}>{translations[store.language].имя}</Text>
                    <Text style={{ color: '#333333', fontSize:isTablet? vs(18) : s(18), }}>{first_name}</Text>
                </View>

                <View style={{ gap: vs(15) }}>
                    <Text style={{fontSize: isTablet? vs(22) : s(18), fontWeight: '600'}}>{translations[store.language].отчество}</Text>
                    <Text style={{ color: '#333333', fontSize: isTablet? vs(18) : s(18), }}>{middle_name}</Text>
                </View>

                <View style={{ gap: vs(15) }}>
                    <Text style={{fontSize: isTablet? vs(22) : s(18), fontWeight: '600'}}>{translations[store.language].датарождения}</Text>
                    <Text style={{ color: '#333333', fontSize: isTablet? vs(18) : s(18), }}>{birth_date}</Text>
                </View>
            </>}
        </View>
    )
}

export default MyProfileSection