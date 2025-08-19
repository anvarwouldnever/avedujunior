import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import { store } from '../store/store'
import Modal from 'react-native-modal'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import { pfpAssets } from './PfpAssets'
import * as SecureStore from 'expo-secure-store';
import translations from '../../translations'

const ProfileModal = () => {

    const { s, vs, windowWidth, windowHeight } = useScale()
    const navigation = useNavigation()

    const options = [
        {text: translations[store.language].мойпрофиль, action: () => {
            store.setModal(false)
            navigation.navigate('Profile')
        }, color: 'grey'}, 
        {text: translations[store.language].списокдетей, action: () => {}, color: 'grey'}, 
        {text: translations[store.language].пройденныетемы, action: () => {}, color: 'grey'},
        {text: translations[store.language].выходизсистемы, action: () => {
            SecureStore.deleteItemAsync('access_token')
            store.setModal(false)
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        }, color: 'red'}
    ];

    return (
        <Modal style={{ width: windowWidth }} backdropColor='transparent' animationOutTiming={1} animationIn={'fadeIn'} animationOut={'fadeOut'} onBackdropPress={() => store.setModal(false)} isVisible={store.profileModal}>
            <View style={{ backgroundColor: 'white', gap: vs(25), width: vs(220), height: 'auto', position: 'absolute', top: Platform.isPad? '5%' : '15%', right: '15%', padding: vs(15), borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2, elevation: 3 }}>
                <View style={{flexDirection: 'row', gap: vs(15), height: vs(60), alignItems: 'center'}}>
                    <Image resizeMode='contain' style={{width: vs(60), height: vs(60)}} source={store.pfp?.image?.url? { uri: store.pfp.image.url } : pfpAssets[4]}/>
                    <View style={{ height: '100%', width: '55%', justifyContent: 'space-between', paddingVertical: vs(5), rowGap: vs(5) }}>
                        <Text style={{ color: 'black', fontSize: Platform.isPad? vs(16) : vs(14), fontWeight: '600' }}>Демо (3)</Text>
                        <Text style={{ color: 'grey', fontSize: Platform.isPad? vs(14) : vs(12) }}>{translations[store.language].группа} "Демо (3)"</Text>
                    </View>
                </View>

                <View style={{ width: '100%', height: 'auto', justifyContent: 'space-between', gap: vs(25) }}>
                    {options?.map((option, index) => {
                        return (
                            <TouchableOpacity onPress={option?.action} style={{  width: '100%', height: 'auto', justifyContent: 'center' }} key={index}>
                                <Text style={{color: option?.color, fontWeight: '600', fontSize: Platform.isPad? vs(16) : vs(14)}}>{option?.text}</Text>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        </Modal>
    )
}

export default observer(ProfileModal);