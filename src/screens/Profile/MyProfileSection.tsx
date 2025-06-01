import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import { Ionicons } from '@expo/vector-icons'
import { bgAssets } from '../../components/BgAssets'
import { store } from '../../store/store'

const MyProfileSection = () => {

    const { s, vs } = useScale()

    const [changePfp, setChangePfp] = useState<boolean>(false)
    const [chosenPfp, setChosenPfp] = useState<number>(store.pfp)
    const [chosenBg, setChosenBg] = useState<number>(store.backgroundImage)
    const [changeBg, setChangeBg] = useState<boolean>(false)

    const pfps = [
        {image: require('../../screens/Profile/staticAssets/pfp1.png'), id: 1},
        {image: require('../../screens/Profile/staticAssets/pfp2.png'), id: 2},
        {image: require('../../screens/Profile/staticAssets/pfp3.png'), id: 3},
        {image: require('../../screens/Profile/staticAssets/pfp4.png'), id: 4},
        {image: require('../../screens/Profile/staticAssets/pfp5.png'), id: 5},
    ]

    const bgs = [
        {image: require('../../../assets/aveduBackground.png'), id: 1},
        {image: require('../../../assets/aveduBackground2.png'), id: 2},
        {image: require('../../../assets/aveduBackground3.png'), id: 3},
    ]

    return (
        <View style={{ gap: vs(35), marginBottom: 100 }}>
            <View style={{ height: 'auto', gap: vs(15) }}>
                <Text style={{ fontSize: Platform.isPad? vs(14) : s(14), color: '#333333', fontWeight: '400' }}>Аватар</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: vs(15)}}>
                    <Image
                        resizeMode="contain"
                        style={{ width: s(60), height: Platform.isPad? vs(60) : s(60) }}
                        source={pfps.find(pfp => pfp.id === store.pfp)?.image ?? pfps[0].image}
                    />
                    <TouchableOpacity onPress={() => {
                            setChosenPfp(store.pfp)
                            setChangePfp(prev => !prev)
                        }
                    } style={{ backgroundColor: '#553EFB', borderRadius: 20, width: s(165), height: Platform.isPad? vs(40) : s(40), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: vs(16), color: 'white', fontWeight: '600' }}>Обновить аватар</Text>
                    </TouchableOpacity>
                </View>
                
                {
                    changePfp
                && 
                    <View style={{width: '70%', height: 'auto', gap: vs(5), borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 10, padding: vs(15), justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: vs(18)}}>Выбрать аватарку</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: vs(20), alignItems: 'center', padding: vs(20) }}>
                            {pfps.map((pfp, index) => {
                                return (
                                    <TouchableOpacity onPress={() => setChosenPfp(pfp.id)} style={{}} key={index}>
                                        <Image resizeMode='contain' style={{width: s(50), height: Platform.isPad? s(50) : s(50)}} source={pfp.image}/>
                                        {chosenPfp === pfp.id && <Ionicons name='checkmark-circle-sharp' style={{position: 'absolute', bottom: 0, right: 0}} size={vs(20)} color={'green'} />}
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <TouchableOpacity onPress={() => {
                                setChangePfp(prev => !prev)
                                store.setPfp(chosenPfp)
                            } 
                        } style={{ backgroundColor: '#553EFB', borderRadius: 20, width: s(165), height: Platform.isPad? vs(40) : s(40), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: vs(16), color: 'white', fontWeight: '600' }}>Обновить</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            
            <View style={{ height: 'auto', gap: vs(15) }}>
                <Text style={{ fontSize: vs(14), color: '#333333', fontWeight: '400' }}>Темы</Text>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: s(15)}}>
                    <Image style={{ width: s(60), height: Platform.isPad? vs(60) : s(60) }} resizeMode='contain' source={bgAssets[store.backgroundImage] ?? bgAssets[1]} />
                    <TouchableOpacity onPress={() => {
                            setChosenBg(store.backgroundImage)
                            setChangeBg(prev => !prev)
                        }
                    } style={{ backgroundColor: '#553EFB', borderRadius: 20, width: s(165), height: Platform.isPad? vs(40) : s(40), alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: vs(16), color: 'white', fontWeight: '600' }}>Обновить тему</Text>
                    </TouchableOpacity>
                </View>

                {
                    changeBg
                && 
                    <View style={{width: '70%', height: 'auto', gap: vs(5), borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 10, padding: vs(15), justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{alignSelf: 'center', fontWeight: '600', fontSize: vs(18)}}>Выбрать тему</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: vs(20), alignItems: 'center', padding: vs(10) }}>
                            {bgs.map((bg, index) => {
                                return (
                                    <TouchableOpacity onPress={() => setChosenBg(bg.id)} key={index} style={{borderRadius: 100, borderWidth: 2, borderColor: chosenBg === bg.id ? 'green' : '#EFEEFC'}}>
                                        <Image style={{width: s(55), height: Platform.isPad? s(55) : s(55), borderRadius: 100}} source={bg.image}/>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <TouchableOpacity onPress={() => {
                                setChangeBg(prev => !prev)
                                store.setBackgroundImage(chosenBg)
                            }
                        } style={{ backgroundColor: '#553EFB', borderRadius: 20, width: s(165), height: Platform.isPad? vs(40) : s(40), alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: vs(16), color: 'white', fontWeight: '600' }}>Обновить</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(18) : s(18), fontWeight: '600'}}>Фамилия</Text>
                <Text style={{ color: '#333333', fontSize: Platform.isPad? vs(18) : s(18), }}>Vospitatel</Text>
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(18) : s(18), fontWeight: '600'}}>Имя</Text>
                <Text style={{ color: '#333333', fontSize:Platform.isPad? vs(18) : s(18), }}>Igor RRPO</Text>
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(18) : s(18), fontWeight: '600'}}>Отчество</Text>
                <Text style={{ color: '#333333', fontSize: Platform.isPad? vs(18) : s(18), }}>asadaadad</Text>
            </View>

            <View style={{ gap: vs(15) }}>
                <Text style={{fontSize: Platform.isPad? vs(18) : s(18), fontWeight: '600'}}>Дата рождения</Text>
                <Text style={{ color: '#333333', fontSize: Platform.isPad? vs(18) : s(18), }}>2023-07-03</Text>
            </View>
        </View>
    )
}

export default MyProfileSection