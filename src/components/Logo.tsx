import { Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { navigationStore } from '../navigation/NavigationStore'
import { useScale } from '../hooks/useScale'

const Logo = () => {

    const navigation = useNavigation();
    const { vs } = useScale();

    const goHome = () => {
        const state = navigation.getState()
        const currentRoute = state?.routes[state?.index]?.name
    
        if (currentRoute !== 'Home') {
            navigationStore.setOpenSlider(false)
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        }
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => goHome()}>
            
            <Image source={require('../../assets/aveduLogo.png')} style={{width: 100, height: 60, resizeMode: 'contain', marginLeft: vs(10)}}/>
       
        </TouchableOpacity>
    )
}

export default Logo;