import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { useScale } from '../hooks/useScale'
import { store } from '../store/store'
import Modal from 'react-native-modal'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store';
import translations from '../../translations'
import { Image } from 'expo-image'
import { navigationStore } from '../navigation/NavigationStore'

const ProfileModal = () => {

    const statusBarHeight = StatusBar.currentHeight;

    const { s, vs, isTablet } = useScale();
    const navigation = useNavigation();

    const options = [
        {text: translations[store.language]?.мойпрофиль, action: () => {
            store.setModal(false)
            navigation.navigate('Profile')
        }, color: 'grey'}, 
        {text: translations[store.language]?.списокдетей, action: () => {
            store.setModal(false)
            navigation.navigate('OurGroup')
        }, color: 'grey'}, 
        {text: translations[store.language]?.пройденныетемы, action: () => {
            store.setModal(false)
            navigation.navigate('CompletedTasks')
        }, color: 'grey'},
        {text: translations[store.language]?.выходизсистемы, action: () => {
            SecureStore.deleteItemAsync('access_token')
            store.setModal(false)
            navigation.reset({
                index: 0,
                routes: [{ name: 'LoginScreen' }],
            });
        }, color: 'red'}
    ];

    return (
        <View style={{ position: 'absolute' }}>
            
            <Modal style={{ margin: 0, marginTop: -statusBarHeight }} animationOutTiming={1} animationInTiming={300} backdropColor='transparent' animationIn={'fadeIn'} animationOut={'fadeOut'} backdropTransitionInTiming={1} onBackdropPress={() => store.setModal(false)} isVisible={store.profileModal}>
                
                <View style={{ backgroundColor: 'white', gap: vs(25), width: vs(220), height: 'auto', position: 'absolute', top: isTablet ? '10%' : '15%', right: '10%', padding: vs(15), borderRadius: 10, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.22, shadowRadius: 2, elevation: 3 }}>
                    
                    <View style={{flexDirection: 'row', gap: vs(15), height: vs(60), alignItems: 'center'}}>
                        
                        <Image contentFit='contain' style={{width: vs(60), height: vs(60)}} source={store.pfp?.image?.url? { uri: store?.pfp?.image.url } : undefined}/>
                        
                        <View style={{ height: '100%', width: '55%', justifyContent: 'space-between', paddingVertical: vs(5), rowGap: vs(5) }}>
                            
                            <Text style={{ color: 'black', fontSize: isTablet? vs(16) : vs(14), fontWeight: '600' }}>Демо (3)</Text>
                            
                            <Text style={{ color: 'grey', fontSize: isTablet? vs(14) : vs(12) }}>{translations[store.language]?.группа} "Демо (3)"</Text>
                        
                        </View>

                    </View>

                    <View style={{ width: '100%', height: 'auto', justifyContent: 'space-between', gap: vs(25) }}>
                        
                        {options?.map((option, index) => {
                            return (
                                <TouchableOpacity onPress={() => { option?.action(); navigationStore.setOpenSlider(false) }} style={{  width: '100%', height: 'auto', justifyContent: 'center' }} key={index}>
                                    
                                    <Text style={{color: option?.color, fontWeight: '600', fontSize: isTablet? vs(16) : vs(14)}}>{option?.text}</Text>
                                
                                </TouchableOpacity>
                            )
                        })}

                    </View>

                </View>

            </Modal>

        </View>
    )
}

export default observer(ProfileModal);