import { View, TouchableOpacity, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { store } from '../../store/store'
import { navigationStore } from '../NavigationStore'
import { Image } from 'expo-image'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'

const HeaderRight = () => {

    const [key, setKey] = useState<boolean>(false)
    
    useEffect(() => {
        setKey(prev => !prev)
    }, [store.pfp])

    const navigation = useNavigation()

    return (
        <View style={{marginRight: 15, flexDirection: 'row', gap: 10}}>
            <TouchableOpacity
                onPress={() => store.setModal(!store.profileModal)}
                activeOpacity={0.8}
            >
                <Image
                    key={key}
                    source={
                        store.pfp?.image?.url
                        ? { uri: store.pfp.image.url }
                        : undefined
                    }
                    transition={300}
                    contentFit='contain'
                    style={{ width: 50, height: 50 }}
                />
            </TouchableOpacity> 

            <TouchableOpacity onPress={() => navigationStore.setOpenSlider(!navigationStore.openSlider)}>
                <Ionicons name={navigationStore.openSlider ? 'close' : 'menu'} size={50} color="black" />
            </TouchableOpacity>

        </View>
    )
}

export default observer(HeaderRight)