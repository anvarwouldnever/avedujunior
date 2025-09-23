import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useScale } from '../../../hooks/useScale'
import { observer } from 'mobx-react-lite'
import { store } from '../../../store/store'

const ChooseLanguage = ({ thinking }) => {

    const { s, vs, isTablet } = useScale()

    return (
        <View style={{ width: '100%', height: isTablet ? vs(70) : vs(50), gap: vs(10), flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={thinking? () => {return} : () => store.setLanguage('ru')} style={{ borderWidth: 2, borderColor: '#6A5AE0', borderRadius: 8, backgroundColor: store.language === 'ru'? '#6A5AE0' : 'white', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: store.language === 'ru'? 'white' : '#6A5AE0', fontWeight: '600', marginHorizontal: vs(25), fontSize: isTablet ? vs(16) : vs(14) }}>Ru</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={thinking? () => {return} : () => store.setLanguage('uz')} style={{ borderWidth: 2, borderColor: '#6A5AE0', borderRadius: 8, backgroundColor: store.language === 'uz'? '#6A5AE0' : 'white', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: store.language === 'uz'? 'white' : '#6A5AE0', fontWeight: '600', marginHorizontal: vs(25), fontSize: isTablet ? vs(16) : vs(14) }}>Uz</Text>
            </TouchableOpacity>
        </View>
    )
}

export default observer(ChooseLanguage);