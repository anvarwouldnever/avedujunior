import { View, Text, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { useScale } from '../../hooks/useScale'

const ChooseRole = () => {

    const { s, vs } = useScale()
    const [selectedRole, setSelectedRole] = useState('Организация')

    return (
        <View style={{ width: '100%', height: 'auto', flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => setSelectedRole('Организация')} activeOpacity={0.8} style={{ height: Platform.isPad? vs(45) : s(45), width: '48%', borderWidth: 2, borderColor: '#6A5AE0', borderRadius: 15, backgroundColor: selectedRole === 'Организация'? '#6A5AE0' : '#EFEEFC', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: selectedRole === 'Организация'? 'white' : '#6A5AE0', fontWeight: '600', fontSize: Platform.isPad? vs(14) : s(14) }}>Организация</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedRole('Персональный')} activeOpacity={0.8} style={{ height: Platform.isPad? vs(45) : s(45), width: '48%', borderWidth: 2, borderColor: '#6A5AE0', borderRadius: 15, backgroundColor: selectedRole === 'Персональный'? '#6A5AE0' : '#EFEEFC', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: selectedRole === 'Персональный'? 'white' : '#6A5AE0', fontWeight: '600', fontSize: Platform.isPad? vs(14) : s(14) }}>Персональный</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChooseRole