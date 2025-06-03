import { View, Text, ImageBackground, ScrollView, Platform, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useScale } from '../hooks/useScale'
import { bgAssets } from '../components/BgAssets'
import { store } from '../store/store'
import { observer } from 'mobx-react-lite'
import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import * as ScreenOrientation from 'expo-screen-orientation'

const GameScreen = ({ route }) => {

    const NameAndTopic = () => {
        return (
            <View style={{ gap: s(7) }}>
                <Text style={{ color: 'grey', fontWeight: 'bold' }}>{route?.params?.name}</Text>
                <Text style={{ color: 'black', fontWeight: '600', fontSize: vs(18)}}>Тема: {route?.params?.topic}</Text>
            </View>
        )
    }

    const [chosenNumber, setChosenNumber] = useState(null)

    const BackupView = () => {
        return (
            <View style={{width: '82%', height: '100%', borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', padding: s(5), borderRadius: 20, gap: vs(25), justifyContent: 'space-between'}}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', height: '12%'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '65%', justifyContent: 'space-between', gap: s(5) }}>
                        <View style={{ backgroundColor: '#B390EF', width: s(15), height: s(15), borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>  
                            <Ionicons name='volume-high' color={'white'} size={s(10)} />
                        </View>
                        <Text adjustsFontSizeToFit style={{ fontSize: Platform.isPad? vs(6) : s(6), fontWeight: '600', width: '90%'}}>Отметьте, кто сидит во втором вагончике справа</Text>
                    </View>

                    <TouchableOpacity style={{width: '15%', borderWidth: 2, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderColor: '#EFEEFC', borderRadius: 10}}>
                        <Ionicons name='chevron-back' color={'#6A5ADE'} size={s(10)} />
                        <Text style={{ fontWeight: '600', color: '#6A5ADE' }}>Назад</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%', height: vs(470)}}>
                    {Array(4).map((i, index) => {
                        return (
                            <View style={{ width: s(50), height: vs(50) }} key={index}>

                            </View>
                        )
                    })}
                </View>

                <View style={{ height: vs(75), width: '60%', alignSelf: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <TouchableOpacity style={{ width: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF40572B', borderRadius: 10 }}>
                        <Ionicons name='chevron-back' color={'red'} size={20}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={{width: '60%', backgroundColor: '#EFF8FF', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#2097EF', fontWeight: '600'}}>Проверить ответ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '15%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0EAF0021', borderRadius: 10 }}>
                        <Ionicons name='chevron-forward' color={'green'} size={20}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const GameNumbersList = () => {
        return (
            <View style={{width: '15%', borderWidth: 2, borderColor: '#EFEEFC', backgroundColor: 'white', borderRadius: 20, padding: s(5) }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: s(5) }}>
                    {[1, 2, 3, 4, 5, 6, 7].map((number, index) => {
                        return (
                            <TouchableOpacity onPress={() => setChosenNumber(number)} style={{width: '100%', borderWidth: 2, height: vs(150), backgroundColor: chosenNumber === number? "#6A5AE0" : "white", borderColor: chosenNumber === number? '#553EFB' : '#EFEEFC', borderRadius: 10, alignItems: 'center', justifyContent: 'center'}} key={index}>
                                <Text style={{fontWeight: '600', fontSize: s(12), color: chosenNumber === number? 'white' : 'black'}}>{number}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )
    }

    const { s, vs, windowWidth, windowHeight } = useScale()

    useFocusEffect(
        useCallback(() => {
            async function changeScreenOrientation() {
                await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
            }
            changeScreenOrientation();
        }, [])
    );

    return (
        <ImageBackground resizeMode='cover' style={{ flex: 1, justifyContent: 'center' }} source={bgAssets[store.backgroundImage] ?? bgAssets[1]}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{flex: 1, justifyContent: 'space-between', paddingTop: vs(20), flexDirection: 'row'}}>
                    <BackupView />
                    <GameNumbersList />
                </View>
            </SafeAreaView>
        </ImageBackground>
    )
}

export default observer(GameScreen);

