import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'

const ChooseLanguage = ({ thinking }) => {

    const { s, vs } = useScale()
    const [selectedLanguage, setSelectedLanguage] = useState('Ru')

    return (
        <View style={{ width: '100%', height: Platform.isPad? vs(40) : s(40), gap: s(5), flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity activeOpacity={0.8} onPress={thinking? () => {return} : () => setSelectedLanguage('Ru')} style={{ borderWidth: 2, borderColor: '#6A5AE0', borderRadius: 8, backgroundColor: selectedLanguage === 'Ru'? '#6A5AE0' : '#EFEEFC', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: selectedLanguage === 'Ru'? 'white' : '#6A5AE0', fontWeight: '600', marginHorizontal: vs(20), fontSize: vs(14) }}>Ru</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={thinking? () => {return} : () => setSelectedLanguage('Uz')} style={{ borderWidth: 2, borderColor: '#6A5AE0', borderRadius: 8, backgroundColor: selectedLanguage === 'Uz'? '#6A5AE0' : '#EFEEFC', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: selectedLanguage === 'Uz'? 'white' : '#6A5AE0', fontWeight: '600', marginHorizontal: vs(20), fontSize: vs(14) }}>Uz</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChooseLanguage;