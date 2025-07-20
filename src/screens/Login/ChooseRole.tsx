import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'
import translations from '../../../translations'
import { store } from '../../store/store'
import { observer } from 'mobx-react-lite'

const ChooseRole = ({ thinking, selectedRole, setSelectedRole }) => {

    const { s, vs } = useScale()

    return (
        <View style={{ width: '100%', height: 'auto', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={thinking? () => {return} : () => setSelectedRole(translations[store?.language]?.организация)} activeOpacity={0.8} style={{ height: Platform.isPad? vs(45) : s(45), width: '48%', borderWidth: 2, borderColor: '#6A5AE0', borderRadius: 15, backgroundColor: selectedRole === translations[store?.language]?.организация ? '#6A5AE0' : '#EFEEFC', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: selectedRole === translations[store?.language]?.организация ? 'white' : '#6A5AE0', fontWeight: '600', fontSize: Platform.isPad? vs(14) : s(14) }}>{translations[store?.language]?.организация}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={thinking? () => {return} : () => setSelectedRole(translations[store?.language]?.персональный)} activeOpacity={0.8} style={{ height: Platform.isPad? vs(45) : s(45), width: '48%', borderWidth: 2, borderColor: '#6A5AE0', borderRadius: 15, backgroundColor: selectedRole === translations[store?.language]?.персональный ? '#6A5AE0' : '#EFEEFC', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: selectedRole === translations[store?.language]?.персональный ? 'white' : '#6A5AE0', fontWeight: '600', fontSize: Platform.isPad? vs(14) : s(14) }}>{translations[store?.language]?.персональный}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default observer(ChooseRole);