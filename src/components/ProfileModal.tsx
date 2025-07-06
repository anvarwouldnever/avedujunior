import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import { store } from '../store/store'
import Modal from 'react-native-modal'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { pfpAssets } from './PfpAssets'
import * as SecureStore from 'expo-secure-store';

const ProfileModal = () => {

    const { s, vs } = useScale()
    const navigation = useNavigation()

    const options = [
        {text: 'Профиль', action: () => {
            store.setModal(false)
            navigation.navigate('Profile')
        }, color: 'grey'}, 
        {text: 'Список детей', action: () => {}, color: 'grey'}, 
        {text: 'Пройденный темы', action: () => {}, color: 'grey'},
        {text: 'Выход из системы', action: () => {
            SecureStore.deleteItemAsync('access_token')
            store.setModal(false)
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        }, color: 'red'}
    ];

    return (
        <Modal backdropColor='transparent' animationOutTiming={1} animationIn={'fadeIn'} animationOut={'fadeOut'} onBackdropPress={() => store.setModal(false)} isVisible={store.profileModal}>
            <View style={{ backgroundColor: 'white', width: Platform.isPad? vs(200) : s(200), height: Platform.isPad? vs(250) : s(250), position: 'absolute', top: Platform.isPad? '10%' : '15%', right: '10%', padding: vs(15), borderRadius: 10, justifyContent: 'space-between' }}>
                <View style={{flexDirection: 'row', gap: Platform.isPad? vs(15) : s(15), height: Platform.isPad? vs(60) : s(60), alignItems: 'center'}}>
                    <Image resizeMode='contain' style={{width: Platform.isPad? vs(60) : s(60), height: Platform.isPad? vs(60) : s(60)}} source={store.pfp?.image?.url? { uri: store.pfp.image.url } : pfpAssets[4]}/>
                    <View style={{ height: '100%', width: '55%', justifyContent: 'space-between', paddingVertical: s(5) }}>
                        <Text style={{ color: 'black', fontSize: Platform.isPad? vs(14) : s(14), fontWeight: '600' }}>Демо (3)</Text>
                        <Text style={{ color: 'grey', fontSize: Platform.isPad? vs(12) : s(12) }}>Группа "Демо (3)"</Text>
                    </View>
                </View>

                <View style={{ width: '100%', height: Platform.isPad? vs(150) : s(150), justifyContent: 'space-between' }}>
                    {options?.map((option, index) => {
                        return (
                            <TouchableOpacity onPress={option?.action} style={{  width: '100%', height: Platform.isPad? vs(30) : s(30), justifyContent: 'center' }} key={index}>
                                <Text style={{color: option?.color, fontWeight: '600', fontSize: Platform.isPad? vs(12) : s(12)}}>{option?.text}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </Modal>
    )
}

export default observer(ProfileModal);