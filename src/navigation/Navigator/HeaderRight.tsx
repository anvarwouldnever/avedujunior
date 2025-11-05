import { View, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { store } from '../../store/store'
import { navigationStore } from '../NavigationStore'
import { Image } from 'expo-image'
import { observer } from 'mobx-react-lite'
import { useScale } from '../../hooks/useScale'

const HeaderRight = () => {

    const [key, setKey] = useState<boolean>(false)

    const { s, vs, isTablet } = useScale()
    
    useEffect(() => {
        setKey(prev => !prev)
    }, [store.pfp])

    return (
        <View style={{ marginRight: vs(10), flexDirection: 'row' }}>
            
            <TouchableOpacity onPress={() => store.setModal(!store.profileModal)} activeOpacity={0.8}>
                <Image
                    key={key}
                    source={
                        store.pfp?.image?.url
                        ? { uri: store.pfp.image.url }
                        : undefined
                    }
                    transition={300}
                    contentFit='contain'
                    style={{ width: isTablet ? s(18) : vs(45), height: isTablet ? s(18) : vs(45) }}
                />
            </TouchableOpacity> 

            <TouchableOpacity onPress={() => navigationStore.setOpenSlider(!navigationStore.openSlider)}>
                
                <Ionicons name={navigationStore.openSlider ? 'close' : 'menu'} size={isTablet ? s(20) : vs(50)} color="black" />
            
            </TouchableOpacity>

        </View>
    )
}

export default observer(HeaderRight)